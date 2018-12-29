import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import createReactClass from 'create-react-class';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import {selectCampaign} from "../redux/actions/selectedActionCreator";
import selectors from '../redux/selectors/index';
import {getMyCampaigns} from "../redux/actions/campaignActionCreator";
import CircularProgressCentered from '../components/CircularProgressCentered';
import AnimatedTransition from '../components/AnimateTransition';

const {selectedCampaign} = selectors;

const Campaign = createReactClass({

    propTypes: {
        match: PropTypes.object.isRequired,
        selectedCampaign: PropTypes.object.isRequired,
        selectCampaign: PropTypes.func.isRequired,
        getMyCampaigns: PropTypes.func.isRequired
    },

    componentDidMount() {
        if (!this.routeMatchesRedux()) {
            this.props.getMyCampaigns();
            this.props.selectCampaign(this.routeId());
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
                    <CardHeader title={this.props.selectedCampaign.title}/>
                    <CardContent>
                        <h2>{this.props.selectedCampaign.description}</h2>
                    </CardContent>
                </Card>
            </AnimatedTransition>
        );
    }
});

export default connect(
    (state) => ({
        selectedCampaign: selectedCampaign(state)
    }),
    (dispatch) => ({
        selectCampaign: (id) => dispatch(selectCampaign(id)),
        getMyCampaigns: () => dispatch(getMyCampaigns())
    })
)(Campaign);