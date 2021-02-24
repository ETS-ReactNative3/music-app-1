import React, { memo, useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCheck, faPlay } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { faClipboard } from '@fortawesome/free-regular-svg-icons';
import { toast } from 'react-toastify';
import { CampaignStatus } from './constants';
import { SOCIAL_CHANNELS } from '../App/constants';
import defaultImage from '../../images/default-image.png';
import { styles } from './index.styles';
import { renderSocialMediaIcons } from '../../utils';

const RequestPopup = (
  {
    handleClose,
    data,
    updateCampaignStatus,
    submitFeedbackRequest,
    submitSocialLinksRequest,
    socialChannels,
    playSong,
  }) => {
  const [feedbackOption, setFeedbackOption] = React.useState((data.campaignStatusId === CampaignStatus.DECLINED || data.campaignStatusId === CampaignStatus.APPROVED || data.campaignStatusId === CampaignStatus.COMPLETED || data.campaignStatusId === CampaignStatus["IN-PROGRESS"]) ? 1 : -1);
  const [feedbackProvided, setFeedbackProvided] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [songPlayed, setSongPlayed] = useState(false);

  const validationSchema = Yup.object().shape({
    // facebook: (() => {
    //   let validation = Yup.string();
    //   if (
    //     data.campaignInfluencerServices.findIndex(
    //       service => service.socialChannelsId === SOCIAL_CHANNELS.FACEBOOK,
    //     ) !== -1
    //   ) {
    //     validation = validation.required('this field is required');
    //     validation = validation.url('Enter correct url');
    //   }
    //   return validation;
    // })(),
    // twitter: (() => {
    //   let validation = Yup.string();
    //   if (
    //     data.campaignInfluencerServices.findIndex(
    //       service => service.socialChannelsId === SOCIAL_CHANNELS.TWITTER,
    //     ) !== -1
    //   ) {
    //     validation = validation.required('this field is required');
    //     validation = validation.url('Enter correct url');
    //   }
    //   return validation;
    // })(),
    // instagram: (() => {
    //   let validation = Yup.string();
    //   if (
    //     data.campaignInfluencerServices.findIndex(
    //       service => service.socialChannelsId === SOCIAL_CHANNELS.INSTAGRAM,
    //     ) !== -1
    //   ) {
    //     validation = validation.required('this field is required');
    //     validation = validation.url('Enter correct url');
    //   }
    //   return validation;
    // })(),
    // blog: (() => {
    //   let validation = Yup.string();
    //   if (
    //     data.campaignInfluencerServices.findIndex(
    //       service => service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
    //     ) !== -1
    //   ) {
    //     validation = validation.required('this field is required');
    //     validation = validation.url('Enter correct url');
    //   }
    //   return validation;
    // })(),
    // youtube: (() => {
    //   let validation = Yup.string();
    //   if (
    //     data.campaignInfluencerServices.findIndex(
    //       service => service.socialChannelsId === SOCIAL_CHANNELS.YOUTUBE,
    //     ) !== -1
    //   ) {
    //     validation = validation.required('this field is required');
    //     validation = validation.url('Enter correct url');
    //   }
    //   return validation;
    // })(),
  });

  const { register, handleSubmit, errors } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  const isReviewFromArtist = (data.ratings && data.ratings.length > 0) || (data.reviews && data.reviews.length > 0);

  const onSubmit = localData => {
    submitSocialLinksRequest(
    prepareDataForSubmit(localData));
    updateCampaignStatus(data.id, CampaignStatus.COMPLETED);
    handleClose();
  };

  const listenToSong = song => {
    playSong(song);
    setSongPlayed(true);
    // if (data.campaignStatusId === CampaignStatus.ACCEPTED || data.campaignStatusId === CampaignStatus.PEDNING) updateCampaignStatus(data.id, CampaignStatus['IN-PROGRESS']);
  };

  const prepareDataForSubmit = formData => {
    const submitData = {};
    submitData.links = [];

    if (formData.data) {
      Object.keys(formData.data).map(key => {
        submitData.links.push({
              socialChannelsId: socialChannels.find(x => x.title === key).id,
              campaignInfluencersId: data.id,
              response: formData.data[key],
            });
      })
    }
    

    return submitData;
  };
  const showSocialMediaSection = (
    data.campaignStatusId === CampaignStatus.COMPLETED ||
    data.campaignStatusId === CampaignStatus.APPROVED || data.campaignStatusId === CampaignStatus.DECLINED)
    ? data.campaignInfluencerServices && data.campaignInfluencerServices.length > 0 && data.campaignInfluencerServices[0].response !== undefined && data.campaignInfluencerServices[0].response !== '' && data.campaignInfluencerServices[0].response !== null ? true : false : true;


  return (
    <>
      <Container fluid>
        {data.campaigns.song && (
          <Row className="mt-5 justify-content-between align-items-center">
            <Col md={6} xl={7}>
              <div className="d-flex mb-4 align-items-center">
                <Image
                  width={100}
                  height={100}
                  src={(data.campaigns.song.albumSongs.length > 0 && data.campaigns.song.albumSongs[0].album.artwork) || ''}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  alt=""
                  roundedCircle
                />
                <div className="ml-3">
                  {data.campaigns.song.title}
                  <small className="text-muted d-block">
                    {data.campaigns.song.description}
                  </small>
                  <small className="text-muted d-block">
                    {moment(data.campaigns.song.releaseDate).format(
                      'DD MMMM YYYY',
                    )}
                  </small>
                </div>
              </div>
            </Col>
            <Col md={4} xl={3} className="text-center">
              <FontAwesomeIcon
                size="5x"
                className="text-success cursor-pointer"
                icon={faPlay}
                onClick={() => listenToSong(data.campaigns.song)}
              />
              <small className="text-muted d-block">
                Please play the song to provide feedback
              </small>
            </Col>
          </Row>
        )}
        {!(
          data.campaignStatusId === CampaignStatus.COMPLETED ||
          data.campaignStatusId === CampaignStatus.APPROVED || data.campaignStatusId === CampaignStatus.DECLINED
        ) ? <>
            <hr className="blick-border" />
            <Row className="my-4">
              <Col>
                <fieldset disabled={!songPlayed}>

                  <div>Action:</div>
                  <tr style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <input type="radio" name="site_name"
                      value={1}
                      checked={feedbackOption === 1}
                      disabled={!songPlayed}
                      onChange={() => {
                        if (!songPlayed) return true;
                        setFeedbackOption(1)
                      }} />
                    <div style={{ marginLeft: 10 }} onClick={() => {
                      if (!songPlayed) return true;
                      setFeedbackOption(1)
                    }}>Want to share to social media and provide feedback as well
                  </div>
                  </tr>
                  <tr style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <input type="radio" name="address"
                      value={2}
                      disabled={!songPlayed}
                      checked={feedbackOption === 2}
                      onChange={() => {
                        if (!songPlayed) return true;
                        setFeedbackOption(2)
                      }} />
                    <div style={{ marginLeft: 10 }} onClick={() => {
                      if (!songPlayed) return true;
                      setFeedbackOption(2)
                    }}>Want to provide feedback only
                  </div>
                  </tr>
                </fieldset>
              </Col>
            </Row></> : <></>}
        <hr className="blick-border" />
        {(feedbackOption === 1 || feedbackOption === 2) && <Row className="my-4">
          <Col>
            <fieldset disabled={!songPlayed}>
              {(!(feedbackProvided || data.feedback !== null) && (
                <>
                  <FormLabel htmlFor="feedbackTextArea">Feedback</FormLabel>
                  <FormControl
                    id="feedbackTextArea"
                    className="bg-transparent text-white"
                    as="textarea"
                    aria-label="With textarea"
                    onChange={value => setFeedback(value.target.value)}
                  />
                  <small className="text-muted d-block">
                    Provide feedback to share and complete
                  </small>
                  <Button
                    className="mt-4"
                    variant="warning"
                    onClick={() => {
                      if (feedback !== '') {
                        setFeedbackProvided(true);
                        submitFeedbackRequest(
                          data.campaigns.id,
                          data.influencerId,
                          feedback,
                        );

                        if (feedbackOption === 2) {
                          updateCampaignStatus(data.id, CampaignStatus.DECLINED);
                          handleClose();
                        } else if (feedbackOption === 1) {
                          if (data.campaignStatusId === CampaignStatus.ACCEPTED || data.campaignStatusId === CampaignStatus.PEDNING) updateCampaignStatus(data.id, CampaignStatus['IN-PROGRESS']);

                        }

                      } else {
                        toast.warn('Enter Feedback.');
                      }
                    }}
                  >
                    Submit
                  </Button>
                </>
              )) || (
                  <>
                    <FormLabel
                      htmlFor="feedbackTextArea"
                      className="text-success"
                    >
                      Feedback sent <FontAwesomeIcon size="1x" icon={faCheck} />
                    </FormLabel>
                    <FormControl
                      id="feedbackTextArea"
                      className="bg-transparent text-white"
                      as="textarea"
                      aria-label="With textarea"
                      disabled
                      placeholder={data.feedback}
                    />
                  </>
                )}
            </fieldset>
          </Col>
        </Row>}
        {feedbackOption === 1 && <>
          <hr className="blick-border" />
          <Row className="my-4">
            <Col>
              {showSocialMediaSection &&
                <fieldset disabled={!(feedbackProvided || data.feedback !== null)}>
                  <div className="d-flex align-items-center">
                    <FormLabel className="m-0">Share with</FormLabel>
                    {data.campaignInfluencerServices.map(service =>
                      renderSocialMediaIcons(service.socialChannels.title, '2x', { marginLeft: 5 })
                    )}

                  </div>
                  <div
                    className="cursor-pointer my-4"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://open.bliiink.co.uk/album/${data.campaigns.song.albumSongs[0].album.slug}?songId=${data.campaigns.songId}`);
                      toast.success('Song url copied');
                    }}
                  >
                    Song link, Click to Copy
                  <FontAwesomeIcon
                      icon={faClipboard}
                      style={{ marginLeft: 10 }}
                      className="cursor-pointer text-success"
                      size="x"
                    />
                  </div>
                  {(!(
                    data.campaignStatusId === CampaignStatus.COMPLETED ||
                    data.campaignStatusId === CampaignStatus.APPROVED || data.campaignStatusId === CampaignStatus.DECLINED
                  ) && (
                      <div style={styles.shareLinkStyle}>
                        <FormLabel className="mt-4">Provide Links</FormLabel>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <Row>
                            {data.campaignInfluencerServices.map(
                              service =>
                                (
                                  <Col md={6}>
                                    <FormLabel><div style={{ textTransform: 'capitalize' }}>{service.socialChannels.title}</div></FormLabel>
                                    <FormControl
                                      ref={register({ required: 'Field is required', pattern:  {value :/http(s?)(:\/\/)((www.)?)(([^.]+)\.)?([a-zA-z0-9\-_]+)(.com|.net|.gov|.org|.in)(\/[^\s]*)?/, message: "Enter proper link"} })}
                                      className="bg-transparent text-white"
                                      as="input"
                                      name={'data.' + service.socialChannels.title}
                                      id="endereco"
                                      type="text"
                                      placeholder={`Enter ${service.socialChannels.title} url`}

                                    />
                                    {errors.data && errors.data[service.socialChannels.title] && errors.data[service.socialChannels.title].message && (
                                      <small className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.data && errors.data[service.socialChannels.title] && errors.data[service.socialChannels.title].message}
                                      </small>
                                    )}
                                  </Col>
                                )
                            )}
                            {/* 
                            {data.campaignInfluencerServices.findIndex(
                              service =>
                                service.socialChannelsId ===
                                SOCIAL_CHANNELS.INSTAGRAM,
                            ) !== -1 && (
                                <Col md={6}>
                                  <FormLabel>Instagram</FormLabel>
                                  <FormControl
                                    ref={register}
                                    className="bg-transparent text-white"
                                    as="input"
                                    name="instagram"
                                    id="endereco"
                                    type="text"
                                    placeholder="Enter Instagram url"
                                    required
                                  />
                                  {errors.instagram && errors.instagram.message && (
                                    <small className="invalid-feedback" style={{ display: 'block' }}>
                                      {errors.instagram && errors.instagram.message}
                                    </small>
                                  )}
                                </Col>
                              )}
                            {data.campaignInfluencerServices.findIndex(
                              service =>
                                service.socialChannelsId === SOCIAL_CHANNELS.TWITTER,
                            ) !== -1 && (
                                <Col md={6}>
                                  <FormLabel>Twitter</FormLabel>
                                  <FormControl
                                    ref={register}
                                    className="bg-transparent text-white"
                                    as="input"
                                    name="twitter"
                                    id="endereco"
                                    type="text"
                                    placeholder="Enter twitter url"
                                    required
                                  />
                                  {errors.twitter && errors.twitter.message && (
                                    <small className="invalid-feedback" style={{ display: 'block' }}>
                                      {errors.twitter && errors.twitter.message}
                                    </small>
                                  )}
                                </Col>
                              )}
                            {data.campaignInfluencerServices.findIndex(
                              service =>
                                service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
                            ) !== -1 && (
                                <Col md={6}>
                                  <FormLabel>Blog</FormLabel>
                                  <FormControl
                                    ref={register}
                                    className="bg-transparent text-white"
                                    as="input"
                                    name="blog"
                                    id="endereco"
                                    type="text"
                                    placeholder="Enter Blog url"
                                    required
                                  />
                                  {errors.blog && errors.blog.message && (
                                    <small className="invalid-feedback" style={{ display: 'block' }}>
                                      {errors.blog && errors.blog.message}
                                    </small>
                                  )}
                                </Col>
                              )}
                            {data.campaignInfluencerServices.findIndex(
                              service =>
                                service.socialChannelsId === SOCIAL_CHANNELS.YOUTUBE,
                            ) !== -1 && (
                                <Col md={6}>
                                  <FormLabel>Youtube</FormLabel>
                                  <FormControl
                                    ref={register}
                                    className="bg-transparent text-white"
                                    as="input"
                                    name="youtube"
                                    id="endereco"
                                    type="text"
                                    placeholder="Enter Youtube url"
                                    required
                                  />
                                  {errors.youtube && errors.youtube.message && (
                                    <small className="invalid-feedback" style={{ display: 'block' }}>
                                      {errors.youtube && errors.youtube.message}
                                    </small>
                                  )}
                                </Col>
                              )} */}
                          </Row>
                        </form>
                      </div>
                    )) || (
                      <div>
                        {data.campaignInfluencerServices.map(
                          service => {

                            return <div style={{ display: 'flex', flexDirection: 'row' }}>
                              &nbsp;
                              <div style={{ textTransform: 'capitalize' }}>{service.socialChannels.title}:
                                           &nbsp;
                            </div>
                              <Link
                                to={`${service.response
                                  }`}
                              >
                                {
                                  service.response
                                }
                              </Link>

                            </div>
                          }
                        )}

                      </div>
                    )}

                  {!(
                    data.campaignStatusId === CampaignStatus.COMPLETED ||
                    data.campaignStatusId === CampaignStatus.APPROVED || data.campaignStatusId === CampaignStatus.DECLINED
                  ) && (
                      <>
                        <Button
                          variant="warning"
                          className="mt-4"
                          onClick={handleSubmit(onSubmit)}
                        >
                          Submit
                    </Button>
                        <small className="text-muted d-block">
                          Please share and provide url
                    </small>
                      </>
                    )}

                  {isReviewFromArtist && <>
                    <hr className="my-4 blick-border" />
                    <h4>Feedback from artist:</h4>
                    <Row>
                      <Col>
                        {data.ratings && data.ratings.length > 0 && <StarRatings
                          rating={data.ratings[0].rating}
                          starRatedColor="yellow"
                          numberOfStars={5}
                          starDimension="15px"
                          name="rating"
                        />}
                        {data.reviews && data.reviews.length > 0 && <small className="text-muted d-block">
                          {data.reviews[0].review}
                        </small>}
                      </Col>
                    </Row>
                  </>}
                </fieldset>}
            </Col>
          </Row>
        </>}</Container>
    </>
  );
};

RequestPopup.propTypes = {
  handleClose: PropTypes.func,
  data: PropTypes.any,
  updateCampaignStatus: PropTypes.func,
  submitFeedbackRequest: PropTypes.func,
  submitSocialLinksRequest: PropTypes.func,
  socialChannels: PropTypes.array,
  playSong: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequestPopup);
