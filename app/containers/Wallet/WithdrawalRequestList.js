import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {useInjectReducer} from "../../utils/injectReducer";
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";

const WithdrawalRequestList = () => {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  return (
    <PaperCard title="Withdrawal Requests">
      asd
    </PaperCard>
  )
}

WithdrawalRequestList.propTypes = {
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect, memo)(WithdrawalRequestList);
