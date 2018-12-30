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

    getTimeout(i) {
        return this.easeOutQuad(i+2, 0, 375, this.props.children.length+1);
    },

    easeOutQuad(t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },

    render() {
        return (
            <Grid container spacing={8} {...this.props} >
                {this.props.children.map((child, i) => (
                    <Slide in={this.state.in}
                           direction="right"
                           key={i}
                           timeout={this.getTimeout(i)}>
                        {child}
                    </Slide>
                ))}
            </Grid>
        );
    }
});

export default AnimateGrid;