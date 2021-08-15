import React, {memo, useEffect} from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import {fetchFollowedAlbumsAction, fetchFollowedArtistAction} from './actions';
import reducer from './reducer';
import saga from './saga';
import {makeSelectFollowedAlbums, makeSelectFollowedArtist, makeSelectLibraryLoading} from './selectors';
import PropTypes from 'prop-types';
import './index.scss';
import LoadingIndicator from '../../components/LoadingIndicator';
import ArtistList from "../../components/ArtistList/Loadable";
import AlbumList from "../../components/AlbumList/Loadable";

const Library = ({getFollowedAlbums, followedAlbums, getFollowedArtist, followedArtists, loading}) => {

  useInjectReducer({key: 'library', reducer});
  useInjectSaga({key: 'library', saga})

  useEffect(() => {
    getFollowedAlbums();
    getFollowedArtist();
  }, [])

  return (
    <>
      {loading ? <LoadingIndicator/> :
        <PaperCard>
          <Tabs
            defaultActiveKey="albums"
            id="uncontrolled-tab-example"
            className="mt-4"
          >
            <Tab eventKey="albums" title="Albums" className="tab-style table-cursor">
              <div className="card_container">
                <AlbumList albums={followedAlbums}/>
                {followedAlbums.length === 0 && <h4>No liked albums.</h4>}
              </div>
            </Tab>

            <Tab
              eventKey="artist"
              title="Artist"
              className="tab-style table-cursor"
            >
              <ArtistList artists={followedArtists}/>
              {followedArtists.length === 0 && <h4>No followed artists.</h4>}
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

