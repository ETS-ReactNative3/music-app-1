import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PaperCard from '../../components/PaperCard';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { getGenres, getMoodListAction } from '../Song/actions';
import { makeSelectGenres, makeSelectMoods } from '../Song/selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import songReducer from '../Song/reducer';
import songSaga from '../Song/saga';
import { Card } from 'react-bootstrap';
import checkImage from '../../images/album-1.jpg';
import './index.scss'


const Browse = ({ fetchGenres, fetchMoods, genres, moods }) => {

    useInjectSaga({ key: 'song', saga: songSaga });
    useInjectReducer({ key: 'song', reducer: songReducer })
    React.useEffect(() => {
        fetchGenres();
        fetchMoods();
    }, []);
    return (
        <PaperCard title={'Browse Categories'}>
            <div className="browse_container">
                {genres && genres.map(genre => {
                    return <Card className="browse_card">
                        <Card.Img variant="top" src={checkImage} style={{ width: '14rem', height: '8rem' }} />
                        <Card.ImgOverlay>
                            <div className="card_title">{genre.title}</div>
                        </Card.ImgOverlay>
                    </Card>
                })}
            </div>
        </PaperCard>
    )
}

Browse.propTypes = {
    fetchGenres: PropTypes.func,
    fetchMoods: PropTypes.func,
    genres: PropTypes.array,
    moods: PropTypes.array

}
const mapStateToProps = createStructuredSelector({
    genres: makeSelectGenres(),
    moods: makeSelectMoods()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchGenres: () => dispatch(getGenres()),
        fetchMoods: () => dispatch(getMoodListAction()),
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    withConnect
)(Browse);