import React, {memo, useEffect} from 'react';
import TopNavBar from '../../components/TopNavBar';
import LeftSideBar from '../../components/LeftSidebar';
import Footer from '../../components/Footer';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {makeSelectRole} from "../App/selectors";
import {prepareApp} from "../App/actions";
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import reducer from '../App/reducer';
import saga from '../App/saga';

function Dashboard({children, appInit, role}) {
  useInjectReducer({key: 'global', reducer});
  useInjectSaga({key: 'global', saga});

  useEffect(() => {
    appInit();
  }, []);

  return (
    <main className="content-wrapper" role="main">
      <TopNavBar/>
      <LeftSideBar role={role}/>
      <div className="pt-5">
        {children}
      </div>
      <Footer/>
    </main>
  );
}

const mapStateToProps = createStructuredSelector({
  role: makeSelectRole()
});

function mapDispatchToProps(dispatch) {
  return {
    appInit: () => {
      dispatch(prepareApp());
    }
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

