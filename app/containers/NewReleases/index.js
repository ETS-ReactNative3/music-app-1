import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {getNewReleases} from '../HomePage/actions';
import PropTypes from 'prop-types';
import {useInjectReducer} from '../../utils/injectReducer';
import reducer from '../HomePage/reducer';
import {useInjectSaga} from '../../utils/injectSaga';
import homePageData from '../HomePage/saga';
import {makeSelectNewReleaseLoading, makeSelectNewReleases} from '../HomePage/selectors';
import {Image, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PaperCard from '../../components/PaperCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import {Link} from "react-router-dom";
import defaultImage from "../../images/user.svg";

const NewReleases = ({getNewReleasesAction, newReleases, newReleasesLoading}) => {

  useInjectReducer({key: 'home', reducer});
  useInjectSaga({key: 'home', saga: homePageData})
  useEffect(() => {
    getNewReleasesAction();
  }, []);

  return (
    <>
      {newReleasesLoading ? <LoadingIndicator/> : <PaperCard title="New Releases">
        <div className="row pt-3">
          {newReleases.map(album => (
            <div className="col-md-3 my-3" key={album.id}>
              <div className="card bg-dark">
                <div className="card-body">
                  <Link to={`/album/${album.slug}`}>
                    <Image
                      width={200}
                      height={200}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                      src={album.artwork}
                      alt="album image"
                    />
                    <div className="pt-4">
                      <h4>{album.title}</h4>
                      {album.description.length > 30 ? <OverlayTrigger
                          placement="top"
                          delay={{show: 250, hide: 400}}
                          overlay={<Tooltip id={`song-title-tooltip`}>{album.description}</Tooltip>}
                        ><h6>{album.description.substring(0, 30)}...</h6></OverlayTrigger> :
                        <h6>{album.description}</h6>
                      }
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PaperCard>}
    </>
  )
}

NewReleases.prototype = {
  getNewReleasesAction: PropTypes.func,
  newReleases: PropTypes.array,
  newReleasesLoading: PropTypes.bool

}

const mapStateToProps = createStructuredSelector({
  newReleases: makeSelectNewReleases(),
  newReleasesLoading: makeSelectNewReleaseLoading(),

})

const mapDispatchToProps = (dispatch) => {
  return {
    getNewReleasesAction: () => dispatch(getNewReleases()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect, memo)(NewReleases);
