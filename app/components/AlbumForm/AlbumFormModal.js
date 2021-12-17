import React, { memo, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import AlbumForm from '.';
import { getGenres, postAlbumRequest, songRequest } from '../../containers/Album/actions';
import { makeSelectFormLoader, makeSelectGenres, makeSelectMySongs } from '../../containers/Album/selectors';
import PropTypes from 'prop-types';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import reducer from '../../containers/Album/reducer';
import saga from '../../containers/Album/saga';

const AlbumFormModal = ({ show, setShow, genres, songs, formLoader, getGenreList, getSongs, submitAlbum }) => {

    useInjectReducer({key: 'album', reducer});
    useInjectSaga({key: 'album', saga});
    useEffect(() => {
        getGenreList();
        getSongs();
    }, [])
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
            size="lg"

        >
            <Modal.Header closeButton>
                <Modal.Title>Add Album</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AlbumForm formSubmit={values => {
                    submitAlbum({ ...values, albumGenres: values.albumGenres.map(genre => genre.id) }, () => {
                        setShow(false);
                    });
                }} genres={genres} songList={songs} formLoader={formLoader} showSongs={false} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

AlbumFormModal.propTypes = {
    getGenreList: PropTypes.func.isRequired,
    genres: PropTypes.array.isRequired,
    songs: PropTypes.array.isRequired,
    submitAlbum: PropTypes.func.isRequired,
    getSongs: PropTypes.func.isRequired,
    formLoader: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
    genres: makeSelectGenres(),
    songs: makeSelectMySongs(),
    formLoader: makeSelectFormLoader()
});

function mapDispatchToProps(dispatch) {
    return {
        getGenreList: () => dispatch(getGenres()),
        getSongs: () => dispatch(songRequest()),
        submitAlbum: (data, callback) => dispatch(postAlbumRequest(data, callback)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(AlbumFormModal);
