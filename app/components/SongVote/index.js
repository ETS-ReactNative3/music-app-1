import React, {memo} from 'react';
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {makeSelectFormLoader} from "../../containers/Album/selectors";
import {castVote} from "../../containers/Album/actions";
import {connect} from "react-redux";
import {compose} from "redux";

const SongVote = ({songId, submitVote, votes, voteLoader, walletAddress, slug}) => {
  const castVote = () => {
    if (!voteLoader) {
      submitVote(songId, walletAddress, slug)
    }
  }

  return (
    <span className={`pl-4 ${voteLoader ? 'cursor-disabled' : 'cursor-pointer'}`} onClick={castVote}>
      <FontAwesomeIcon icon={faThumbsUp}/>
      <span className="pl-2">{votes}</span>
    </span>
  );
}

SongVote.propTypes = {
  submitVote: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  formLoader: makeSelectFormLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    submitVote: (songId, walletAddress, slug) => dispatch(castVote(songId, walletAddress, slug)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SongVote);
