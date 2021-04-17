import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectUserDetails } from '../App/selectors';
import { makeSelectProgress, makeSelectMyTeamRequests } from './selectors';
import PaperCard from '../../components/PaperCard';
import {fetchMyTeamRequestAction} from './actions';

const TeamRequest = ({myTeamRequest, fetchMyTeamRequest}) => {

    React.useEffect(() => {
        fetchMyTeamRequest();
    }, []);
    return (
    <PaperCard title="Team Requests">
       
    </PaperCard>)
}



TeamRequest.propTypes = {
    userDetails: PropTypes.any,
    progress: PropTypes.bool,
    fetchMyTeamRequest: PropTypes.func,
    myTeamRequest: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    userDetails: makeSelectUserDetails(),
    progress: makeSelectProgress(),
    myTeamRequest: makeSelectMyTeamRequests()
    
});

function mapDispatchToProps(dispatch) {
    return {
        fetchMyTeamRequest: () => dispatch(fetchMyTeamRequestAction())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(TeamRequest);
