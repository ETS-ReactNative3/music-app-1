import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {useParams} from 'react-router-dom';
import {compose} from 'redux';
import React, {memo, useEffect, useState} from 'react';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import PropTypes from 'prop-types';
import reducer from './reducer';
import saga from './saga';
import {
  getAlbum, getGenres,
  postAlbumRequest,
  songRequest,
  updateAlbum,
} from './actions';
import {
  makeSelectAlbumLoader,
  makeSelectEditAlbum, makeSelectGenres,
  makeSelectMySongs,
} from './selectors';

import AlbumForm from "../../components/AlbumForm";
import PaperCard from "../../components/PaperCard";

function Form(
  {
    getGenreList,
    genres,
    songs,
    submitAlbum,
    getSongs,
    getEditAlbum,
    album,
    classes,
    loader,
    editAlbum,
  }) {
  useInjectReducer({key: 'album', reducer});
  useInjectSaga({key: 'album', saga});
  const {id} = useParams();

  const [addAlbum, setAddAlbum] = useState(true);

  useEffect(() => {
    getGenreList();
    getSongs();

    if (id) {
      getEditAlbum(id);
      setAddAlbum(false);
    }
  }, [id]);

  const onSubmit = values => {
    if (addAlbum) {
      submitAlbum(values);
    } else {
      editAlbum({...values, id});
    }
  };

  return (
    <PaperCard title={addAlbum ? 'Add Album' : 'Edit Album'}>
      {
        addAlbum ? <AlbumForm formSubmit={values => onSubmit(values)} genres={genres} songList={songs}/> :
          <AlbumForm formSubmit={values => onSubmit(values)} genres={genres} album={album} songList={songs}/>
      }

    </PaperCard>
  );
}

Form.propTypes = {
  getGenreList: PropTypes.func.isRequired,
  genres: PropTypes.array.isRequired,
  songs: PropTypes.array.isRequired,
  submitAlbum: PropTypes.func.isRequired,
  getSongs: PropTypes.func.isRequired,
  getEditAlbum: PropTypes.func.isRequired,
  album: PropTypes.object,
  loader: PropTypes.bool.isRequired,
  editAlbum: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  songs: makeSelectMySongs(),
  album: makeSelectEditAlbum(),
  loader: makeSelectAlbumLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSongs: () => dispatch(songRequest()),
    getEditAlbum: id => dispatch(getAlbum(id)),
    submitAlbum: data => dispatch(postAlbumRequest(data)),
    editAlbum: data => dispatch(updateAlbum(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Form);
