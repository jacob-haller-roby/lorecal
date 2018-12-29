import React from 'react';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import {Card, CardContent, CardActions, CardHeader, Grid, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const CampaignCard = createReactClass({

    propTypes: {
        campaign: PropTypes.object.isRequired
    },

    render() {
        const {campaign} = this.props;
        return (
            <Grid md={4} sm={6} xs={12} item>
                <Card>
                    <CardHeader title={campaign.title} subheader={campaign.description}/>
                    <CardActions>
                        <Button component={Link}
                                to={'/campaign/' + campaign.id}
                                variant="contained"
                                color="primary"
                                fullWidth>
                            Open
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
});

export default CampaignCard;