import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../components/LoadingIndicator';
import PaperCard from '../../components/PaperCard';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { fetchBrowseDataAction } from './actions';
import './index.scss';
import browseReducer from './reducer';
import browseSaga from './saga';
import { makeSelectBrowseData, makeSelectBrowseDataLoading } from './selectors';
import defaultImage from '../../images/album-4.jpg'


const Browse = ({ browseData, fetchBrowseData, browseDataLoading }) => {

    useInjectSaga({ key: 'browse', saga: browseSaga });
    useInjectReducer({ key: 'browse', reducer: browseReducer })
    React.useEffect(() => {
        fetchBrowseData();
    }, []);
    return (
        <>
            {browseDataLoading ? <LoadingIndicator /> :
                <PaperCard title={'Browse Categories'}>
                    <div className="browse_container">
                        {browseData && browseData.genres.concat(browseData.moods).map(data => {
                            return <Card key={data.title} className="browse_card">
                                <Card.Img variant="top" src={data.image || ''} style={{ width: '14rem', height: '8rem' }} onError={e => {
                                   e.target.onerror = null;
                                    e.target.src = defaultImage;
                                }} />
                                <Card.ImgOverlay>
                                    <div className="card_title">{data.title}</div>
                                </Card.ImgOverlay>
                            </Card>
                        })}
                    </div>
                </PaperCard>}
        </>
    )
}

Browse.propTypes = {
    browseData: PropTypes.object,
    browseDataLoading: PropTypes.bool,
    fetchBrowseData: PropTypes.func

}
const mapStateToProps = createStructuredSelector({
    browseData: makeSelectBrowseData(),
    browseDataLoading: makeSelectBrowseDataLoading()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchBrowseData: () => dispatch(fetchBrowseDataAction())
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    withConnect
)(Browse);