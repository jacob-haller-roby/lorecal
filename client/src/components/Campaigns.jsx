import React from'react';
import PropTypes from'prop-types';
import {connect} from'react-redux';
import createReactClass from'create-react-class';

import { getMyCampaigns } from "../redux/actions/campaignActionCreator";
import selectors from "../redux/selectors";
const { myCampaigns } = selectors;

const Campaigns = createReactClass({

    propTypes: {
        getMyCampaigns: PropTypes.func.isRequired,
        campaigns: PropTypes.array.isRequired
    },

    componentDidMount() {
        this.props.getMyCampaigns();
    },

    getInitialState() {
        return {};
    },

    render() {
        return (
            <div>
                {this.props.campaigns.map(campaign => (
                    <div key={campaign.id}>
                        {campaign.title} - {campaign.id}
                    </div>
                ))}
            </div>
        );
    }
});

export default connect(
    (state) => ({
        campaigns: myCampaigns(state)
    }),
    (dispatch) => ({
        getMyCampaigns: () => dispatch(getMyCampaigns())
    })
)(Campaigns);