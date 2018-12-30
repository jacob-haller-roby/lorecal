import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
    Button,
    withStyles,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Fab,
    DialogContentText
} from '@material-ui/core';
import {AddToPhotos, PhotoCamera} from '@material-ui/icons';
import FabContainer from './FabContainer';
import CircularProgressCentered from "./CircularProgressCentered";

const styles = {
    fullWidth: {
        maxWidth: '100%',
        maxHeight: '50vh'
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

    clickInput(refName) {
        return () => this[refName].click();
    },

    selectImage(refName) {
        return () => {
            const FR = new FileReader();
            FR.addEventListener("load", (e) => this.setState({
                image: e.target.result,
                loading: false
            }));
            FR.readAsDataURL(this[refName].files[0]);
        };
    },

    clearImage() {
        this.setState({
            image: undefined,
            loading: false
        })
    },

    submitImage() {
        this.setState(
            {loading: true},
            () => this.props.submitImage(this.state.image)
                .finally(() => this.setState({
                    loading: false,
                    image: undefined
                }))
        );
    },

    isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    },

    render() {
        return (
            <div>
                {this.renderFab()}
                {this.renderConfirmDialog()}
            </div>
        )
    },

    renderFab() {
        return (
            <div>
                <input
                    accept="image/*"
                    id="raised-button-file"
                    ref={(ref) => {
                        this.uploadInputCapture = ref;
                    }}
                    hidden
                    type="file"
                    onChange={this.selectImage('uploadInputCapture')}
                    capture
                />
                <input
                    accept="image/*"
                    id="raised-button-file"
                    ref={(ref) => {
                        this.uploadInput = ref;
                    }}
                    hidden
                    type="file"
                    onChange={this.selectImage('uploadInput')}
                />
                <FabContainer>
                    {
                        this.isMobileDevice() &&
                        <Fab color="primary" onClick={this.clickInput('uploadInputCapture')}>
                            <PhotoCamera/>
                        </Fab>
                    }
                    <Fab color="primary" onClick={this.clickInput('uploadInput')}>
                        <AddToPhotos/>
                    </Fab>
                </FabContainer>
            </div>
        );
    },

    renderConfirmDialog() {
        return (
            <Dialog open={!!this.state.image} onClose={this.clearImage}>
                <DialogTitle>
                    New Lore Upload
                </DialogTitle>
                {this.state.loading ? this.renderLoading() : this.renderPreview()}
                {
                    this.state.loading ||
                    <DialogActions>
                        <Button onClick={this.clearImage}
                                fullWidth
                                variant="outlined"
                                color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={this.submitImage}
                                variant="contained"
                                fullWidth
                                color="primary">
                            Upload
                        </Button>
                    </DialogActions>
                }
            </Dialog>
        );
    },

    renderPreview() {
        return (
            <DialogContent>
                <DialogContentText>
                    Don't worry about orientation, Lorecal will be able to read it!
                </DialogContentText>
                <img src={this.state.image} className={this.props.classes.fullWidth}/>
            </DialogContent>
        )
    },

    renderLoading() {
        return (
            <DialogContent>
                <CircularProgressCentered className={this.props.classes.fullWidth}/>
            </DialogContent>
        )
    }
});

export default withStyles(styles)(UploadImage);