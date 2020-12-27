/**
 *
 * Tastemaker
 *
 */

import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import {getTasteMakersRequest} from "./actions";
import PaperCard from "../../components/PaperCard";
import {makeSelectTastemaker} from "./selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faTwitter, faYoutube, faInstagram} from "@fortawesome/free-brands-svg-icons";

export function Tastemaker({getTasteMakersAction, tasteMakers}) {
  useInjectReducer({key: 'tastemaker', reducer});
  useInjectSaga({key: 'tastemaker', saga});

  useEffect(() => {
    getTasteMakersAction();
  }, []);

  return (
    <PaperCard title="Tastemakers">
      <div className="row">
        <div className="col-12 col-md-4 col-lg-3">
          <div>Campaign Mediums</div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Facebook</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Twitter</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Youtube</label>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" htmlFor="exampleCheck1">Instagram</label>
          </div>
        </div>
        <div className="col-12 col-md-8 col-lg-9">
          <div className="row">
            {tasteMakers.length > 0 && tasteMakers.map((item, index) =>
              <div className="col-md-4" key={index}>
                <div className="card bg-dark">
                  <img className="card-img-top" src={item.avatar} alt={item.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.influencer.description}</h6>
                    <div>
                      {item.influencer.facebook && <FontAwesomeIcon icon={faFacebook} className="mr-2"/>}
                      {item.influencer.twitter && <FontAwesomeIcon icon={faTwitter} className="mr-2"/>}
                      {item.influencer.youtube && <FontAwesomeIcon icon={faYoutube} className="mr-2"/>}
                      {item.influencer.instagram && <FontAwesomeIcon icon={faInstagram} className="mr-2"/>}
                    </div>
                    {item.influencer.influencerGenres.map((genre) =>
                      <span className="badge badge-pill badge-light mr-2" key={genre.id}>{genre.genre.title}</span>
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    <button className="btn btn-warning">Add</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PaperCard>
  );
}

Tastemaker.propTypes = {
  getTasteMakersAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tasteMakers: makeSelectTastemaker(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasteMakersAction: () => dispatch(getTasteMakersRequest())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Tastemaker);
