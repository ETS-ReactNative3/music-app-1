import { faPause, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import { Col, Container, Image, Modal, Row } from 'react-bootstrap';
import { compose } from 'redux';
import defaultImage from '../../images/album-1.jpg';
import SongsOptionsBox from '../SongsOptionsBox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentSong, makeSelectRole } from '../../containers/App/selectors';
import { makeSelectPlaylists } from '../../containers/Playlist/selectors';
import { createPlaylistandAddSong, getMyPlaylist } from '../../containers/Playlist/actions';
import PropTypes from 'prop-types';
import { handleSingleSong, setPlaylist } from '../../containers/App/actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducerPlaylist from '../../containers/Playlist/reducer';
import sagaPlaylist from '../../containers/Playlist/saga';

const ArtistPopup = ({ artist, handleClose, showMoreInfo, currentSong,playlists,createPlaylistandAddSongAction,
    getMyPlaylistAction,
    addSongIntoPlaylistAction, role, setPlaylistAction, onHandleSingleSong}) => {
        useInjectReducer({ key: 'playlist', reducer: reducerPlaylist });
        useInjectSaga({ key: 'playlist', saga: sagaPlaylist });
    function displayTime(seconds) {
        const format = val => `0${Math.floor(val)}`.slice(-2)
        const hours = seconds / 3600
        const minutes = (seconds % 3600) / 60
        if (hours >= 1) {
            return [hours, minutes, seconds % 60].map(format).join(':')
        }

        return [minutes, seconds % 60].map(format).join(':')
    }

    const singleSongHandler = songId => {
        setPlaylistAction(artist.songs)
        const status = currentSong.songData.id === songId ? !currentSong.playing : true;
        onHandleSingleSong(songId, status);
      };
    return (
        <Modal
            show={showMoreInfo}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
        >

            <Container>

                <FontAwesomeIcon icon={faTimes} style={{ position: 'absolute', left: 0, top: 0, backgroundColor: 'red', cursor: 'pointer' }} onClick={() => { handleClose() }} />
                <div className="">
                    <Image
                        width={'100%'}
                        height={250}
                        onError={e => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                        }}
                        src={artist.coverPhoto || ''}
                        alt="user avatar"
                    />
                </div>
                <Row>
                    <Col>
                        <h2>
                            {artist.name}
                        </h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <section>
                            {artist.songs.slice(0, 3).map((ele, index) => (
                                <div
                                    className="row song-row align-content-center py-3"
                                    id={`songNumber${ele.id}`}
                                    key={index}
                                >
                                    <div className="col-10">
                                        <span className="song-number pr-3">{index + 1}</span>
                                        <span
                                            onClick={() => singleSongHandler(ele.id)}
                                            className="cursor-pointer px-3"
                                        >
                                            <FontAwesomeIcon
                                                icon={
                                                    currentSong.songData.id === ele.id &&
                                                        currentSong.playing
                                                        ? faPause
                                                        : faPlay
                                                }
                                            />
                                        </span>
                                        <h5 className="song-title d-inline">{ele.title}</h5>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <span className="song-duration px-4">{ele.duration ? displayTime(ele.duration) : '00:00'}</span>
                                        {role && (
                                            <SongsOptionsBox
                                                songId={ele.id}
                                                playlists={playlists}
                                                getMyPlaylistAction={getMyPlaylistAction}
                                                createPlaylistandAddSongAction={
                                                    createPlaylistandAddSongAction
                                                }
                                                addSongIntoPlaylistAction={
                                                    addSongIntoPlaylistAction
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </section>
                    </Col>
                </Row>
            </Container>
        </Modal>
    )
}

ArtistPopup.propTypes = {
    currentSong: PropTypes.object,
    playlists: PropTypes.array,
    createPlaylistandAddSongAction: PropTypes.func,
    getMyPlaylistAction: PropTypes.func,
    addSongIntoPlaylistAction: PropTypes.func,
    setPlaylistAction:PropTypes.func,
    role: PropTypes.any,
    onHandleSingleSong: PropTypes.func
}

const mapStateToProps = createStructuredSelector({

    currentSong: makeSelectCurrentSong(),
  playlists: makeSelectPlaylists(),
  role: makeSelectRole(),


});

export function mapDispatchToProps(dispatch) {
    return {
        createPlaylistandAddSongAction: data =>
        dispatch(createPlaylistandAddSong(data)),
      getMyPlaylistAction: () => dispatch(getMyPlaylist()),
      addSongIntoPlaylistAction: data => dispatch(addSongIntoPlaylist(data)),
    setPlaylistAction: (songs) => dispatch(setPlaylist(songs)),
    onHandleSingleSong: (index, status) =>
    dispatch(handleSingleSong(index, status)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(ArtistPopup);

