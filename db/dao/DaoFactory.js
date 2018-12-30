const knex = require('../connection');
const COLUMNS = require('../columns');
const TO_ONE = require('../toOne');
const FILTER = require('../filter');

const DaoFactory = (constructor, tableName) => {
    const Dao = constructor;

    Dao.applyTableName = (filterData) => {
        const tableFilterData = {};
        for (let field in filterData) {
            if (field.indexOf('.') === -1) {
                tableFilterData[`${tableName}.${field}`] = filterData[field]
            } else {
                tableFilterData[field] = filterData[field]
            }
        }
        return tableFilterData;
    };

    //This method assumes you are using `.options({ nestTables: true })` on the query
    Dao.reduceJoins = (data) => {
        return data.reduce((acc, cur) => {
                const primary = cur[tableName];
                let existingPrimary = acc.find(entry => entry[COLUMNS.DEFAULT.ID] === primary[COLUMNS.DEFAULT.ID]);

                if (!existingPrimary) {
                    existingPrimary = primary;
                    acc.push(existingPrimary);
                    for (let join in cur) {
                        if (join !== tableName) {
                            existingPrimary[join] = [];
                        }
                    }
                }

                for (let join in cur) {
                    if (join !== tableName && cur[join][COLUMNS.DEFAULT.ID]) existingPrimary[join].push(cur[join]);
                }

                return acc;

            }, [])
            .map(element => {
                Object.values(TO_ONE[tableName.toUpperCase()])
                    .forEach(toOne => {
                        if (element[toOne].length) {
                            element[toOne] = element[toOne][0]
                        } else {
                            element[toOne] = {};
                        }
                    });
                Object.values(FILTER[tableName.toUpperCase()])
                    .forEach(filter => {
                        delete element[filter];
                    });
                return element;
            });
    };

    Dao.create = (data) => {
        return knex(tableName)
            .insert(data)
            .returning(COLUMNS.DEFAULT.ID)
            .then(id => Dao.findOne({id}))
    };

    Dao.update = (id, data) => {
        return knex(tableName)
            .update(data)
            .where({id})
            .returning(COLUMNS.DEFAULT.ID)
            .then(id => Dao.findOne({id}));
    };

    Dao.findOne = (filterData) => {
        return Dao.find(filterData)
            .then(result => {
                if (result.length) {
                    return result[0];
                }
                return result;
            });
    };

    Dao.find = (filterData) => {
        return knex(tableName)
            .where(filterData);
    };

    Dao.getAll = () => {
        return knex(tableName);
    };

    Dao.delete = (filterData) => {
        return knex(tableName)
            .where(filterData)
            .delete();
    };

    return Dao;

};

module.exports = DaoFactory;