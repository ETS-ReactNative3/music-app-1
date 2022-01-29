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
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Button, Col, Form} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import Select from 'react-select';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import * as Yup from 'yup';
import ButtonLoader from '../../components/ButtonLoader';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import {makeSelectGenres} from '../Album/selectors';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import {makeSelectSocialChannels} from '../Influencer/selectors';
import {updateInfluencerDetailsAction} from './actions';
import {makeSelectInfluencerUpdateProcessing} from './selectors';

const EditInfluencerAccount = (
  {
    userDetails,
    influencerProfile,
    genres,
    socialChannels,
    updateInfluencerDetails,
    updateInfluencerProcessing,
  }) => {
  const [showFacebook, setShowFacebook] = React.useState(false);
  const [showTwitter, setShowTwitter] = React.useState(false);
  const [showInstagram, setShowInstagram] = React.useState(false);
  const [showYoutube, setShowYoutube] = React.useState(false);
  const [showBlog, setShowBlog] = React.useState(false);
  const [showRadio, setShowRadio] = React.useState(false);
  const [showTikTok, setShowTikTok] = React.useState(false);

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      color: 'black',
      backgroundColor: '#020f1f'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black',
    }),
    menu: provided => ({...provided, zIndex: 9999}),
  };

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
      case 'tiktok':
        setShowTikTok(!showTikTok);
        break;
      case 'radio':
        setShowRadio(!showRadio);
        break;
      default:
        setShowFacebook(!showFacebook);
    }
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    helpArtistDescription: Yup.string().required(
      'Artist Description is required',
    ),
  });

  const {register, handleSubmit, errors, reset, control, getValues} = useForm({
    // resolver: yupResolver(validationSchema),
    validateCriteriaMode: "all"

  });

  const onSubmit = submitData => {
    const updatedInfluencerData = prepareDataForSubmit(submitData);

    updateInfluencerDetails(updatedInfluencerData);
  };

  React.useEffect(() => {
    const tempFullGenre = [];
    influencerProfile && Object.keys(influencerProfile).length > 0 && influencerProfile.influencerGenres.map(generToSearch => {
      const index = genres.findIndex(
        genre => genre.id === generToSearch.genreId,
      );
      if (index !== -1) tempFullGenre.push(genres[index]);
      return true;
    });
    reset({
      ...userDetails,
      ...prepareData(influencerProfile),
      genres: tempFullGenre,
    });
  }, [userDetails && influencerProfile]);

  const prepareData = influencerProfileInner => {
    if (influencerProfileInner && Object.keys(influencerProfileInner).length === 0) return {};
    let dataInner = { ...influencerProfileInner, influencerName: influencerProfileInner.name };
    // delete dataInner.name;

    influencerProfileInner.influencerServices.map(service => {
      dataInner = {
        ...dataInner,
        [service.socialChannels.title]: {
          price: service.price,
          followers: service.followers,
          link: service.link,
        },
      };
      return true;
    });

    return dataInner;
  };

  const prepareDataForSubmit = formData => {
    const filteredGenres = formData.genres.map(genre => genre.id);

    const submitData = {
      description: formData.description,
      helpArtistDescription: formData.helpArtistDescription,
      name: formData.influencerName,
      genres: filteredGenres,
    };
    submitData.services = [];

    if (Object.prototype.hasOwnProperty.call(formData, 'facebook')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'facebook').id,
        followers: formData.facebook.followers,
        price: formData.facebook.price,
        link: formData.facebook.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'twitter')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'twitter').id,
        followers: formData.twitter.followers,
        price: formData.twitter.price,
        link: formData.twitter.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'youtube')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'youtube').id,
        followers: formData.youtube.followers,
        price: formData.youtube.price,
        link: formData.youtube.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'blog')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'blog').id,
        followers: formData.blog.followers,
        price: formData.blog.price,
        link: formData.blog.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'instagram')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'instagram').id,
        followers: formData.instagram.followers,
        price: formData.instagram.price,
        link: formData.instagram.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'radio')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'radio').id,
        followers: formData.radio.followers,
        price: formData.radio.price,
        link: formData.radio.link,
      });
    }

    if (Object.prototype.hasOwnProperty.call(formData, 'tiktok')) {
      submitData.services.push({
        socialChannelsId: socialChannels.find(x => x.title === 'tiktok').id,
        followers: formData.tiktok.followers,
        price: formData.tiktok.price,
        link: formData.tiktok.link,
      });
    }

    return submitData;
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card bg-dark">
          <form onSubmit={handleSubmit(onSubmit)}>
            {influencerProfile && Object.keys(influencerProfile).length > 0 &&
            <div className="card-body">
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="name">Name</label>
                  <input
                    name="businessName"
                    placeholder="Name"
                    id="businessName"
                    className={`form-control ${errors.businessName ? 'is-invalid' : ''}`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.businessName && errors.businessName.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''
                    }`}
                    required
                    ref={register({required: 'Field is required'})}
                  />
                  <div className="invalid-feedback">
                    {errors.description && errors.description.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="helpArtistDescription">
                    Help Artist Description
                  </label>
                  <textarea
                    name="helpArtistDescription"
                    placeholder="Help artist description"
                    className={`form-control ${errors.helpArtistDescription ? 'is-invalid' : ''
                    }`}
                    ref={register({required: 'Field is required'})}
                  />
                  <div className="invalid-feedback">
                    {errors.helpArtistDescription &&
                    errors.helpArtistDescription.message}
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridTitle">
                  <div>
                    <FontAwesomeIcon
                      size="1x"
                      color={PLAY_ICON_BG_COLOR}
                      icon={faMusic}
                      style={{marginRight: 5}}
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
                  <div className="invalid-feedback" style={{display: 'block'}}>
                    {errors.genres && errors.genres.message}
                  </div>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <div>
                    <label htmlFor="helpArtistDescription">
                      <FontAwesomeIcon
                        size="1x"
                        color={PLAY_ICON_BG_COLOR}
                        icon={faBriefcase}
                        style={{marginRight: 5}}
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
                        defaultChecked={
                          influencerProfile.influencerServices.find(
                            service => service.socialChannels.id === item.id,
                          ) !== undefined
                        }
                      />
                      <label className="form-check-label" htmlFor={item.title}>
                        {item.title}
                      </label>
                    </div>
                  ))}
                </Form.Group>
              </Form.Row>
              {(showFacebook ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'facebook',
                ) !== undefined) && (
                <div className="facebook-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Facebook</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="facebook.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.facebook && errors.facebook.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
                      />
                      <div className="invalid-feedback">
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.facebook && errors.facebook.followers && errors.facebook.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showTwitter ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'twitter',
                ) !== undefined) && (
                <div className="twitter-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Twitter</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="twitter.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.twitter && errors.twitter.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.twitter && errors.twitter.followers && errors.twitter.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showInstagram ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'instagram',
                ) !== undefined) && (
                <div className="instagram-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Instagram</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="instagram.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.instagram && errors.instagram.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.instagram && errors.instagram.followers && errors.instagram.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showYoutube ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'youtube',
                ) !== undefined) && (
                <div className="youtube-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Youtube</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="youtube.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.youtube && errors.youtube.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.youtube && errors.youtube.followers && errors.youtube.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showBlog ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'blog',
                ) !== undefined) && (
                <div className="blog-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Blog</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="blog.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.blog && errors.blog.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.blog && errors.blog.followers && errors.blog.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showRadio ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'radio',
                ) !== undefined) && (
                <div className="blog-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Radio</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="radio.link"
                        placeholder="Enter url"
                        className={`form-control ${errors.radio && errors.radio.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.radio && errors.radio.followers && errors.radio.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {(showTikTok ||
                influencerProfile.influencerServices.find(
                  service => service.socialChannels.title === 'tiktok',
                ) !== undefined) && (
                <div className="blog-section">
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
                      style={{marginRight: 5}}
                    />
                    <div style={{fontSize: 18}}>Tiktok</div>
                  </div>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridGenre">
                      <label htmlFor="email">Link</label>
                      <input
                        style={{width: '50%'}}
                        name="tiktok.link"
                        placeholder="Enter url"
                        required
                        className={`form-control ${errors.tiktok && errors.tiktok.link ? 'is-invalid' : ''
                        }`}
                        ref={register({required: 'Field is required'})}
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
                        ref={register({required: 'Field is required', min: {value: 0, message: "Price should be more than 0"}})}
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
                        ref={register({required: 'Field is required', min: {value: 2000, message: "Followers should be greater than 2000"}})}
                      />
                      <div className="invalid-feedback">
                        {errors.tiktok && errors.tiktok.followers && errors.tiktok.followers.message}
                      </div>
                    </Form.Group>
                  </Form.Row>
                </div>
              )}
              {updateInfluencerProcessing ? (
                <ButtonLoader/>
              ) : (
                <Button variant="success" onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              )}
            </div>
            }
          </form>
        </div>
      </div>
    </div>
  );
};

EditInfluencerAccount.propTypes = {
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
  updateInfluencerDetails: PropTypes.func,
  updateInfluencerProcessing: PropTypes.bool,
  socialChannels: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  influencerProfile: makeSelectInfluencerDetails(),
  genres: makeSelectGenres(),
  socialChannels: makeSelectSocialChannels(),
  updateInfluencerProcessing: makeSelectInfluencerUpdateProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    updateInfluencerDetails: data =>
      dispatch(updateInfluencerDetailsAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditInfluencerAccount);
