import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';
import {Card, CardHeader, CardContent, Grid, Hidden, Tabs, Tab, withTheme, Typography} from '@material-ui/core';
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

    getInitialState() {
        return {tab: 0}
    },

    handleTabChange(event, tab) {
        this.setState({tab});
    },

    routeId() {
        return parseInt(this.props.match.params.id);
    },

    routeMatchesRedux() {
        return this.props.selectedCampaign && this.routeId() === this.props.selectedCampaign.id;
    },

    render() {
        if (!this.routeMatchesRedux()) return <CircularProgressCentered/>;
        console.log(this.props.theme);

        return (
            <div>
                <UploadImage submitImage={this.props.processImage}/>
                <AnimatedTransition>
                    <Card>
                        <CardHeader title={this.props.selectedCampaign.title}/>
                        <CardContent>
                            <Hidden mdUp>
                                <Tabs value={this.state.tab}
                                      onChange={this.handleTabChange}
                                      style={{
                                          backgroundColor: this.props.theme.palette.primary.main,
                                          color: this.props.theme.palette.common.white,
                                          marginBottom: 25
                                      }}
                                      fullWidth>
                                    <Tab label="Details"/>
                                    <Tab label="Lore"/>
                                </Tabs>
                            </Hidden>
                            <Grid container spacing={40}>
                                <Hidden smDown={this.state.tab !== 0}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h3" gutterBottom>
                                            Details
                                        </Typography>
                                        <Typography variant="body1">
                                            {this.props.selectedCampaign.description}
                                        </Typography>
                                    </Grid>
                                </Hidden>
                                <Hidden smDown={this.state.tab !== 1}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h3" gutterBottom>
                                            Lore
                                        </Typography>
                                        <AnimateGrid>
                                            {Object.values(this.props.selectedLoreOrdered).map((loreEntries, i) => {
                                                return (
                                                    <Lore loreEntries={loreEntries} key={i}/>
                                                );
                                            })}
                                        </AnimateGrid>
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </CardContent>
                    </Card>
                </AnimatedTransition>
            </div>
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
)(withTheme()(Campaign));