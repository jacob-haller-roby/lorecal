import React from 'react';
import createReactClass from 'create-react-class';
import {Grow, Grid} from '@material-ui/core';

const AnimateGrid = createReactClass({
    getInitialState() {
        return {in: false}
    },

    componentDidMount() {
        this.setState({in: true});
    },

    render() {
        return (
            <Grow in={this.state.in} timeout={375}>
                {this.props.children}
            </Grow>
        );
    }
});

export default AnimateGrid;