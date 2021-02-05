import {yupResolver} from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {Button, Card, Col, Form, Image} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import * as Yup from 'yup';
import ButtonLoader from '../../components/ButtonLoader';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import {getGenres} from '../Album/actions';
import albumReducer from '../Album/reducer';
import albumSaga from '../Album/saga';
import {makeSelectGenres} from '../Album/selectors';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import {getSocialChannelsRequest} from '../Influencer/actions';
import influencerReducer from '../Influencer/reducer';
import influencerSaga from '../Influencer/saga';
import {updateUserDetailsAction} from './actions';
import EditInfluencerAccount from './EditInfluencerAccount';
import styles from './index.styles';
import accountReducer from './reducer';
import accountSaga from './saga';
import {makeSelectUpdateProcessing} from './selectors';
import PaperCard from "../../components/PaperCard";

const EditAccount = ({
                       userDetails,
                       influencerProfile,
                       genres,
                       getSocialChannelList,
                       updateUserDetails,
                       updateProcessing,
                       getGenreList,
                     }) => {
  useInjectReducer({key: 'influencer', reducer: influencerReducer});
  useInjectSaga({key: 'influencer', saga: influencerSaga});

  useInjectSaga({key: 'album', saga: albumSaga});
  useInjectReducer({key: 'album', reducer: albumReducer});
  useInjectSaga({key: 'account', saga: accountSaga});
  useInjectReducer({key: 'account', reducer: accountReducer});
  const [data, setData] = React.useState({});
  const [coverPhoto, setCoverPhoto] = React.useState({});

  React.useEffect(() => {
    getGenreList();
    getSocialChannelList();
  }, []);

  function handleFileChange(event) {
    const {target} = event;
    const {files} = target;

    if (files && files[0]) {
      const reader = new FileReader();

      //   reader.onloadstart = () => this.setState({loading: true});

      reader.onload = event1 => {
        setData(event1.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
  }

  function handleCoverFileChange(event) {
    const {target} = event;
    const {files} = target;

    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = event1 => {
        setCoverPhoto(event1.target.result);
      };

      reader.readAsDataURL(files[0]);
    }
  }

  const isInfluencer =
    (userDetails &&
      userDetails.roleId === 1 &&
      userDetails.influencerId !== undefined) ||
    false;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const {register, handleSubmit, errors, reset} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = submitData => {
    const updatedUserDetails = {
      ...userDetails,
      ...submitData,
      profilePhoto: data,
      coverPhotoLocal: coverPhoto
    };
    updateUserDetails(updatedUserDetails, Object.keys(data).length > 0, Object.keys(coverPhoto).length > 0);
  };

  React.useEffect(() => {
    const tempFullGenre = [];
    console.log(influencerProfile);
    influencerProfile && Object.keys(influencerProfile).length > 0 &&
    influencerProfile.influencerGenres.map(generToSearch => {
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
    let dataInner = {...influencerProfileInner};
    delete dataInner.name;

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

  return (
    <PaperCard title="Edit Account">
      <div className="row">
        <div className="col-md-8">
          <div className="card bg-dark">
            <div className="card-body">
              <div style={styles.imageContainer}>
                <Image
                  width={120}
                  height={120}
                  src={
                    Object.keys(data).length === 0
                      ? userDetails
                      ? userDetails.avatar
                      : ''
                      : data
                  }
                  roundedCircle
                />
                <label
                  style={{cursor: 'pointer', color: 'white'}}
                  htmlFor="fileImage"
                  variant="link"
                  className="cursor-pointer"
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
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="biography">Biography</label>
                  <input
                    name="biography"
                    //   type="number"
                    placeholder="Biography"
                    className={`form-control ${
                      errors.biography ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.biography && errors.biography.message}
                  </div>
                </Form.Group>
              </Form.Row>
              {userDetails.roleId === 2 && <><div style={styles.imageContainer}>
                <Image
                  width={120}
                  height={120}
                  src={
                    Object.keys(coverPhoto).length === 0
                      ? userDetails
                      ? userDetails.coverPhoto
                      : ''
                      : coverPhoto
                  }
                  roundedCircle
                />
                <label
                  style={{cursor: 'pointer', color: 'white'}}
                  htmlFor="fileImageCoverPhoto"
                  variant="link"
                  className="cursor-pointer"
                  onClick={handleCoverFileChange}
                >
                  Change Cover photo
                </label>
                <input
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    zIndex: -1,
                  }}
                  id="fileImageCoverPhoto"
                  accept="image/*"
                  type="file"
                  onChange={handleCoverFileChange}
                />
              </div>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="publicPhone">Public Phone</label>
                  <input
                    name="publicPhone"
                    //   type="number"
                    placeholder="Public Phone"
                    className={`form-control ${
                      errors.publicPhone ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.publicPhone && errors.publicPhone.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="publicEmail">Public Email</label>
                  <input
                    name="publicEmail"
                    //   type="number"
                    placeholder="Public Email"
                    className={`form-control ${
                      errors.publicEmail ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.publicEmail && errors.publicEmail.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="managementEmail">Management Email</label>
                  <input
                    name="managementEmail"
                    //   type="number"
                    placeholder="Management Email"
                    className={`form-control ${
                      errors.managementEmail ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.managementEmail && errors.managementEmail.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="bookingEmail">Booking Email</label>
                  <input
                    name="bookingEmail"
                    //   type="number"
                    placeholder="Booking Email"
                    className={`form-control ${
                      errors.bookingEmail ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.bookingEmail && errors.bookingEmail.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="recordLabelManager">Recodrd label manager</label>
                  <input
                    name="recordLabelManager"
                    //   type="number"
                    placeholder="Record Label manager"
                    className={`form-control ${
                      errors.recordLabelManager ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.recordLabelManager && errors.recordLabelManager.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridDiscription">
                  <label htmlFor="location">Location</label>
                  <input
                    name="location"
                    //   type="number"
                    placeholder="Location"
                    className={`form-control ${
                      errors.location ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.location && errors.location.message}
                  </div>
                </Form.Group>
              </Form.Row></>}
              {updateProcessing ? (
                <ButtonLoader/>
              ) : (
                <Button variant="success" onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              )}
            </div>
          </div>
          {isInfluencer && (
            <div className="mt-3">
              <EditInfluencerAccount/>
            </div>
          )}
        </div>
      </div>
    </PaperCard>
  );
};

EditAccount.propTypes = {
  getGenreList: PropTypes.func,
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
  updateUserDetails: PropTypes.func,
  updateProcessing: PropTypes.bool,
  getSocialChannelList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  influencerProfile: makeSelectInfluencerDetails(),
  genres: makeSelectGenres(),
  updateProcessing: makeSelectUpdateProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
    updateUserDetails: (data, isProfilePhotoUpdated, isCoverPhotoUpdated) =>
      dispatch(updateUserDetailsAction(data, isProfilePhotoUpdated, isCoverPhotoUpdated)),
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
