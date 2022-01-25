import React, {memo} from 'react';
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {makeSelectFormLoader} from "../../containers/Album/selectors";
import {castVote} from "../../containers/Album/actions";
import {connect} from "react-redux";
import {compose} from "redux";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const SongVote = ({songId, submitVote, votes, voteLoader, slug}) => {
  const castSongVote = () => {
    if (!voteLoader) {
      submitVote(songId, slug)
    }
  }

  return (
    <OverlayTrigger
      key="top"
      placement="top"
      overlay={
        <Tooltip id={`tooltip-top`}>
          I like this
        </Tooltip>
      }
    >
    <span className={`pl-4 ${voteLoader ? 'cursor-disabled' : 'cursor-pointer'}`} onClick={castSongVote}>
      <FontAwesomeIcon icon={faThumbsUp}/>
      <span className="pl-2">{votes}</span>
    </span>
    </OverlayTrigger>
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
    submitVote: (songId, slug) => dispatch(castVote(songId, slug)),
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
