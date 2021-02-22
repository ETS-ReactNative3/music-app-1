/**
 *
 * Artist
 *
 */

import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import makeSelectArtist from './selectors';
import reducer from './reducer';
import saga from './saga';
import Background from '../../images/banner-bg.jpg'
import './index.scss'

export function Artist() {
  useInjectReducer({key: 'artist', reducer});
  useInjectSaga({key: 'artist', saga});

  return (
    <div>
      <section className="banner" style={{backgroundImage: `url(${Background})`}}>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12">
              <h1 className="display-4">Artist Name</h1>
              <hr className="my-4"/>
              <a className="btn btn-primary btn-lg" href="#" role="button">Follow</a>
            </div>
          </div>
        </div>
      </section>
      <section className="artist-data">

      </section>
    </div>
  );
}

Artist.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  artist: makeSelectArtist(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Artist);
