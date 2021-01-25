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
import { Col, Form, Image } from 'react-bootstrap';
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
import styles from './index.styles';

const EditAccount = ({
  userDetails,
  influencerProfile,
  genres,
  socialChannels,
  getSocialChannelList,
}) => {
  const [data, setData] = React.useState({});

  const [showFacebook, setShowFacebook] = React.useState(false);
  const [showTwitter, setShowTwitter] = React.useState(false);
  const [showInstagram, setShowInstagram] = React.useState(false);
  const [showYoutube, setShowYoutube] = React.useState(false);
  const [showBlog, setShowBlog] = React.useState(false);

  useInjectReducer({ key: 'influencer', reducer: influencerReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });

  React.useEffect(() => {
    getSocialChannelList();
  }, []);
  console.log(socialChannels);
  function handleFileChange(event) {
    console.log(event);
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
    description: Yup.string().required('Service information is required'),
    genres: Yup.array()
      .required('Genre is required')
      .nullable(),
  });

  const { register, handleSubmit, errors, setValue, clearErrors } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
              type="number"
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
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="genderId">Gender</label>
            <div>
              <input
                type="radio"
                id="male"
                name="genderId"
                value="male"
                ref={register}
              />
              <label htmlFor="male">Male</label>
              <br />
              <input
                type="radio"
                id="female"
                name="genderId"
                value="female"
                ref={register}
              />
              <label htmlFor="female">Female</label>
              <br />
            </div>
            <div className="invalid-feedback">
              {errors.genderId && errors.genderId.message}
            </div>
          </Form.Group>
        </Form.Row>
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
            <input
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
                />
                <label className="form-check-label" htmlFor={item.title}>
                  {item.title}
                </label>
              </div>
            ))}
          </Form.Group>
        </Form.Row>
        {showFacebook && (
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
        {showTwitter && (
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
        {showInstagram && (
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
        {showYoutube && (
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
        {showBlog && (
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
        )}
      </div>
    </div>
  );
};

EditAccount.propTypes = {
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
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
