import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import { makeSelectProgress } from './selectors';

const MyTeams = ({}) => {
    return (
        <PaperCard title="My Teams">

        </PaperCard>
    )
}




MyTeams.propTypes = {
    progress: PropTypes.bool,
}

const mapStateToProps = createStructuredSelector({
    progress: makeSelectProgress(),

});

function mapDispatchToProps(dispatch) {
    return {
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(MyTeams);
