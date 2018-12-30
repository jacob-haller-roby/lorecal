import React from 'react';
import createReactClass from 'create-react-class';
import {Fab, withStyles, Zoom} from '@material-ui/core';

const style = {
    fixed: {
        margin: 0,
        zIndex: 999,
        position: 'fixed',
        top: 'auto',
        bottom: 40,
        display: 'flex'
    },
    right: {
        right: 40,
        left: 'auto'
    },
    left: {
        right: 'auto',
        left: 40
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    child: {
        margin: 6
    }
};

const FabContainer = createReactClass({
    getInitialState() {
        return {in: false};
    },

    componentDidMount() {
        this.setState({in: true});
    },

    componentWillUnmount() {
        this.setState({in: false});
    },

    renderChildren() {
        if (Array.isArray(this.props.children)) {
            return (
                this.props.children.map((child, i) => {

                    return child && (
                        <div className={this.props.classes.child} key={i}>
                            <Zoom in={this.state.in}
                                  timeout={375}>
                                {child}
                            </Zoom>
                        </div>
                    )
                })
            )
        }
        return <Zoom in={this.state.in}
                     timeout={375}>
            {this.props.children}
        </Zoom>
    },

    render() {

        const {classes} = this.props;
        const horizontal = this.props.horizontal === 'left' ? classes.left : classes.right;
        const flexDirection = this.props.flexDirection === 'row' ? classes.row : classes.column;

        return (
            <div {...this.props} className={[classes.fixed, horizontal, flexDirection].join(' ')}>
                {this.renderChildren()}
            </div>
        );
    }
});

export default withStyles(style)(FabContainer);