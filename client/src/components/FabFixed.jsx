import React from 'react';
import {Fab, withStyles} from '@material-ui/core';

const style = {
    bottomRight: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    bottomLeft: {
        margin: 0,
        top: 'auto',
        right: 'auto',
        bottom: 20,
        left: 20,
        position: 'fixed',
    }
};

const FabFixed = (props) => {
    const className = props.className === 'bottomLeft' ? props.classes.bottomLeft : props.classes.bottomRight;
    return (
        <Fab {...props} className={className}/>
    );
};

export default withStyles(style)(FabFixed);