import React, { memo, useState } from 'react';
import { Button, FormControl, FormLabel, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCheck } from '@fortawesome/free-solid-svg-icons';
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
import { CampaignStatus } from './constants';
import { SOCIAL_CHANNELS } from '../App/constants';
import defaultImage from '../../images/album-3.jpg';
import { styles } from './index.styles';

const RequestPopup = ({
  handleClose,
  data,
  updateCampaignStatus,
  submitFeedbackRequest,
  submitSocialLinksRequest,
  socialChannels,
  playSong,
}) => {
  const [feedbackProvided, setFeedbackProvided] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [songPlayed, setSongPlayed] = useState(false);

  const validationSchema = Yup.object().shape({
    facebook: (() => {
      let validation = Yup.string();
      if (
        data.campaignInfluencerServices.findIndex(
          service => service.socialChannelsId === SOCIAL_CHANNELS.FACEBOOK,
        ) !== -1
      ) {
        validation = validation.required('this field is required');
        validation = validation.url('Enter correct url');
      }
      return validation;
    })(),
    twitter: (() => {
      let validation = Yup.string();
      if (
        data.campaignInfluencerServices.findIndex(
          service => service.socialChannelsId === SOCIAL_CHANNELS.TWITTER,
        ) !== -1
      ) {
        validation = validation.required('this field is required');
        validation = validation.url('Enter correct url');
      }
      return validation;
    })(),
    instagram: (() => {
      let validation = Yup.string();
      if (
        data.campaignInfluencerServices.findIndex(
          service => service.socialChannelsId === SOCIAL_CHANNELS.INSTAGRAM,
        ) !== -1
      ) {
        validation = validation.required('this field is required');
        validation = validation.url('Enter correct url');
      }
      return validation;
    })(),
    blog: (() => {
      let validation = Yup.string();
      if (
        data.campaignInfluencerServices.findIndex(
          service => service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
        ) !== -1
      ) {
        validation = validation.required('this field is required');
        validation = validation.url('Enter correct url');
      }
      return validation;
    })(),
    youtube: (() => {
      let validation = Yup.string();
      if (
        data.campaignInfluencerServices.findIndex(
          service => service.socialChannelsId === SOCIAL_CHANNELS.YOUTUBE,
        ) !== -1
      ) {
        validation = validation.required('this field is required');
        validation = validation.url('Enter correct url');
      }
      return validation;
    })(),
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

  const onSubmit = localData => {
    submitSocialLinksRequest(prepareDataForSubmit(localData));
    updateCampaignStatus(data.id, CampaignStatus.COMPLETED);
    handleClose();
  };

  const listenToSong = song => {
    playSong(song);
    setSongPlayed(true);
    updateCampaignStatus(data.id, CampaignStatus['IN-PROGRESS']);
  };

  const prepareDataForSubmit = formData => {
    const submitData = {};
    submitData.links = [];

    if (formData.hasOwnProperty('facebook')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'facebook').id,
        campaignInfluencersId: data.id,
        response: formData.facebook,
      });
    }

    if (formData.hasOwnProperty('twitter')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'twitter').id,
        campaignInfluencersId: data.id,
        response: formData.twitter,
      });
    }

    if (formData.hasOwnProperty('youtube')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'youtube').id,
        campaignInfluencersId: data.id,
        response: formData.youtube,
      });
    }

    if (formData.hasOwnProperty('blog')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'blog').id,
        campaignInfluencersId: data.id,
        response: formData.blog,
      });
    }

    if (formData.hasOwnProperty('instagram')) {
      submitData.links.push({
        socialChannelsId: socialChannels.find(x => x.title === 'instagram').id,
        campaignInfluencersId: data.id,
        response: formData.instagram,
      });
    }

    return submitData;
  };

  return (
    <div style={styles.container}>
      <div>
        <h4>Song/track:</h4>
        <fieldset>
          {data.campaigns.song && (
            <div style={{ marginLeft: 10 }}>
              <div style={styles.selectedSongParent}>
                <Image
                  width={100}
                  height={100}
                  src={data.campaigns.song.artwork || ''}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div style={styles.songInfo}>
                  <div>{data.campaigns.song.title}</div>
                  <div>{data.campaigns.song.description}</div>
                  <div>
                    {moment(data.campaigns.song.releaseDate).format(
                      'DD MMMM YYYY',
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    style={{ height: 'fit-content' }}
                    variant="success"
                    onClick={() => listenToSong(data.campaigns.song)}
                  >
                    Click to play
                  </Button>
                  <div>Play Song to provide feedback</div>
                </div>
              </div>
            </div>
          )}
        </fieldset>
      </div>

      <div
        style={
          !songPlayed
            ? { ...styles.section, ...styles.blurStyle }
            : styles.section
        }
      >
        <h4>Feedback:</h4>
        <fieldset disabled={!songPlayed}>
          {(!(feedbackProvided || data.feedback !== null) && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <FormControl
                as="textarea"
                aria-label="With textarea"
                onChange={value => setFeedback(value.target.value)}
              />
              <Button
                variant="success"
                style={{ marginTop: 10 }}
                onClick={() => {
                  if (feedback !== '') {
                    setFeedbackProvided(true);
                    submitFeedbackRequest(
                      data.campaigns.id,
                      data.influencerId,
                      feedback,
                    );
                  } else {
                    alert('Enter Feedback.');
                  }
                }}
              >
                Submit
              </Button>
              <div>Provide feedback to share and complete</div>
            </div>
          )) || (
            <div style={{ color: 'green' }}>
              <FontAwesomeIcon size="1x" icon={faCheck} /> Feedback sent!!{' '}
              <br />
              <br />
              {data.feedback && (
                <div style={{ color: 'black' }}>Feedback: {data.feedback}</div>
              )}
            </div>
          )}
        </fieldset>
      </div>

      <div
        style={
          feedbackProvided || data.feedback !== null
            ? styles.section
            : { ...styles.section, ...styles.blurStyle }
        }
      >
        <h4>Share :</h4>
        <fieldset disabled={!(feedbackProvided || data.feedback !== null)}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <div style={styles.socialMediaItems}>
              Share on
              <FontAwesomeIcon
                size="1x"
                icon={faFacebook}
                style={styles.marginHorizontal}
                onClick={() => {}}
              />
              <FontAwesomeIcon
                size="1x"
                icon={faInstagram}
                style={styles.marginHorizontal}
                onClick={() => {}}
              />
              <FontAwesomeIcon
                size="1x"
                style={styles.marginHorizontal}
                icon={faYoutube}
                onClick={() => {}}
              />
              <FontAwesomeIcon
                size="1x"
                style={styles.marginHorizontal}
                icon={faBlog}
                onClick={() => {}}
              />
              <FontAwesomeIcon
                size="1x"
                style={styles.marginHorizontal}
                icon={faTwitter}
                onClick={() => {}}
              />
            </div>
            {(!(
              data.campaignStatusId === CampaignStatus.COMPLETED ||
              data.campaignStatusId === CampaignStatus.APPROVED
            ) && (
              <div style={styles.shareLinkStyle}>
                Provide Links:
                <form
                  style={{ width: '100%' }}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', flex: 1 }}>
                    {data.campaignInfluencerServices.findIndex(
                      service =>
                        service.socialChannelsId === SOCIAL_CHANNELS.FACEBOOK,
                    ) !== -1 && (
                      <div style={{ width: '50%' }}>
                        <div style={styles.socialMediaItem}>
                          <FormLabel>Facebook</FormLabel>
                          <input
                            ref={register}
                            name="facebook"
                            className="input-url"
                            id="endereco"
                            type="text"
                            placeholder="Enter Facebook url"
                            required
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.facebook && errors.facebook.message}
                          </div>
                        </div>
                      </div>
                    )}
                    {data.campaignInfluencerServices.findIndex(
                      service =>
                        service.socialChannelsId === SOCIAL_CHANNELS.INSTAGRAM,
                    ) !== -1 && (
                      <div style={{ width: '50%' }}>
                        <div style={styles.socialMediaItem}>
                          <FormLabel>Instagram</FormLabel>
                          <input
                            ref={register}
                            name="instagram"
                            className="input-url"
                            id="endereco"
                            type="text"
                            placeholder="Enter Instagram url"
                            required
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.instagram && errors.instagram.message}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* </Form.Row> */}

                    {/* <Form.Row> */}
                    {data.campaignInfluencerServices.findIndex(
                      service =>
                        service.socialChannelsId === SOCIAL_CHANNELS.TWITTER,
                    ) !== -1 && (
                      <div style={{ width: '50%' }}>
                        <div style={styles.socialMediaItem}>
                          <FormLabel>Twitter</FormLabel>
                          <input
                            ref={register}
                            name="twitter"
                            className="input-url"
                            id="endereco"
                            type="text"
                            placeholder="Enter Twitter url"
                            required
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.twitter && errors.twitter.message}
                          </div>
                        </div>
                      </div>
                    )}

                    {data.campaignInfluencerServices.findIndex(
                      service =>
                        service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
                    ) !== -1 && (
                      <div style={{ width: '50%' }}>
                        <div style={styles.socialMediaItem}>
                          <FormLabel>Blog</FormLabel>
                          <input
                            ref={register}
                            name="blog"
                            className="input-url"
                            id="endereco"
                            type="text"
                            placeholder="Enter Blog url"
                            required
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.blog && errors.blog.message}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* </Form.Row> */}
                    {/* <Form.Row> */}
                    {data.campaignInfluencerServices.findIndex(
                      service =>
                        service.socialChannelsId === SOCIAL_CHANNELS.YOUTUBE,
                    ) !== -1 && (
                      <div style={{ width: '50%' }}>
                        <div
                          style={{
                            ...styles.socialMediaItem,
                            ...{ width: '50%' },
                          }}
                        >
                          <FormLabel>Youtube</FormLabel>
                          <input
                            ref={register}
                            name="youtube"
                            className="input-url"
                            id="endereco"
                            type="text"
                            placeholder="Enter Youtube url"
                            required
                          />
                          <div
                            className="invalid-feedback"
                            style={{ display: 'block' }}
                          >
                            {errors.youtube && errors.youtube.message}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* </Form.Row> */}
                  </div>
                </form>
              </div>
            )) || (
              <div>
                {data.campaignInfluencerServices.findIndex(
                  service =>
                    service.socialChannelsId === SOCIAL_CHANNELS.FACEBOOK,
                ) !== -1 && (
                  <div>
                    {' '}
                    Facebook:{' '}
                    <Link
                      to={`${
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.FACEBOOK,
                        ).response
                      }`}
                    >
                      {
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.FACEBOOK,
                        ).response
                      }
                    </Link>
                  </div>
                )}

                {data.campaignInfluencerServices.findIndex(
                  service =>
                    service.socialChannelsId === SOCIAL_CHANNELS.INSTAGRAM,
                ) !== -1 && (
                  <div>
                    {' '}
                    Instagram:{' '}
                    <Link
                      to={`${
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.INSTAGRAM,
                        ).response
                      }`}
                    >
                      {
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.INSTAGRAM,
                        ).response
                      }
                    </Link>
                  </div>
                )}

                {data.campaignInfluencerServices.findIndex(
                  service =>
                    service.socialChannelsId === SOCIAL_CHANNELS.TWITTER,
                ) !== -1 && (
                  <div>
                    {' '}
                    Twitter:{' '}
                    <Link
                      to={`${
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.TWITTER,
                        ).response
                      }`}
                    >
                      {
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.TWITTER,
                        ).response
                      }
                    </Link>
                  </div>
                )}

                {data.campaignInfluencerServices.findIndex(
                  service => service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
                ) !== -1 && (
                  <div>
                    {' '}
                    Blog:{' '}
                    <Link
                      to={`${
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
                        ).response
                      }`}
                    >
                      {
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId === SOCIAL_CHANNELS.BLOG,
                        ).response
                      }
                    </Link>
                  </div>
                )}

                {data.campaignInfluencerServices.findIndex(
                  service =>
                    service.socialChannelsId === SOCIAL_CHANNELS.YOUTUBE,
                ) !== -1 && (
                  <div>
                    {' '}
                    Youtube:{' '}
                    <Link
                      to={`${
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.YOUTUBE,
                        ).response
                      }`}
                    >
                      {
                        data.campaignInfluencerServices.find(
                          service =>
                            service.socialChannelsId ===
                            SOCIAL_CHANNELS.YOUTUBE,
                        ).response
                      }
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          {!(
            data.campaignStatusId === CampaignStatus.COMPLETED ||
            data.campaignStatusId === CampaignStatus.APPROVED
          ) && (
            <>
              <Button
                variant="success"
                style={{ marginTop: 10 }}
                onClick={handleSubmit(onSubmit)}
              >
                Submit
              </Button>
              <div>Please share and provide url</div>
            </>
          )}
        </fieldset>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
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
