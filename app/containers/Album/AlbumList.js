import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectMyAlbums } from './selectors';
import { deleteAlbum, getMyAlbumsRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

function AlbumList({
  getMyAlbums, myAlbums, deleteAlbumCall
}) {
  const [albumId, setAlbumId] = useState(0);
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

  useEffect(() => {
    getMyAlbums();
  }, []);

  const [open, setOpen] = React.useState(false);

  function handleClickOpen(id) {
    setAlbumId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteAlbumAction() {
    deleteAlbumCall(albumId);
    setOpen(false);
    setAlbumId(0);
  }

  return (
    <div>aasd</div>
  );
}

AlbumList.propTypes = {
  getMyAlbums: PropTypes.func.isRequired,
  myAlbums: PropTypes.array.isRequired,
  deleteAlbumCall: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myAlbums: makeSelectMyAlbums()
});

function mapDispatchToProps(dispatch) {
  return {
    getMyAlbums: () => {
      dispatch(getMyAlbumsRequest());
    },
    deleteAlbumCall: (id) => dispatch(deleteAlbum(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(AlbumList);
