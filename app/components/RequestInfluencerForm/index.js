import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {
  faBlog,
  faBriefcase,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import { Multiselect } from 'multiselect-react-dropdown';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import { getGenres } from '../../containers/Album/actions';
import reducer from '../../containers/Album/reducer';
import saga from '../../containers/Album/saga';
import {
  makeSelectFormLoader,
  makeSelectGenres,
} from '../../containers/Album/selectors';
import { makeSelectLoader } from '../../containers/App/selectors';
import {
  requestInfluencer,
  updateInfluencer,
} from '../../containers/Plan/actions';
import planSaga from '../../containers/Plan/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import ButtonLoader from '../ButtonLoader';

function RequestInfluencerForm({
  genres,
  getGenreList,
  formLoader,
  submitInfluencer,
  location,
  updateInfluencerForm,
}) {
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });
  useInjectSaga({ key: 'plan', saga: planSaga });
  const [selectedGeners, setSelectedGeners] = React.useState([]);
  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Required'),
    facebook: Yup.object({
      link: Yup.string()
        .url('Invalid Url address')
        .nullable(),
      price: Yup.number('Invalid Amount')
        .nullable()
        .transform(value => (isNaN(value) ? undefined : value)),
      followers: Yup.number('Invalid Count')
        .nullable()
        .transform(value => (isNaN(value) ? undefined : value)),
    }).nullable(),
    twitter: Yup.object({
      link: Yup.string().url('Invalid Url address'),
      price: Yup.number('Invalid Amount').transform(value =>
        isNaN(value) ? undefined : value,
      ),
      followers: Yup.number('Invalid Count').transform(value =>
        isNaN(value) ? undefined : value,
      ),
    }).nullable(),
    instagram: Yup.object({
      link: Yup.string().url('Invalid Url address'),
      price: Yup.number('Invalid Amount').transform(value =>
        isNaN(value) ? undefined : value,
      ),
      followers: Yup.number('Invalid Count').transform(value =>
        isNaN(value) ? undefined : value,
      ),
    }).nullable(),
    blog: Yup.object({
      link: Yup.string().url('Invalid Url address'),
      price: Yup.number('Invalid Amount').transform(value =>
        isNaN(value) ? undefined : value,
      ),
      followers: Yup.number('Invalid Count').transform(value =>
        isNaN(value) ? undefined : value,
      ),
    }).nullable(),
    youtube: Yup.object({
      link: Yup.string().url('Invalid Url address'),
      price: Yup.number('Invalid Amount').transform(value =>
        isNaN(value) ? undefined : value,
      ),
      followers: Yup.number('Invalid Count').transform(value =>
        isNaN(value) ? undefined : value,
      ),
    }).nullable(),

    genres: Yup.array()
      .min(1)
      .required('Required'),
  });

  const {
    register,
    handleSubmit,
    errors,
    reset,
    control,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    const tempGenre = data.genres.map(gener => gener.id || gener);
    data = { ...data, genres: tempGenre };
    if (location.fromEdit) {
      updateInfluencerForm(data);
    } else {
      submitInfluencer(data);
    }
  };

  useEffect(() => {
    getGenreList();
  }, []);

  React.useEffect(() => {
    register('genres');
    const data = location.param;
    let tempGenre = [];
    if (data && data.influencerGenres) {
      tempGenre = data.influencerGenres.map(gener => gener.genreId);
      const tempFullGenre = [];
      data.influencerGenres.map(generToSearch => {
        const index = genres.findIndex(
          genre => genre.id === generToSearch.genreId,
        );
        if (index !== -1) tempFullGenre.push(genres[index]);
      });
      setSelectedGeners(tempFullGenre);
    }

    setValue('genres', tempGenre);
  }, [register]);

  useEffect(() => {
    if (location.param && location.param.hasOwnProperty('id')) {
      let data = location.param;
      let tempGenre = [];
      if (data.influencerGenres) {
        tempGenre = data.influencerGenres.map(gener => gener.genreId);
      }
      data = { ...data, genres: tempGenre };

      setValue('genres', tempGenre);
      reset(data);
    }
  }, [location.param]);

  return (
    <>
      <div className="container-fluid" style={{ marginTop: '100px' }}>
        <div className="row album-detail">
          <div className="col pt-3 pt-md-0">
            <div className="row">
              <div className="col">
                <h1>Request to be an influencer</h1>
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <label htmlFor="description">
                <FontAwesomeIcon
                  size="1x"
                  color="white"
                  icon={faBriefcase}
                  style={{ marginRight: 5 }}
                />
                Service Information
              </label>
              <input
                style={{ width: '50%' }}
                name="description"
                placeholder="Tell us about yourself"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.description && errors.description.message}
              </div>
            </Form.Group>
          </Form.Row>
          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faFacebook}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Facebook</div>
          </div>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="email">Link</label>
              <input
                style={{ width: '50%' }}
                name="facebook.link"
                placeholder="Enter url"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />

              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.facebook &&
                  errors.facebook.link &&
                  errors.facebook.link.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Price</label>
              <input
                name="facebook.price"
                placeholder="Enter amt."
                inputMode="numeric"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.facebook &&
                  errors.facebook.price &&
                  errors.facebook.price.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Followers Count</label>
              <input
                name="facebook.followers"
                placeholder="Enter count"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.facebook &&
                  errors.facebook.followers &&
                  errors.facebook.followers.message}
              </div>
            </Form.Group>
          </Form.Row>

          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faTwitter}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Twitter</div>
          </div>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="email">Link</label>
              <input
                style={{ width: '50%' }}
                name="twitter.link"
                placeholder="Enter url"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />

              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.twitter &&
                  errors.twitter.link &&
                  errors.twitter.link.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Price</label>
              <input
                name="twitter.price"
                placeholder="Enter amt."
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.twitter &&
                  errors.twitter.price &&
                  errors.twitter.price.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Followers Count</label>
              <input
                name="twitter.followers"
                placeholder="Enter count"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.twitter &&
                  errors.twitter.followers &&
                  errors.twitter.followers.message}
              </div>
            </Form.Group>
          </Form.Row>

          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faInstagram}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Instagram</div>
          </div>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="email">Link</label>
              <input
                style={{ width: '50%' }}
                name="instagram.link"
                placeholder="Enter url"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />

              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.instagram &&
                  errors.instagram.link &&
                  errors.instagram.link.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Price</label>
              <input
                name="instagram.price"
                placeholder="Enter amt."
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.instagram &&
                  errors.instagram.price &&
                  errors.instagram.price.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Followers Count</label>
              <input
                name="instagram.followers"
                placeholder="Enter count"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.instagram &&
                  errors.instagram.followers &&
                  errors.instagram.followers.message}
              </div>
            </Form.Group>
          </Form.Row>

          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faYoutube}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Youtube</div>
          </div>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="email">Link</label>
              <input
                style={{ width: '50%' }}
                name="youtube.link"
                placeholder="Enter url"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />

              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.youtube &&
                  errors.youtube.link &&
                  errors.youtube.link.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Price</label>
              <input
                name="youtube.price"
                placeholder="Enter amt."
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.youtube &&
                  errors.youtube.price &&
                  errors.youtube.price.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Followers Count</label>
              <input
                name="youtube.followers"
                placeholder="Enter count"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.youtube &&
                  errors.youtube.followers &&
                  errors.youtube.followers.message}
              </div>
            </Form.Group>
          </Form.Row>

          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faBlog}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Blog</div>
          </div>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="email">Link</label>
              <input
                style={{ width: '50%' }}
                name="blog.link"
                placeholder="Enter url"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />

              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.blog && errors.blog.link && errors.blog.link.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Price</label>
              <input
                name="blog.price"
                placeholder="Enter amt."
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.blog && errors.blog.price && errors.blog.price.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridGenre">
              <label htmlFor="releaseDate">Followers Count</label>
              <input
                name="blog.followers"
                placeholder="Enter count"
                className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                ref={register}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.blog &&
                  errors.blog.followers &&
                  errors.blog.followers.message}
              </div>
            </Form.Group>
          </Form.Row>

          <div
            style={{
              marginTop: 5,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 0,
              borderColor: 'green',
              borderStyle: 'solid',
              borderTopWidth: 1,
              paddingTop: 5,
            }}
          >
            <FontAwesomeIcon
              size="1x"
              color="white"
              icon={faMusic}
              style={{ marginRight: 5 }}
            />
            <div style={{ fontSize: 18 }}>Geners</div>
          </div>
          <Form.Group>
            <Multiselect
              ref={register}
              displayValue="title"
              style={{
                chips: { background: 'green' },
                optionContainer: {
                  color: 'black',
                },
                searchBox: {
                  color: 'white',
                },
                inputField: {
                  // To change input field position or margin
                  color: 'white',
                },
              }}
              options={genres} // Options to display in the dropdown
              selectedValues={selectedGeners}
              onSelect={(selectedList, selectedItem) => {
                setSelectedGeners([...selectedGeners, selectedItem]);
                setValue('genres', [...selectedGeners, selectedItem], {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
            <div className="invalid-feedback" style={{ display: 'block' }}>
              {errors.genres && errors.genres.message}
            </div>
          </Form.Group>
          <Form.Row />
          {formLoader ? (
            <ButtonLoader />
          ) : (
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}

RequestInfluencerForm.prototype = {
  genres: PropTypes.array,
  getGenreList: PropTypes.func,
  formLoader: PropTypes.any,
  submitInfluencer: PropTypes.func,
  location: PropTypes.any,
  updateInfluencerForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  formLoader: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    submitInfluencer: data => dispatch(requestInfluencer(data)),
    updateInfluencerForm: data => dispatch(updateInfluencer(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(RequestInfluencerForm);
