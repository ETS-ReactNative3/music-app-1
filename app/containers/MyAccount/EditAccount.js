import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button, Col, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import { getSocialChannelsRequest } from '../Influencer/actions';
import influencerReducer from '../Influencer/reducer';
import influencerSaga from '../Influencer/saga';
import { makeSelectSocialChannels } from '../Influencer/selectors';
import { getGenres } from '../Song/actions';
import { makeSelectGenres } from '../Song/selectors';
import {
  updateInfluencerDetailsAction,
  updateUserDetailsAction,
} from './actions';
import styles from './index.styles';

import accountReducer from './reducer';
import accountSaga from './saga';

const EditAccount = ({
  userDetails,
  influencerProfile,
  genres,
  socialChannels,
  getSocialChannelList,
  updateInfluencerDetails,
  updateUserDetails,
}) => {
  const [data, setData] = React.useState({});

  const [showFacebook, setShowFacebook] = React.useState(false);
  const [showTwitter, setShowTwitter] = React.useState(false);
  const [showInstagram, setShowInstagram] = React.useState(false);
  const [showYoutube, setShowYoutube] = React.useState(false);
  const [showBlog, setShowBlog] = React.useState(false);

  useInjectReducer({ key: 'influencer', reducer: influencerReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });

  useInjectSaga({ key: 'account', saga: accountSaga });
  useInjectReducer({ key: 'account', reducer: accountReducer });
  React.useEffect(() => {
    getSocialChannelList();
  }, []);

  function handleFileChange(event) {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      const reader = new FileReader();

      //   reader.onloadstart = () => this.setState({loading: true});

      reader.onload = event => {
        setData(event.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
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
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const {
    register,
    handleSubmit,
    errors,
    setValue,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log(data);

    const updatedUserDetails = {
      ...userDetails,
      name: data.name,
      phone: data.phone,
    };
    const updatedInfluencerData = prepareDataForSubmit(data);
    updateUserDetails(updatedUserDetails);
    updateInfluencerDetails(updatedInfluencerData);
  };

  React.useEffect(() => {
    reset({ ...userDetails, ...prepareData(influencerProfile) });
    console.log({ ...userDetails, ...prepareData(influencerProfile) });
  }, [userDetails && influencerProfile]);

  const prepareData = influencerProfile => {
    let data = { ...influencerProfile };
    delete data.name;

    influencerProfile.influencerServices.map(service => {
      data = {
        ...data,
        [service.socialChannels.title]: {
          price: service.price,
          followers: service.followers,
          link: service.link,
        },
      };
    });

    return data;
  };

  const prepareDataForSubmit = formData => {
    const submitData = {
      description: formData.description,
      helpArtistDescription: formData.helpArtistDescription,
    };
    submitData.links = [];

    if (formData.hasOwnProperty('facebook')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'facebook').id,
        response: formData.facebook,
      });
    }

    if (formData.hasOwnProperty('twitter')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'twitter').id,
        response: formData.twitter,
      });
    }

    if (formData.hasOwnProperty('youtube')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'youtube').id,
        response: formData.youtube,
      });
    }

    if (formData.hasOwnProperty('blog')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'blog').id,
        response: formData.blog,
      });
    }

    if (formData.hasOwnProperty('instagram')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'instagram').id,
        response: formData.instagram,
      });
    }

    return submitData;
  };

  return (
    <div>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Edit Account</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={styles.mainContainer}>
        <div style={styles.imageContainer}>
          <Image
            width={120}
            height={120}
            src={Object.keys(data).length === 0 ? userDetails.avatar : data}
            roundedCircle
          />
          <label
            style={{ cursor: 'pointer' }}
            htmlFor="fileImage"
            variant="link"
            onClick={handleFileChange}
          >
            Change photo
          </label>
          <input
            style={{
              position: 'absolute',
              opacity: 0,
              zIndex: -1,
            }}
            id="fileImage"
            accept="image/*"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              placeholder="Name"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.name && errors.name.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              //   type="number"
              placeholder="Phone"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.phone && errors.phone.message}
            </div>
          </Form.Group>
        </Form.Row>
        {/* <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="genderId">Gender</label>
            <div>
              <input
                type="radio"
                id="male"
                name="genderId"
                value={1}
                ref={register}
              />
              <label htmlFor="male">Male</label>
              <br />
              <input
                type="radio"
                id="female"
                name="genderId"
                value={2}
                ref={register}
              />
              <label htmlFor="female">Female</label>
              <br />
            </div>
            <div className="invalid-feedback">
              {errors.genderId && errors.genderId.message}
            </div>
          </Form.Group>
        </Form.Row> */}
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              placeholder="Description"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
              ref={register}
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
              className={`form-control ${
                errors.helpArtistDescription ? 'is-invalid' : ''
              }`}
              ref={register}
            />
            <div className="invalid-feedback">
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
                  defaultChecked={
                    influencerProfile.influencerServices.find(
                      service => service.id === item.id,
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
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="facebook.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
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
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  type="number"
                  name="twitter.price"
                  placeholder="Enter amt."
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="twitter.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
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
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  type="number"
                  name="instagram.price"
                  placeholder="Enter amt."
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  type="number"
                  name="instagram.followers"
                  placeholder="Enter count"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
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
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="youtube.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="youtube.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
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
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Price</label>
                <input
                  name="blog.price"
                  type="number"
                  placeholder="Enter amt."
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridGenre">
                <label htmlFor="releaseDate">Followers Count</label>
                <input
                  name="blog.followers"
                  type="number"
                  placeholder="Enter count"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
              </Form.Group>
            </Form.Row>
          </div>
        )}
      </div>
      <Button variant="success" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </div>
  );
};

EditAccount.propTypes = {
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
  updateUserDetails: PropTypes.func,
  updateInfluencerDetails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  influencerProfile: makeSelectInfluencerDetails(),
  genres: makeSelectGenres(),
  socialChannels: makeSelectSocialChannels(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
    updateUserDetails: data => dispatch(updateUserDetailsAction(data)),
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
)(EditAccount);
