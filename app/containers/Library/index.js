import React, { memo } from 'react';
import { Button, Card, Image, Tab, Tabs } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { fetchFollowedAlbumsAction, fetchFollowedArtistAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectFollowedAlbums, makeSelectFollowedArtist, makeSelectLibraryLoading } from './selectors';
import PropTypes from 'prop-types';
import defaultImage from '../../images/album-3.jpg';
import { redirectOnAlbum } from '../../utils/redirect';
import { useHistory } from 'react-router-dom';
import './index.scss';
import LoadingIndicator from '../../components/LoadingIndicator';

const Library = ({ getFollowedAlbums, followedAlbums, getFollowedArtist, followedArtists, loading }) => {

    useInjectReducer({ key: 'library', reducer });
    useInjectSaga({ key: 'library', saga })
    const history = useHistory();
    React.useEffect(() => {
        getFollowedAlbums();
        getFollowedArtist();
    }, [])

    // type can be album or artist
    const renderItem = (name, image, description, type, slug) => {
        return (
            <div onClick={() => type === 'album' ? redirectOnAlbum(slug) : history.push(`artist/${slug}`)} className="card bg-dark card_style">
                <Image
                    width={250}
                    height={150}
                    onError={e => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                    }}
                    src={image}
                    alt=""
                />
                <div className="card-body">
                    <div className="card-title h5">{name}</div>
                    <div className="description-text">{description}</div>
                </div>
            </div>
        )
    }
    return (
        <>
            {loading ? <LoadingIndicator/> :
                <PaperCard title="Requests">
                    <Tabs
                        defaultActiveKey="albums"
                        id="uncontrolled-tab-example"
                        className="mt-4"
                    >
                        <Tab eventKey="albums" title="Albums" className="tab-style table-cursor">
                            <div className="card_container">
                                {followedAlbums.map(album => renderItem(album.album.title, album.album.artwork, album.album.description, 'album', album.album.slug))}
                                {followedAlbums.length === 0 && <h4>No albums in library.</h4>}
                            </div>
                        </Tab>

                        <Tab
                            eventKey="artist"
                            title="Artist"
                            className="tab-style table-cursor"
                        >
                            <div className="card_container">
                                {followedArtists.map(artist => renderItem(artist.artist.name, artist.artist.avatar, artist.artist.biography, 'artist', artist.artistId))}
                                {followedArtists.length === 0 && <h4>No artists in library.</h4>}
                            </div>
                        </Tab>

                    </Tabs>
                </PaperCard>}
        </>
    )
}

Library.propTypes = {
    getFollowedAlbums: PropTypes.func,
    followedAlbums: PropTypes.array,
    getFollowedArtist: PropTypes.func,
    followedArtists: PropTypes.array,
    loading: PropTypes.bool

}
const mapStateToProps = createStructuredSelector({
    followedAlbums: makeSelectFollowedAlbums(),
    followedArtists: makeSelectFollowedArtist(),
    loading: makeSelectLibraryLoading()
});

function mapDispatchToProps(dispatch) {
    return {
        getFollowedAlbums: () => dispatch(fetchFollowedAlbumsAction()),
        getFollowedArtist: () => dispatch(fetchFollowedArtistAction())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Library);

