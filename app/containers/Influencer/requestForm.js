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
import { Controller, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import ButtonLoader from "../../components/ButtonLoader";
import PaperCard from "../../components/PaperCard";
import {
  getSocialChannelsRequest,
  getGenres,
  becomeAnInfluencer,
  getInfluencerProfile
} from "./actions";
import saga from "./saga";
import reducer from "./reducer";
import {
  makeSelectGenres,
  makeSelectSocialChannels,
  makeSelectFormLoader,
  makeSelectProfile,
  makeSelectLoader
} from "./selectors";
import Select from "react-select";
import { makeSelectUserDetails } from "../App/selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';

function RequestForm(
  {
    genres,
    socialChannels,
    getGenreList,
    getSocialChannelList,
    formLoader,
    submitInfluencer,
    userDetails,
    profile,
    getMyProfile,
    loading
  }) {
  useInjectReducer({ key: 'influencer', reducer });
  useInjectSaga({ key: 'influencer', saga });

  const [showFacebook, setShowFacebook] = useState(false);
  const [showTwitter, setShowTwitter] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const [showRadio, setShowRadio] = useState(false);
  const [showTiktok, setShowTiktok] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Entity name is required'),
    description: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Your description is required'),
    helpArtistDescription: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('How can you help artists is required'),
    genres: Yup.array(Yup.object({ value: Yup.string() })).required('Genres are required'),
  });

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    }),
    menu: provided => ({ ...provided, zIndex: 9999 })
  }

  const {
    register,
    handleSubmit,
    errors,
    control,
    getValues
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    getGenreList();
    getSocialChannelList();
    if (userDetails.influencerId) {
      getMyProfile();
    }
  }, []);

  useEffect(() => {
    register('genres', { minLength: 1, min: 1, required: 'Field is required', validate: (value) => value !== undefined })
  }, [register]);

  const onSubmit = data => {
    const submitData = prepareDataForSubmit(data)
    console.log(submitData, data);
    // submitInfluencer(submitData)
  };

  const prepareDataForSubmit = data => {
    const filteredGenres = data.genres.map(genre => genre.id);
    const submitData = {
      name: data.name,
      description: data.description,
      helpArtistDescription: data.helpArtistDescription,
      genres: filteredGenres
    }
    submitData.services = [];

    if (data.hasOwnProperty('facebook')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'facebook').id,
        followers: data.facebook.followers,
        price: data.facebook.price,
        link: data.facebook.link
      })
    }

    if (data.hasOwnProperty('twitter')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'twitter').id,
        followers: data.twitter.followers,
        price: data.twitter.price,
        link: data.twitter.link
      })
    }

    if (data.hasOwnProperty('youtube')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'youtube').id,
        followers: data.youtube.followers,
        price: data.youtube.price,
        link: data.youtube.link
      })
    }

    if (data.hasOwnProperty('blog')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'blog').id,
        followers: data.blog.followers,
        price: data.blog.price,
        link: data.blog.link
      })
    }

    if (data.hasOwnProperty('instagram')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'instagram').id,
        followers: data.instagram.followers,
        price: data.instagram.price,
        link: data.instagram.link
      })
    }
    if (data.hasOwnProperty('radio')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'radio').id,
        followers: data.radio.followers,
        price: data.radio.price,
        link: data.radio.link
      })
    }
    if (data.hasOwnProperty('tiktok')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'tiktok').id,
        followers: data.tiktok.followers,
        price: data.tiktok.price,
        link: data.tiktok.link
      })
    }

    return submitData
  }

  const socialChannelChange = event => {
    switch (event.target.value) {
      case 'facebook':
        setShowFacebook(!showFacebook);
        break;
      case 'twitter':
        setShowTwitter(!showTwitter);
        break;
      case 'instagram':
        setShowInstagram(!showInstagram);
        break;
      case 'youtube':
        setShowYoutube(!showYoutube);
        break;
      case 'blog':
        setShowBlog(!showBlog);
        break;
      case 'radio':
        setShowRadio(!showRadio);
        break;
      case 'tiktok':
        setShowTiktok(!showTiktok);
        break;
    }
  }

  const { fields, append, remove, } = useFieldArray({
    control,
    name: "services",
  });

  return (
    <PaperCard title="Request To Become An Influencer">
      {loading && <LoadingIndicator />}
      {profile && profile.influencerStatusId === 3 ?
        <div className="m-3">
          <div>
            <h2>Almost there! </h2>
          </div>
          <div>
            Your application is currently being reviewed by our team. Reviewing applications usually takes us from 1 to
            5 days and you'll be updated by email if your influencer profile gets activated. Don't forget to fill in
            your profile entirely to help us review your application faster.
          </div>
        </div> :
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
                />Genres
              </div>
              <Controller
                name="genres"
                styles={customStyles}
                control={control}
                isMulti
                isClearable
                getOptionLabel={(option) => option.title}
                getOptionValue={(option) => option.id}
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
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
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
                className={`form-control ${errors.helpArtistDescription ? 'is-invalid' : ''}`}
                ref={register({ required: 'Description is required' })}
              />
              <div className="invalid-feedback" style={{ display: 'block' }}>
                {errors.helpArtistDescription && errors.helpArtistDescription.message}
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
          {fields && fields.map((field, index) => {
            return (
              <div>
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
                    color={PLAY_ICON_BG_COLOR}
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
                      name={`services[${index}].link`}
                      placeholder="Enter url"
                      className={`form-control ${errors.facebook && errors.facebook.link ? 'is-invalid' : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    />
                    <div className="invalid-feedback">
                      {errors.facebook && errors.facebook.link && errors.facebook.link.message}
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
                      className={`form-control ${errors.facebook && errors.facebook.price ? 'is-invalid' : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    /><div className="invalid-feedback">
                      {errors.facebook && errors.facebook.price && errors.facebook.price.message}
                    </div>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridGenre">
                    <label htmlFor="releaseDate">Followers Count</label>
                    <input
                      type="number"
                      name={`services[${index}].followers`}
                      placeholder="Enter count"
                      className={`form-control ${errors.facebook && errors.facebook.followers ? 'is-invalid' : ''
                        }`}
                      ref={register({ required: 'Field is required' })}
                    /><div className="invalid-feedback">
                      {errors.facebook && errors.facebook.followers && errors.facebook.followers.message}
                    </div>
                  </Form.Group>
                </Form.Row>
              </div>)
          })}
          {/* {showFacebook && <div className="facebook-section">
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
                color={PLAY_ICON_BG_COLOR}
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
                  className={`form-control ${errors.facebook && errors.facebook.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.facebook && errors.facebook.link && errors.facebook.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  type="number"
                  name="facebook.price"
                  placeholder="Enter amt."
                  inputMode="numeric"
                  className={`form-control ${errors.facebook && errors.facebook.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                /><div className="invalid-feedback">
                  {errors.facebook && errors.facebook.price && errors.facebook.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="facebook.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.facebook && errors.facebook.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                /><div className="invalid-feedback">
                  {errors.facebook && errors.facebook.followers && errors.facebook.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showTwitter && <div className="twitter-section">
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
                icon={faTwitter}
                color={PLAY_ICON_BG_COLOR}
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
                  className={`form-control ${errors.twitter && errors.twitter.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.twitter && errors.twitter.link && errors.twitter.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  type="number"
                  name="twitter.price"
                  placeholder="Enter amt."
                  className={`form-control ${errors.twitter && errors.twitter.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.twitter && errors.twitter.price && errors.twitter.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="twitter.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.twitter && errors.twitter.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.twitter && errors.twitter.followers && errors.twitter.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showInstagram && <div className="instagram-section">
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
                color={PLAY_ICON_BG_COLOR}
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
                  className={`form-control ${errors.instagram && errors.instagram.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.instagram && errors.instagram.link && errors.instagram.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  type="number"
                  name="instagram.price"
                  placeholder="Enter amt."
                  className={`form-control ${errors.instagram && errors.instagram.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.instagram && errors.instagram.price && errors.instagram.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="instagram.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.instagram && errors.instagram.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.instagram && errors.instagram.followers && errors.instagram.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showYoutube && <div className="youtube-section">
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
                color={PLAY_ICON_BG_COLOR}
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
                  className={`form-control ${errors.youtube && errors.youtube.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.youtube && errors.youtube.link && errors.youtube.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="youtube.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.youtube && errors.youtube.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.youtube && errors.youtube.price && errors.youtube.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="youtube.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.youtube && errors.youtube.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.youtube && errors.youtube.followers && errors.youtube.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showBlog && <div className="blog-section">
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
                color={PLAY_ICON_BG_COLOR}
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
                  className={`form-control ${errors.blog && errors.blog.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.blog && errors.blog.link && errors.blog.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="blog.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.blog && errors.blog.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.blog && errors.blog.price && errors.blog.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="blog.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.blog && errors.blog.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.blog && errors.blog.followers && errors.blog.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showRadio && <div className="blog-section">
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
                color={PLAY_ICON_BG_COLOR}
                icon={faBlog}
                style={{ marginRight: 5 }}
              />
              <div style={{ fontSize: 18 }}>Radio</div>
            </div>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="email">Link</label>
                <input
                  style={{ width: '50%' }}
                  name="radio.link"
                  placeholder="Enter url"
                  className={`form-control ${errors.radio && errors.radio.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.radio && errors.radio.link && errors.radio.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="radio.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.radio && errors.radio.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.radio && errors.radio.price && errors.radio.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="radio.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.radio && errors.radio.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.radio && errors.radio.followers && errors.radio.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>}
          {showTiktok && <div className="blog-section">
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
                color={PLAY_ICON_BG_COLOR}
                icon={faBlog}
                style={{ marginRight: 5 }}
              />
              <div style={{ fontSize: 18 }}>Tiktok</div>
            </div>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="email">Link</label>
                <input
                  style={{ width: '50%' }}
                  name="tiktok.link"
                  placeholder="Enter url"
                  className={`form-control ${errors.tiktok && errors.tiktok.link ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.tiktok && errors.tiktok.link && errors.tiktok.link.message}
                </div>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="tiktok.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.tiktok && errors.tiktok.price ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.tiktok && errors.tiktok.price && errors.tiktok.price.message}
                </div>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="tiktok.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.tiktok && errors.tiktok.followers ? 'is-invalid' : ''
                    }`}
                  ref={register({ required: 'Field is required' })}
                />
                <div className="invalid-feedback">
                  {errors.tiktok && errors.tiktok.followers && errors.tiktok.followers.message}
                </div>
              </Form.Group>
            </Form.Row>
          </div>} */}

          {formLoader ? (
            <ButtonLoader />
          ) : (
            <button className="btn btn-primary btn-block" type="submit">
              Submit
            </button>
          )}
        </form>
      }
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
  loading: makeSelectLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
    submitInfluencer: data => dispatch(becomeAnInfluencer(data)),
    getMyProfile: () => dispatch(getInfluencerProfile())
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
