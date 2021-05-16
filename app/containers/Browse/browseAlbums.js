import React, {useEffect} from 'react';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {useLocation} from 'react-router';
import {fetchAlbumsAction} from './actions';
import PropTypes from 'prop-types';
import {useInjectReducer} from '../../utils/injectReducer';
import browseReducer from './reducer';
import {useInjectSaga} from '../../utils/injectSaga';
import browseSaga from './saga';
import {makeSelectAlbums, makeSelectBrowseDataLoading} from './selectors';
import './index.scss';
import LoadingIndicator from '../../components/LoadingIndicator';
import 'react-virtualized/styles.css';
import PaperCard from "../../components/PaperCard";
import AlbumList from "../../components/AlbumList/Loadable";
import MoodAlbumList from "../../components/AlbumList/moodAlbumList";

const BrowseAlbums = ({fetchAlbums, albums, loading}) => {
  useInjectReducer({key: 'browse', reducer: browseReducer})
  useInjectSaga({key: 'browse', saga: browseSaga})
  const location = useLocation();
  const [item, setItem] = React.useState(null);

  useEffect(() => {
    if (location.state.data) {
      setItem(location.state.data)
      fetchAlbums(location.state.data.browseType, 0, 10, location.state.data.id)
    }
  }, []);

  return (
    <>
      {(item && !loading) ? <PaperCard title={item.title}>
        <div className="browse_container">
          {location.state.data.browseType === 'mood' ? <MoodAlbumList albums={albums}/> : <AlbumList albums={albums}/>}
          {albums.length === 0 && <div className="mt-5"><h4>No Albums found in this category.</h4></div>}
        </div>
      </PaperCard> : <LoadingIndicator/>}
    </>
  )
}


BrowseAlbums.propTypes = {
  fetchAlbums: PropTypes.func,
  albums: PropTypes.array,
  loading: PropTypes.bool

}
const mapStateToProps = createStructuredSelector({
  albums: makeSelectAlbums(),
  loading: makeSelectBrowseDataLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAlbums: (type, page, limit, id) => dispatch(fetchAlbumsAction(type, page, limit, id))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect
)(BrowseAlbums);
