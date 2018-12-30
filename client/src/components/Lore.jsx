import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {Card, CardContent, CardHeader, Grid} from "@material-ui/core";

const Component = createReactClass({

    propTypes: {
        loreEntries: PropTypes.array.isRequired
    },

    getTimeString() {
        const {time} = this.props.loreEntry;

        const AM = parseInt(time.subString(0,2)) < 12
    },

    getDay() {
        return this.props.loreEntries[0].day;
    },

    renderLoreEntry(lore) {
        return <div key={lore.id}>
            <p><b>At {lore.time}</b></p>
            <p>{lore.entry}</p>
        </div>
    },

    render() {
        const {loreEntry} = this.props;
        return (
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={"Day #" + this.getDay()}/>
                    <CardContent>
                        {this.props.loreEntries.map(this.renderLoreEntry)}
                    </CardContent>
                </Card>
            </Grid>
        );
    }
});

export default Component;