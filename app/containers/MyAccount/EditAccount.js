import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button, Card, Col, Form, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as Yup from 'yup';
import ButtonLoader from '../../components/ButtonLoader';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getGenres } from '../Album/actions';
import albumReducer from '../Album/reducer';
import albumSaga from '../Album/saga';
import { makeSelectGenres } from '../Album/selectors';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import { getSocialChannelsRequest } from '../Influencer/actions';
import influencerReducer from '../Influencer/reducer';
import influencerSaga from '../Influencer/saga';
import { updateUserDetailsAction } from './actions';
import EditInfluencerAccount from './EditInfluencerAccount';
import styles from './index.styles';
import accountReducer from './reducer';
import accountSaga from './saga';
import { makeSelectUpdateProcessing } from './selectors';

const EditAccount = ({
  userDetails,
  influencerProfile,
  genres,
  getSocialChannelList,
  updateUserDetails,
  updateProcessing,
  getGenreList,
}) => {
  useInjectReducer({ key: 'influencer', reducer: influencerReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });

  useInjectSaga({ key: 'album', saga: albumSaga });
  useInjectReducer({ key: 'album', reducer: albumReducer });
  useInjectSaga({ key: 'account1', saga: accountSaga });
  useInjectReducer({ key: 'account', reducer: accountReducer });
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    getGenreList();
    getSocialChannelList();
  }, []);

  function handleFileChange(event) {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      const reader = new FileReader();

      //   reader.onloadstart = () => this.setState({loading: true});

      reader.onload = event1 => {
        setData(event1.target.result);
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

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = submitData => {
    const updatedUserDetails = {
      ...userDetails,
      name: submitData.name,
      phone: submitData.phone,
      profilePhoto: data,
    };
    updateUserDetails(updatedUserDetails, Object.keys(data).length > 0);
  };

  React.useEffect(() => {
    const tempFullGenre = [];
    influencerProfile &&
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
    let dataInner = { ...influencerProfileInner };
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
      <Card style={{ width: '50%' }}>
        <Card.Body style={{ color: 'black' }}>
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
              style={{ cursor: 'pointer', color: 'black' }}
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
          {updateProcessing ? (
            <ButtonLoader />
          ) : (
            <Button variant="success" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          )}
        </Card.Body>
      </Card>
      {isInfluencer && (
        <div style={{ marginTop: 30 }}>
          <EditInfluencerAccount />
        </div>
      )}
    </div>
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
    updateUserDetails: (data, isProfilePhotoUpdated) =>
      dispatch(updateUserDetailsAction(data, isProfilePhotoUpdated)),
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
