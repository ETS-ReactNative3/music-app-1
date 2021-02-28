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
import { makeSelectFollowedAlbums, makeSelectFollowedArtist } from './selectors';
import PropTypes from 'prop-types';
import defaultImage from '../../images/album-3.jpg';
import { redirectOnAlbum } from '../../utils/redirect';

const Library = ({ getFollowedAlbums, followedAlbums, getFollowedArtist, followedArtists }) => {

    useInjectReducer({ key: 'library', reducer });
    useInjectSaga({ key: 'library', saga })
    React.useEffect(() => {
        getFollowedAlbums();
        getFollowedArtist();
    }, [])

    // type can be album or artist
    const renderItem = (name, image, description, type, albumSlug) => {
        return (
            <div onClick={() => redirectOnAlbum(albumSlug)} className="card bg-dark" style={{ width: 250 }}>
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
                    <p className="card-text">
                        {description}
                    </p>
                </div>
            </div>
        )
    }
    return (
        <PaperCard title="Requests">
            <Tabs
                defaultActiveKey="albums"
                id="uncontrolled-tab-example"
                className="mt-4"
            >
                <Tab eventKey="albums" title="Albums" className="tab-style table-cursor">
                    {/* {renderTable(newRequestList, newRequestColumns)} */}
                    <div style={{ margin: 20 }}>
                        {followedAlbums.map(album => renderItem(album.album.title, album.album.artwork, album.album.description, 'album', album.album.slug))}
                    </div>
                </Tab>
                
                <Tab
                    eventKey="artist"
                    title="Artist"
                    className="tab-style table-cursor"
                >
                    {/* <div style={{ margin: 20 }}>
                        {followedAlbums.map(album => renderItem(album.album.title, album.album.artwork, album.album.description))}
                    </div> */}
                </Tab>

            </Tabs>
        </PaperCard>
    )
}

Library.propTypes = {
    getFollowedAlbums: PropTypes.func,
    followedAlbums: PropTypes.array,
    getFollowedArtist: PropTypes.func,
    followedArtists: PropTypes.array,

}
const mapStateToProps = createStructuredSelector({
    followedAlbums: makeSelectFollowedAlbums(),
    followedArtists: makeSelectFollowedArtist()
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

