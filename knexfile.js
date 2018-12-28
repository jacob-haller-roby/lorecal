module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'lorecal',
            password: 'lorecal',
            database: 'lorecal'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            user: process.env.SQL_USER,
            password: process.env.SQL_PW,
            database: process.env.SQL_DB,
            socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};
