import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import {makeSelectRole, makeSelectUserDetails} from '../App/selectors';
import { prepareApp } from '../App/actions';
import reducer from '../App/reducer';
import saga from '../App/saga';

function Dashboard({ children, appInit, role, userDetails }) {
  useInjectReducer({ key: 'global', reducer });
  useInjectSaga({ key: 'global', saga });

  useEffect(() => {
    appInit();
  }, []);

  return (
    <main className="content-wrapper" role="main">
      <TopNavBar userDetails={userDetails} />
      <LeftSideBar role={role} />
      <div className="pt-5">{children}</div>
      <Footer />
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole(),
  userDetails: makeSelectUserDetails()
});

function mapDispatchToProps(dispatch) {
  return {
    appInit: () => {
      dispatch(prepareApp());
    },
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
