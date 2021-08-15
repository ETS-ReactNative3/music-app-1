import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import LoadingIndicator from '../../components/LoadingIndicator';
import PaperCard from '../../components/PaperCard';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import {fetchBrowseDataAction} from './actions';
import './index.scss';
import browseReducer from './reducer';
import browseSaga from './saga';
import {makeSelectBrowseData, makeSelectBrowseDataLoading} from './selectors';
import {useHistory} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic, faHeadphonesAlt} from "@fortawesome/free-solid-svg-icons";

const Browse = ({browseData, fetchBrowseData, browseDataLoading}) => {
  useInjectSaga({key: 'browse', saga: browseSaga});
  useInjectReducer({key: 'browse', reducer: browseReducer})
  React.useEffect(() => {
    fetchBrowseData();
  }, []);

  const history = useHistory()
  return (
    <>
      {browseDataLoading ? <LoadingIndicator/> :
        <PaperCard>
          <section className="mb-4">
            <h2>Music by genre</h2>
            <div className="row">
              {browseData && browseData.genres.map(data =>
                <div className="col-md-3 mt-3" key={data.title}
                     onClick={() => history.push(`/browse/${data.title}`, {
                       data: {
                         ...data,
                         browseType: 'genre'
                       }
                     })}>
                  <div className="card bg-dark overflow-hidden">
                    <div className="card-body browse-card">
                      <span className="font-weight-bold">{data.title}</span>
                      <div className="card-body-icon">
                        <FontAwesomeIcon icon={faMusic} size="lg" className="mr-2 earningIcon"/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
          <section className="pt-3">
            <h2>Music by mood</h2>
            <div className="row">
              {browseData && browseData.moods.map(data =>
                <div className="col-md-3 mt-3" key={data.title}
                     onClick={() => history.push(`/browse/${data.title}`, {data: {...data, browseType: 'mood'}})}>
                  <div className="card bg-dark overflow-hidden">
                    <div className="card-body browse-card">
                      <span className="font-weight-bold">{data.title}</span>
                      <div className="card-body-icon">
                        <FontAwesomeIcon icon={faHeadphonesAlt} size="lg" className="mr-2 earningIcon rotate-icon"/>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
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
