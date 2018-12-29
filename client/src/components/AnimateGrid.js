import React from 'react';
import createReactClass from 'create-react-class';
import {Slide, Grid} from '@material-ui/core';


const AnimateGrid = createReactClass({
    getInitialState() {
        return {in: false}
    },

    componentDidMount() {
        this.setState({in: true});
    },

    render() {
        return (
            <Grid container spacing={8} {...this.props} >
                {this.props.children.map((child, i) => (
                    <Slide in={this.state.in}
                           direction="right"
                           key={i}
                           timeout={375 * (i + 2) / 2}>
                        {child}
                    </Slide>
                ))}
            </Grid>
        );
    }
});

export default AnimateGrid;