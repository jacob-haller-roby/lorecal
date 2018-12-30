import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {Button, withStyles} from '@material-ui/core';
import CircularProgressCentered from "./CircularProgressCentered";

const styles = {
    fullWidth: {
        maxWidth: '100%',
        maxHeight: '200px'
    }
};

const UploadImage = createReactClass({

    propTypes: {
        submitImage: PropTypes.func.isRequired
    },

    getInitialState() {
        return {
            image: undefined,
            loading: false
        }
    },

    clickInput() {
        this.uploadInput.click();
    },

    selectImage() {
        this.setState({loading: true},
            () => {
                const FR = new FileReader();
                FR.addEventListener("load", (e) => this.setState({
                    image: e.target.result,
                    loading: false
                }));
                FR.readAsDataURL(this.uploadInput.files[0]);
            }
        );
    },

    clearImage() {
        this.setState({
            image: undefined,
            loading: false
        })
    },

    submitImage() {
        this.props.submitImage(this.state.image);
        this.setState({image: undefined});
    },

    render() {
        if (this.state.image) return this.renderConfirm();
        return this.renderSelect();
    },

    renderSelect() {
        return (
            <div>
                <input
                    accept="image/*"
                    id="raised-button-file"
                    ref={(ref) => {
                        this.uploadInput = ref;
                    }}
                    hidden
                    type="file"
                    onChange={this.selectImage}
                />
                <Button variant="contained" onClick={this.clickInput}>
                    Choose A File
                </Button>
                <div>
                    {this.state.loading && this.renderLoading()}
                </div>
            </div>
        );
    },

    renderConfirm() {
        return (<div>
                <img src={this.state.image} className={this.props.classes.fullWidth}/>
                <Button onClick={this.clearImage} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button onClick={this.submitImage} variant="contained" color="primary">
                    Upload
                </Button>
            </div>
        );
    },

    renderLoading() {
        return (
            <CircularProgressCentered/>
        )
    }
});

export default withStyles(styles)(UploadImage);