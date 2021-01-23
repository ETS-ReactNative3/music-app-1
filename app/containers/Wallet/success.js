import React, {memo, useEffect} from 'react';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {useLocation} from "react-router-dom";
import {createPaymentRequestAction} from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function OrderSuccess({createOrder}) {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});
  const query = useQuery();

  useEffect(() => {
    createOrder(query.get("session_id"));
  }, [query]);

  return (
    <div>
      Success
    </div>
  )
}

OrderSuccess.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    createOrder: (id) => dispatch(createPaymentRequestAction(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect, memo)(OrderSuccess);
