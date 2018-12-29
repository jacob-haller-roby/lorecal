import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    TextField,
    Button
} from '@material-ui/core';

const NewCampaignDialog = createReactClass({

    propTypes: {
        handleClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        submit: PropTypes.func.isRequired
    },

    getInitialState() {
        return {}
    },

    handleChange(field) {
        return (event) => {
            this.setState({
                [field]: event.target.value
            })
        }
    },

    submit() {
        this.props.submit({
            title: this.state.title,
            description: this.state.description
        });
    },

    render() {
        return (
            <Dialog handleClose={this.props.handleClose} open={this.props.open}>
                <DialogTitle>
                    Create New Campaign
                </DialogTitle>
                <DialogContent>
                    <TextField variant="outlined"
                               label="Campaign Title"
                               fullWidth
                               margin="normal"
                               onChange={this.handleChange('title')}/>
                    <TextField variant="outlined"
                               label="Campaign Description"
                               fullWidth
                               margin="normal"
                               onChange={this.handleChange('description')}
                               multiline
                               rows={15}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            color="secondary"
                            onClick={this.props.handleClose}
                            fullWidth>
                        Cancel
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.submit}
                            fullWidth>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
});

export default NewCampaignDialog;