import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation, useParams } from 'react-router';
import { fetchAlbumsAction } from './actions';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../utils/injectReducer';
import browseReducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import browseSaga from './saga';
import { makeSelectAlbums, makeSelectBrowseDataLoading } from './selectors';
import './index.scss';
import { Card } from 'react-bootstrap';
import defaultImage from '../../images/album-1.jpg'
import LoadingIndicator from '../../components/LoadingIndicator';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';

const BrowseAlbums = ({ fetchAlbums, albums, loading }) => {

    useInjectReducer({ key: 'browse', reducer: browseReducer })
    useInjectSaga({ key: 'browse', saga: browseSaga })
    const location = useLocation();
    const [item, setItem] = React.useState(null);

    React.useEffect(() => {
        if (location.state.data) {
            setItem(location.state.data)
            fetchAlbums(location.state.data.browseType, 0, 10, location.state.data.id)
        }
    }, []);

    return (
        <>
            {(item && !loading) ? <div>
                <h1>{item.title}</h1>
                
            </div> : <LoadingIndicator />}
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