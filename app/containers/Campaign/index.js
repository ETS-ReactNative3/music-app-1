import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import {
  Button,
  Image,
  Row,
  Col,
  Container,
  Card,
  ListGroup,
} from 'react-bootstrap';
import PaperCard from '../../components/PaperCard';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectSelectedInfluencers } from '../Tastemaker/selectors';
import { launchCampaignAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import songReducer from '../Song/reducer';
import songSaga from '../Song/saga';
import { makeSelectedSong } from '../Song/selectors';
import { useInjectSaga } from '../../utils/injectSaga';
import styles from './index.styles';
import defaultImage from '../../images/album-3.jpg';
import { getSongRequest } from '../Song/actions';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import { makeSelectLoader, makeSelectUserDetails } from '../App/selectors';
import { _calculatePriceForSelectedInfluencers } from '../Tastemaker';
import { makeSelectFormLoader } from '../Album/selectors';
import appReducer from '../App/reducer';
import ButtonLoader from '../../components/ButtonLoader';
import { SOCIAL_MEDIA } from '../App/constants';
const CampaignSummary = ({
  launchCampaign,
  userDetails,
  formLoader,
  selectedInfluencers,
  selectedSong,
  match,
  getSongAction,
}) => {
  useInjectReducer({ key: 'campaign', reducer });
  useInjectSaga({ key: 'campaign', saga });
  useInjectReducer({ key: 'app', reducer: appReducer });
  useInjectReducer({ key: 'song', reducer: songReducer });
  useInjectSaga({ key: 'song', saga: songSaga });

  React.useEffect(() => {
    if (match.params.songId) {
      getSongAction(match.params.songId);
    }
  }, [match.params.songId]);

  const _renderInfluencer = (selectedInfluencer, index) => (
    <>
      <div style={styles.influencerParentStyle}>
        {index > 0 && <div style={styles.listItemDividerStyle} />}
        <div style={styles.influencerItemParentStyle}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={styles.influencerLeftStyle}>
              <div style={styles.profileStyle}>
                <Image
                  width={50}
                  height={50}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={selectedInfluencer.avatar}
                  alt=""
                  roundedCircle
                />
              </div>
            </div>
            <div style={styles.influencerBodyStyle}>
              {selectedInfluencer.name}
              <small className="text-muted d-block">
                {selectedInfluencer.influencer.description}
              </small>
              <small className="text-muted d-block">
                {selectedInfluencer &&
                  selectedInfluencer.influencer &&
                  selectedInfluencer.influencer.influencerServices.map(
                    influencerService => {
                      if (
                        influencerService.socialChannels.title ===
                        SOCIAL_MEDIA.FACEBOOK
                      )
                        return <FontAwesomeIcon icon={faFacebook} />;
                      if (
                        influencerService.socialChannels.title ===
                        SOCIAL_MEDIA.INSTAGRAM
                      )
                        return <FontAwesomeIcon icon={faInstagram} />;
                      if (
                        influencerService.socialChannels.title ===
                        SOCIAL_MEDIA.TWITTER
                      )
                        return <FontAwesomeIcon icon={faTwitter} />;
                      if (
                        influencerService.socialChannels.title ===
                        SOCIAL_MEDIA.BLOG
                      )
                        return <FontAwesomeIcon icon={faBlog} />;
                      if (
                        influencerService.socialChannels.title ===
                        SOCIAL_MEDIA.YOUTUBE
                      )
                        return <FontAwesomeIcon icon={faYoutube} />;
                    },
                  )}
              </small>
            </div>
          </div>
          <div>
            <div style={styles.creditParentStyle}>
              <img
                src={PlanSvgColor}
                alt="PlanSvg"
                width={20}
                height={20}
                style={{ marginLeft: 10, marginRight: 5 }}
              />
              <div style={styles.creditTextStyle}>{`${
                selectedInfluencer.influencer.price
              } Credits`}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <PaperCard title="Campaign Summary">
        <Row className="mt-5">
          <Col md={7} lg={8}>
            <Container fluid>
              <Row>
                <Col md={12}>
                  {selectedSong && (
                    <div className="d-flex align-items-center">
                      <Image
                        width={150}
                        height={150}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                        src={selectedSong.artwork || ''}
                        alt=""
                        roundedCircle
                      />

                      <div className="ml-3">
                        <div className="d-flex align-items-center">
                          {selectedSong.title}
                        </div>
                        <small className="text-muted d-block">
                          {selectedSong.description}
                        </small>
                        <small className="text-muted d-block">
                          {moment(selectedSong.releaseDate).format(
                            'DD MMMM YYYY',
                          )}
                        </small>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md={12}>
                  <h3>Selected Influencers:</h3>
                  {selectedInfluencers && (
                    <>
                      {selectedInfluencers.map((influencer, index) =>
                        _renderInfluencer(influencer, index),
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={5} lg={4}>
            <Card className="mb-4 bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="pt-4 border-0 bg-transparent">
                  <div className="h6">Summary</div>
                </ListGroup.Item>
                <ListGroup.Item className="pb-0 border-0 bg-transparent">
                  <div className="d-flex my-3 align-items-center justify-content-between">
                    <div>Total Credits:</div>
                    <div>
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={20}
                        height={20}
                        style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      {_calculatePriceForSelectedInfluencers(
                        selectedInfluencers,
                      )}
                    </div>
                  </div>
                  <div className="d-flex my-3 align-items-center justify-content-between">
                    <div>You have:</div>
                    <div>
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={20}
                        height={20}
                        style={{ marginLeft: 10, marginRight: 5 }}
                      />
                      {userDetails.credit}
                    </div>
                  </div>
                  {userDetails.credit -
                    _calculatePriceForSelectedInfluencers(selectedInfluencers) >
                  0 ? (
                    <div className="d-flex my-3 align-items-center justify-content-between">
                      <div>Credits left:</div>
                      <div>
                        <img
                          src={PlanSvgColor}
                          alt="PlanSvg"
                          width={20}
                          height={20}
                          style={{ marginLeft: 10, marginRight: 5 }}
                        />
                        {userDetails.credit -
                          _calculatePriceForSelectedInfluencers(
                            selectedInfluencers,
                          )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-warning">
                      <div className="h6">You don’t have enough credits</div>
                      <small className="text-muted d-block">
                        Buy credits and start promoting your music by starting
                        campaigns with the help of an amazing community of
                        influencers!
                      </small>
                      <Button variant="success">Buy Credits</Button>
                    </div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 border-0 bg-transparent">
                  <hr className="blick-border" />
                  {userDetails.credit -
                    _calculatePriceForSelectedInfluencers(selectedInfluencers) >
                    0 && (
                    <>
                      {formLoader ? (
                        <ButtonLoader />
                      ) : (
                        <Button
                          onClick={() => {
                            launchCampaign({
                              songId: selectedSong.id,
                              price: _calculatePriceForSelectedInfluencers(
                                selectedInfluencers,
                              ),
                              // "campaignStatusId": 1,
                              influencers: selectedInfluencers.map(
                                influencer => ({
                                  ...influencer.influencer,
                                  services:
                                    influencer.influencer.influencerServices,
                                }),
                              ),
                            });
                          }}
                          variant="warning"
                          block
                    className="mt-4"
                        >
                          Launch Campaign
                        </Button>
                      )}
                    </>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </PaperCard>
      {/* <div className="container-fluid" style={{ marginTop: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={styles.selectedDataParent}>
            <h3>Selected Song:</h3>
            {selectedSong && (
              <div style={{ marginLeft: 10 }}>
                <div style={styles.selectedSongParent}>
                  <Image
                    width={100}
                    height={100}
                    src={selectedSong.artwork || ''}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                  />
                  <div style={styles.songInfo}>
                    <div>{selectedSong.title}</div>
                    <div>{selectedSong.description}</div>
                    <div>
                      {moment(selectedSong.releaseDate).format('DD MMMM YYYY')}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <h3 style={{ marginTop: 20 }}>Selected Influencers:</h3>
            {selectedInfluencers && (
              <div style={{ marginLeft: 10 }}>
                {selectedInfluencers.map((influencer, index) =>
                  _renderInfluencer(influencer, index),
                )}
              </div>
            )}
          </div>
          <div style={{ width: '50%', margin: 30 }}>
            <div style={styles.creditSectionParent}>
              <div style={styles.creditParent}>
                <>Total Credits:</>
                <div style={{ flexDirection: 'row' }}>
                  <img
                    src={PlanSvgColor}
                    alt="PlanSvg"
                    width={20}
                    height={20}
                    style={{ marginLeft: 10, marginRight: 5 }}
                  />
                  {_calculatePriceForSelectedInfluencers(selectedInfluencers)}
                </div>
              </div>

              <div style={styles.creditParent}>
                <>You have:</>
                <div style={{ flexDirection: 'row' }}>
                  <img
                    src={PlanSvgColor}
                    alt="PlanSvg"
                    width={20}
                    height={20}
                    style={{ marginLeft: 10, marginRight: 5 }}
                  />
                  {userDetails.credit}
                </div>
              </div>

              {userDetails.credit -
                _calculatePriceForSelectedInfluencers(selectedInfluencers) >
              0 ? (
                <div style={styles.creditParent}>
                  <>Credits left:</>
                  <div style={{ flexDirection: 'row' }}>
                    <img
                      src={PlanSvgColor}
                      alt="PlanSvg"
                      width={20}
                      height={20}
                      style={{ marginLeft: 10, marginRight: 5 }}
                    />
                    {userDetails.credit -
                      _calculatePriceForSelectedInfluencers(
                        selectedInfluencers,
                      )}
                  </div>
                </div>
              ) : (
                <div style={styles.cardStyle}>
                  <div
                    style={{
                      padding: 20,
                      backgroundImage:
                        'linear-gradient(to right, #091924, #0053A5',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div style={styles.buyCreditText}>
                      You don’t have enough credits
                    </div>
                    <div style={styles.buyCreditText1}>
                      Buy credits and start promoting your music by starting
                      campaigns with the help of an amazing community of
                      influencers!
                    </div>

                    <Button variant="success">Buy Credits</Button>
                  </div>
                </div>
              )}
            </div>
            {userDetails.credit -
              _calculatePriceForSelectedInfluencers(selectedInfluencers) >
              0 && (
              <div
                style={{
                  width: '100%',
                  margin: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {formLoader ? (
                  <ButtonLoader />
                ) : (
                  <Button
                    onClick={() => {
                      launchCampaign({
                        songId: selectedSong.id,
                        price: _calculatePriceForSelectedInfluencers(
                          selectedInfluencers,
                        ),
                        // "campaignStatusId": 1,
                        influencers: selectedInfluencers.map(influencer => ({
                          ...influencer.influencer,
                          services: influencer.influencer.influencerServices,
                        })),
                      });
                    }}
                    style={{ width: '70%' }}
                    variant="success"
                  >
                    Launch Campaign
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
     */}
    </>
  );
};

CampaignSummary.propTypes = {
  selectedInfluencers: PropTypes.array,
  selectedSong: PropTypes.any,
  launchCampaign: PropTypes.func,
  formLoader: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  selectedInfluencers: makeSelectSelectedInfluencers(),
  selectedSong: makeSelectedSong(),
  userDetails: makeSelectUserDetails(),
  formLoader: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    launchCampaign: data => dispatch(launchCampaignAction(data)),
    getSongAction: id => dispatch(getSongRequest(id)),
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
)(CampaignSummary);
