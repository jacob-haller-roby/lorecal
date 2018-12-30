import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {Card, CardContent, CardHeader, Grid, Typography, Divider, withStyles} from "@material-ui/core";

const styles = {
    loreEntry: {
        margin: 10
    }
};

const Lore = createReactClass({

    propTypes: {
        loreEntries: PropTypes.array.isRequired
    },

    getDay() {
        return this.props.loreEntries[0].day;
    },

    militaryToStandard(time) {
        const timeSplit = time.split(':');
        let hour = parseInt(timeSplit[0]);
        let minute = timeSplit[1];
        let ampm = hour < 12 ? 'AM' : 'PM';

        if (hour === 0) hour = 12;
        if (hour > 12) hour -= 12;

        return hour + ':' + minute + ' ' + ampm;

    },

    renderLoreEntry(lore) {
        return <div key={lore.id}>
            <div className={this.props.classes.loreEntry}>
                <Typography variant="subtitle1">
                    <b>{this.militaryToStandard(lore.time)}</b>
                </Typography>
                <Typography color="textSecondary" variant="caption">
                    <i>Author: {lore.author.username}</i>
                </Typography>
                <Typography variant="body1">
                    {lore.entry}
                </Typography>
            </div>
            <Divider/>
        </div>
    },

    render() {
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

export default withStyles(styles)(Lore);