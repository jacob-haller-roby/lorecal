import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';

import {getMyCampaigns, createCampaign} from "../redux/actions/campaignActionCreator";
import selectors from "../redux/selectors/index";
import CampaignCard from '../components/CampaignCard';
import {Fab} from '@material-ui/core';
import {Add} from '@material-ui/icons';
import NewCampaignDialog from '../components/NewCampaignDialog';
import AnimateGrid from '../components/AnimateGrid';
import AnimateTransition from '../components/AnimateTransition';
import FabContainer from "../components/FabContainer";


const {myCampaigns} = selectors;

const Campaigns = createReactClass({

    propTypes: {
        getMyCampaigns: PropTypes.func.isRequired,
        campaigns: PropTypes.array.isRequired,
        createCampaign: PropTypes.func.isRequired
    },

    componentDidMount() {
        this.props.getMyCampaigns();
    },

    getInitialState() {
        return {
            newCampaignDialogOpen: false
        }
    },

    openNewCampaignDialog() {
        this.setState({
            newCampaignDialogOpen: true
        })
    },

    closeNewCampaignDialog() {
        this.setState({
            newCampaignDialogOpen: false
        })
    },

    render() {
        return (
            <div>
                <AnimateTransition>
                    <div>
                        <AnimateGrid>
                            {this.props.campaigns.map(campaign => (
                                <CampaignCard key={campaign.id} campaign={campaign}/>
                            ))}
                        </AnimateGrid>
                    </div>
                </AnimateTransition>
                <FabContainer>
                    <Fab onClick={this.openNewCampaignDialog}
                         size="large"
                         color="secondary">
                        <Add/>
                    </Fab>
                </FabContainer>
                <NewCampaignDialog open={this.state.newCampaignDialogOpen}
                                   handleClose={this.closeNewCampaignDialog}
                                   submit={this.props.createCampaign}/>
            </div>
        );
    }
});

export default connect(
    (state) => ({
        campaigns: myCampaigns(state)
    }),
    (dispatch) => ({
        getMyCampaigns: () => dispatch(getMyCampaigns()),
        createCampaign: (campaign) => dispatch(createCampaign(campaign))
    })
)(Campaigns);