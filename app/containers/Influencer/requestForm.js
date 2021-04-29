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
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import Select from 'react-select';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import ButtonLoader from '../../components/ButtonLoader';
import PaperCard from '../../components/PaperCard';
import {
  getSocialChannelsRequest,
  getGenres,
  becomeAnInfluencer,
  getInfluencerProfile,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectGenres,
  makeSelectSocialChannels,
  makeSelectFormLoader,
  makeSelectProfile,
  makeSelectLoader,
} from './selectors';
import { makeSelectUserDetails } from '../App/selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import { capatilizeText, renderSocialMediaIcons } from '../../utils';

function RequestForm({
  genres,
  socialChannels,
  getGenreList,
  getSocialChannelList,
  formLoader,
  submitInfluencer,
  userDetails,
  profile,
  getMyProfile,
  loading,
}) {
  useInjectReducer({ key: 'influencer', reducer });
  useInjectSaga({ key: 'influencer', saga });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Entity name is required'),
    description: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Your description is required'),
    helpArtistDescription: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('How can you help artists is required'),
    genres: Yup.array(Yup.object({ value: Yup.string() })).required(
      'Genres are required',
    ),

    services: Yup.array().of(Yup.object({
      link: Yup.string().required('Link is required'),
      price: Yup.number().typeError('Price should not be empty').min(0, 'Price should be greater than 0').required('Price is required'),
      followers: Yup.number().typeError('Followers should not be empty').min(2000, 'Followers should be greater than 2000').required('Followers is required')
    })).test(
      'required',
      'You must add one service',
      services => services ? services.length >= 1 : false,
    ).min(1, "Required")
  });

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      color: 'black',
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black',
    }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
  };

  const { register, handleSubmit, errors, control, getValues } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getGenreList();
    getSocialChannelList();
    if (userDetails.influencerId) {
      getMyProfile();
    }
  }, []);

  useEffect(() => {
    register('genres', {
      minLength: 1,
      min: 1,
      required: 'Field is required',
      validate: value => value !== undefined,
    });
  }, [register]);

  const onSubmit = data => {
    const submitData = prepareDataForSubmit(data);
    submitInfluencer(submitData)
  };

  const prepareDataForSubmit = data => {
    const filteredGenres = data.genres.map(genre => genre.id);
    const submitData = {
      name: data.name,
      description: data.description,
      helpArtistDescription: data.helpArtistDescription,
      genres: filteredGenres,
    };
    submitData.services = data.services.map((sevice, index) => {
      return {
        ...sevice,
        socialChannelsId: fields[index].socialChannelsId
      }
    });


    return submitData;
  };


  const { fields, remove, insert } = useFieldArray({
    control,
    name: 'services',
  });

  const socialChannelChange = event => {
    const index = fields.findIndex(field => field.socialChannelName === event.target.value)
    if (index === -1) insert(socialChannels.findIndex(socialChannel => socialChannel.title === event.target.value), { link: '', price: 0, followers: 0, socialChannelName: event.target.value, socialChannelsId: socialChannels.find(x => x.title === event.target.value).id })
    else remove(fields.findIndex(field => field.socialChannelName === event.target.value))

  };


  return (
    <PaperCard title="Request To Become An Influencer">
      {loading && <LoadingIndicator />}
      {profile && profile.influencerStatusId === 3 ? (
        <div className="m-3">
          <div>
            <h2>Almost there! </h2>
          </div>
          <div>
            Your application is currently being reviewed by our team. Reviewing
            applications usually takes us from 1 to 5 days and you'll be updated
            by email if your influencer profile gets activated. Don't forget to
            fill in your profile entirely to help us review your application
            faster.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <label htmlFor="name">
                <FontAwesomeIcon
                  size="1x"
                  color="white"
                  icon={faBriefcase}
                  style={{ marginRight: 5 }}
                />
                Entity Name
              </label>
              <input
                name="name"
                placeholder="Entity"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                ref={register({ required: 'Entity name is required' })}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.name && errors.name.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTitle">
              <div>
                <FontAwesomeIcon
                  size="1x"
                  color="white"
                  icon={faMusic}
                  style={{ marginRight: 5 }}
                />
                Genres
              </div>
              <Controller
                name="genres"
                styles={customStyles}
                control={control}
                isMulti
                isClearable
                getOptionLabel={option => option.title}
                getOptionValue={option => option.id}
                options={genres}
                as={Select}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.genres && errors.genres.message}
              </div>
            </Form.Group>
          </Form.Row>
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
              <textarea
                name="description"
                placeholder="Tell us about yourself"
                className={`form-control ${errors.description ? 'is-invalid' : ''
                  }`}
                ref={register({ required: 'Description is required' })}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.description && errors.description.message}
              </div>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridTitle">
              <label htmlFor="helpArtistDescription">
                <FontAwesomeIcon
                  size="1x"
                  color="white"
                  icon={faBriefcase}
                  style={{ marginRight: 5 }}
                />
                How I can help artists
              </label>
              <textarea
                name="helpArtistDescription"
                placeholder="How I can help artists"
                className={`form-control ${errors.helpArtistDescription ? 'is-invalid' : ''
                  }`}
                ref={register({ required: 'Description is required' })}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.helpArtistDescription &&
                  errors.helpArtistDescription.message}
              </div>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridTitle">
              <div>
                <label htmlFor="helpArtistDescription">
                  <FontAwesomeIcon
                    size="1x"
                    color="white"
                    icon={faBriefcase}
                    style={{ marginRight: 5 }}
                  />
                  Select Social Mediums
                </label>
              </div>
              {socialChannels.map(item => (
                <div className="form-check form-check-inline" key={item.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={item.title}
                    id={item.title}
                    onClick={socialChannelChange}
                  />
                  <label className="form-check-label" htmlFor={item.title}>
                    {item.title}
                  </label>
                </div>
              ))}
            </Form.Group>
          </Form.Row>
          {fields &&
            fields.map((field, index) => (
              <div key={field.id}>
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
                  {renderSocialMediaIcons(field.socialChannelName, '1x', { marginRight: 5 }, PLAY_ICON_BG_COLOR)}
                  <div style={{ fontSize: 18 }}>{capatilizeText(field.socialChannelName)}</div>
                </div>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridGenre">
                    <label htmlFor="email">Link</label>
                    <input
                      style={{ width: '50%' }}
                      name={`services[${index}].link`}
                      placeholder="Enter url"
                      className={`form-control ${errors.services && errors.services[index] && errors.services[index].link
                        ? 'is-invalid'
                        : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    />
                    <div className="invalid-feedback">
                      {errors.services && errors.services[index] && errors.services[index].link &&
                        errors.services[index].link.message}
                    </div>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridGenre">
                    <label htmlFor="releaseDate">Price</label>
                    <input
                      type="number"
                      name={`services[${index}].price`}
                      placeholder="Enter amt."
                      inputMode="numeric"
                      className={`form-control ${errors.services && errors.services[index] && errors.services[index].price
                        ? 'is-invalid'
                        : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    />
                    <div className="invalid-feedback">
                      {errors.services && errors.services[index] && errors.services[index].price &&
                        errors.services[index].price.message}
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGenre">
                    <label htmlFor="releaseDate">Followers Count</label>
                    <input
                      type="number"
                      name={`services[${index}].followers`}
                      placeholder="Enter count"
                      className={`form-control ${errors.services && errors.services[index] && errors.services[index].followers
                        ? 'is-invalid'
                        : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    />
                    <div className="invalid-feedback">
                      {errors.services && errors.services[index] && errors.services[index].followers && errors.services[index].followers.message}
                    </div>
                  </Form.Group>
                </Form.Row>
              </div>
            ))}
          <div className="invalid-feedback mb-4" style={{ display: 'block' }}>
                {(errors.services && fields.length === 0) && errors.services.message}
              </div>

          {formLoader ? (
            <ButtonLoader />
          ) : (
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          )}
        </form>
      )}
    </PaperCard>
  );
}

RequestForm.prototype = {
  genres: PropTypes.array,
  socialChannels: PropTypes.array,
  getGenreList: PropTypes.func,
  getSocialChannelList: PropTypes.func,
  formLoader: PropTypes.any,
  submitInfluencer: PropTypes.func,
  location: PropTypes.any,
  updateInfluencerForm: PropTypes.func,
  getMyProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  socialChannels: makeSelectSocialChannels(),
  formLoader: makeSelectFormLoader(),
  profile: makeSelectProfile(),
  userDetails: makeSelectUserDetails(),
  loading: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
    submitInfluencer: data => dispatch(becomeAnInfluencer(data)),
    getMyProfile: () => dispatch(getInfluencerProfile()),
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
)(RequestForm);
