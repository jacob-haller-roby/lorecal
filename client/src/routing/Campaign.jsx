import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';
import {Card, CardHeader, CardContent, Grid} from '@material-ui/core';
import {selectCampaign} from "../redux/actions/selectedActionCreator";
import selectors from '../redux/selectors/index';
import {getMyCampaigns, getCampaignLore, processImage} from "../redux/actions/campaignActionCreator";
import CircularProgressCentered from '../components/CircularProgressCentered';
import AnimatedTransition from '../components/AnimateTransition';
import AnimateGrid from '../components/AnimateGrid';
import Lore from '../components/Lore';
import UploadImage from '../components/UploadImage';

const {selectedCampaign, selectedLoreOrdered} = selectors;

const Campaign = createReactClass({

    propTypes: {
        match: PropTypes.object.isRequired,
        selectedCampaign: PropTypes.object.isRequired,
        selectCampaign: PropTypes.func.isRequired,
        getMyCampaigns: PropTypes.func.isRequired,
        selectedLoreOrdered: PropTypes.object.isRequired,
        getCampaignLore: PropTypes.func.isRequired,
        processImage: PropTypes.func.isRequired
    },

    componentDidMount() {
        if (!this.routeMatchesRedux()) {
            this.props.getMyCampaigns();
            this.props.selectCampaign(this.routeId());
        } else {
            this.props.getCampaignLore()
        }
    },

    routeId() {
        return parseInt(this.props.match.params.id);
    },

    routeMatchesRedux() {
        return this.props.selectedCampaign && this.routeId() === this.props.selectedCampaign.id;
    },

    render() {
        if (!this.routeMatchesRedux()) return <CircularProgressCentered/>;

        return (
            <AnimatedTransition>
                <Card>
                    <CardHeader title={this.props.selectedCampaign.title}
                                subheader={this.props.selectedCampaign.description}/>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12}>
                                <UploadImage submitImage={this.props.processImage}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <AnimateGrid>
                                    {Object.values(this.props.selectedLoreOrdered).map((loreEntries, i) => {
                                        return (
                                            <Lore loreEntries={loreEntries} key={i}/>
                                        );
                                    })}
                                </AnimateGrid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </AnimatedTransition>
        );
    }
});

export default connect(
    (state) => ({
        selectedCampaign: selectedCampaign(state),
        selectedLoreOrdered: selectedLoreOrdered(state)
    }),
    (dispatch) => ({
        selectCampaign: (id) => dispatch(selectCampaign(id)),
        getMyCampaigns: () => dispatch(getMyCampaigns()),
        getCampaignLore: (id) => dispatch(getCampaignLore(id)),
        processImage: (campaignId, image) => dispatch(processImage(campaignId, image))
    }),
    (state, actions, own) => ({
        ...state,
        ...actions,
        ...own,
        getCampaignLore: () => actions.getCampaignLore(state.selectedCampaign.id),
        processImage: (image) => actions.processImage(state.selectedCampaign.id, image)
    })
)(Campaign);