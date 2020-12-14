/**
 *
 * Song
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectSong from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

function Song() {
  return <div />;
}

Song.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  song: makeSelectSong()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "song", reducer });
const withSaga = injectSaga({ key: "song", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Song);
