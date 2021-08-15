import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
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
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';
import {useInjectReducer} from '../../utils/injectReducer';
import {makeSelectSelectedInfluencers} from '../Tastemaker/selectors';
import {launchCampaignAction} from './actions';
import reducer from './reducer';
import saga from './saga';
import songReducer from '../Song/reducer';
import songSaga from '../Song/saga';
import {makeSelectedSong} from '../Song/selectors';
import {useInjectSaga} from '../../utils/injectSaga';
import styles from './index.styles';
import defaultImage from '../../images/album-3.jpg';
import defaultAvatar from '../../images/user.svg';
import {getSongRequest} from '../Song/actions';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import {makeSelectLoader, makeSelectUserDetails} from '../App/selectors';
import {_calculatePriceForSelectedInfluencers} from '../Tastemaker';
import appReducer from '../App/reducer';
import ButtonLoader from '../../components/ButtonLoader';
import LoadingIndicator from "../../components/LoadingIndicator";
import { renderSocialMediaIcons } from '../../utils';

const CampaignSummary = (
  {
    launchCampaign,
    userDetails,
    formLoader,
    selectedInfluencers,
    selectedSong,
    match,
    getSongAction,
  }) => {
  useInjectReducer({key: 'campaign', reducer});
  useInjectSaga({key: 'campaign', saga});
  useInjectReducer({key: 'app', reducer: appReducer});
  useInjectReducer({key: 'song', reducer: songReducer});
  useInjectSaga({key: 'song', saga: songSaga});

  useEffect(() => {
    if (match.params.songId) {
      getSongAction(match.params.songId);
    }
  }, [match.params.songId]);

  const _renderInfluencer = (selectedInfluencer, index) => (
    <>
      <div style={styles.influencerParentStyle}>
        <div style={styles.influencerItemParentStyle}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={styles.influencerLeftStyle}>
              <div style={styles.profileStyle}>
                <Image
                  width={50}
                  height={50}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                  src={selectedInfluencer.avatar}
                  alt=""
                  roundedCircle
                />
              </div>
            </div>
            <div style={styles.influencerBodyStyle}>
              {selectedInfluencer.influencer.name}
              <p className="d-block">
                {selectedInfluencer.influencer.description}
              </p>
              <span className="d-block">
                {selectedInfluencer &&
                selectedInfluencer.influencer &&
                selectedInfluencer.influencer.influencerServices.map(
                  influencerService =>
                    renderSocialMediaIcons(influencerService.socialChannels.title)
                  ,
                )}
              </span>
            </div>
          </div>
          <div>
            <div style={styles.creditParentStyle}>
              <img
                src={PlanSvgColor}
                alt="PlanSvg"
                width={20}
                height={20}
                style={{marginLeft: 10, marginRight: 5}}
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
        {userDetails ? <Row className="mt-5">
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
                        src={selectedSong.albumSongs[0].album.artwork || ''}
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
                        style={{marginLeft: 10, marginRight: 5}}
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
                        style={{marginLeft: 10, marginRight: 5}}
                      />
                      {userDetails.credit}
                    </div>
                  </div>
                  {userDetails.credit -
                  _calculatePriceForSelectedInfluencers(selectedInfluencers) >=
                  0 ? (
                    <div className="d-flex my-3 align-items-center justify-content-between">
                      <div>Credits left:</div>
                      <div>
                        <img
                          src={PlanSvgColor}
                          alt="PlanSvg"
                          width={20}
                          height={20}
                          style={{marginLeft: 10, marginRight: 5}}
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
                      <Link to={'/wallet'}>
                        <Button variant="success" block className="mt-2">Buy Credits</Button>
                      </Link>
                    </div>
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 border-0 bg-transparent">
                  <hr className="blick-border"/>
                  {userDetails.credit -
                  _calculatePriceForSelectedInfluencers(selectedInfluencers) >=
                  0 && (
                    <>
                      {formLoader ? (
                        <ButtonLoader/>
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
        </Row> : <LoadingIndicator/>}

      </PaperCard>
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
