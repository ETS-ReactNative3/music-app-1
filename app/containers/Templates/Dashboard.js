import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import PropTypes from 'prop-types';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import {
  makeSelectLoading,
  makeSelectRole,
  makeSelectUserDetails,
} from '../App/selectors';
import { getUserDetails, getUserDetailsSuccess, prepareApp } from '../App/actions';
import reducer from '../App/reducer';
import saga from '../App/saga';
import LoadingIndicator from '../../components/LoadingIndicator';

function Dashboard({
  children,
  appInit,
  role,
  userDetails,
  getUserDetailsAction,
  loading,
  putUserDetails
}) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  useEffect(() => {
    appInit();
    getUserDetailsAction();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <main className="content-wrapper" role="main">
          <TopNavBar userDetails={userDetails} putUserDetails={putUserDetails} />
          <LeftSideBar
            role={role}
            isInfluencer={userDetails && userDetails.influencerId !== null}
            userDetails={userDetails}
          />
          <div className="pt-5">{children}</div>
          <Footer />
        </main>
      )}
    </>
  );
}

Dashboard.propTypes = {
  children: PropTypes.any,
  appInit: PropTypes.any,
  role: PropTypes.any,
  userDetails: PropTypes.any,
  getUserDetailsAction: PropTypes.any,
  loading: PropTypes.any,
  putUserDetails: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
  userDetails: makeSelectUserDetails(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    appInit: () => dispatch(prepareApp()),
    getUserDetailsAction: () => dispatch(getUserDetails()),
    putUserDetails: (userDetail) => dispatch(getUserDetailsSuccess(userDetail))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
