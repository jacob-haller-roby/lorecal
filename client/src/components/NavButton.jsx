import React from 'react';
import creatReactClass from 'create-react-class';
import {Link} from "react-router-dom";
import {Button, withStyles} from "@material-ui/core";

const styles = {
    noSelect: {
        userSelect: 'none'
    }
};

const NavButton = creatReactClass({
    render() {
        const {children, classes, ...props} = this.props;
        return (
            <Button component={Link} color="inherit" {...props}>
                <span className={classes.noSelect}>
                    {children}
                </span>
            </Button>
        )
    }
});

export default withStyles(styles)(NavButton);