import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import defaultImage from '../../images/like.png';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import { combineFollowers, formatFollowers } from '../../utils';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import {
  makeSelectInfluencerDetails,
  makeSelectRole,
  makeSelectUserDetails,
} from '../App/selectors';

function Detail({ userDetails, userRole, influencerProfile }) {
  const [followers, setFollowers] = React.useState(0);
  useEffect(() => {
    setFollowers(combineFollowers(influencerProfile));
  }, [influencerProfile]);
  return (
    <>
      <div className="container-fluid" style={{ marginTop: '100px' }}>
        <div className="row album-detail">
          <div className="col pt-3 pt-md-0">
            <div className="row">
              <div className="col">
                <h1>My Plan</h1>
              </div>
            </div>
          </div>
        </div>
        {userDetails && `${userDetails.credit}` ? (
          <div style={{ display: 'flex' }}>
            <div>You have:</div>
            <img
              src={PlanSvgColor}
              alt="PlanSvg"
              width={20}
              height={20}
              style={{ marginLeft: 10, marginRight: 5 }}
            />
            <div> {userDetails.credit} Credits</div>
            <a href="" style={{ marginLeft: 10 }}>
              View History
            </a>
          </div>
        ) : (
          <></>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Card
            style={{
              width: '40%',
              textAlign: 'center',
              backgroundImage: 'linear-gradient(to right, #0053A5, #091924)',
              border: 'none',
            }}
          >
            <Card.Body>
              <Card.Title style={{ fontSize: 30 }}>
                Create - Connect - Share
              </Card.Title>
              <Card.Text style={{ fontSize: 12 }}>
                Buy credits and start promoting your music by starting campaigns
                with the help of an amazing community of influencers!
              </Card.Text>
              <Card.Text style={{ fontSize: 12 }}>
                Buy
                <img
                  src={PlanSvgColor}
                  alt="PlanSvg"
                  width={20}
                  height={20}
                  style={{ marginLeft: 10, marginRight: 5 }}
                />
                5 for $6
              </Card.Text>
              <Card.Text style={{ fontSize: 12 }}>
                Buy
                <img
                  src={PlanSvgColor}
                  alt="PlanSvg"
                  width={20}
                  height={20}
                  style={{ marginLeft: 10, marginRight: 5 }}
                />
                10 for $10
              </Card.Text>

              <Button style={{ width: '100%' }} variant="success">
                Buy Credits
              </Button>
            </Card.Body>
          </Card>
          {userRole === 'regular' && (
            <Card
              style={{
                marginTop: 20,
                width: '40%',
                textAlign: 'center',
                backgroundImage: 'linear-gradient(to right, #0053A5, #091924)',
                border: 'none',
              }}
            >
              <div
                style={{ display: 'flex', flexDirection: 'column', margin: 20 }}
              >
                <div
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'normal',
                  }}
                >
                  <div style={{ float: 'left' }}>Current Account: </div>
                  <div style={{ float: 'right' }}>
                    {userDetails.influencerId ? 'Influencer' : 'Regular'}{' '}
                  </div>
                </div>
                {userDetails.influencerId ? (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: 10,
                        justifyContent: 'start',
                      }}
                    >
                      <Image
                        width={50}
                        height={50}
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                        src={userDetails.avatar}
                        alt=""
                        roundedCircle
                      />
                      <div style={{ marginLeft: 20, textAlign: 'left' }}>
                        <div>{userDetails.name}</div>
                        {
                          <div style={{ color: 'grey' }}>
                            {`${
                              followers > 1000
                                ? `${formatFollowers(followers / 1000)}k`
                                : followers
                            } followers`}
                          </div>
                        }
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 20,
                        marginLeft: 10,
                        display: 'flex',
                        alignItems: 'flex-start',
                      }}
                    >
                      {(influencerProfile && influencerProfile.facebook && (
                        <FontAwesomeIcon
                          size="x"
                          color={PLAY_ICON_BG_COLOR}
                          icon={faFacebook}
                          style={{ marginLeft: 5 }}
                        />
                      )) || <></>}
                      {(influencerProfile && influencerProfile.instagram && (
                        <FontAwesomeIcon
                          size="x"
                          color={PLAY_ICON_BG_COLOR}
                          icon={faInstagram}
                          style={{ marginLeft: 5 }}
                        />
                      )) || <></>}
                      {(influencerProfile && influencerProfile.twitter && (
                        <FontAwesomeIcon
                          size="x"
                          color={PLAY_ICON_BG_COLOR}
                          icon={faTwitter}
                          style={{ marginLeft: 5 }}
                        />
                      )) || <></>}
                      {(influencerProfile && influencerProfile.blog && (
                        <FontAwesomeIcon
                          size="x"
                          color={PLAY_ICON_BG_COLOR}
                          icon={faBlog}
                          style={{ marginLeft: 5 }}
                        />
                      )) || <></>}
                      {(influencerProfile && influencerProfile.youtube && (
                        <FontAwesomeIcon
                          size="x"
                          color={PLAY_ICON_BG_COLOR}
                          icon={faYoutube}
                          style={{ marginLeft: 5 }}
                        />
                      )) || <></>}
                    </div>
                  </>
                ) : (
                  <>
                    <Button style={{ margin: 10 }} variant="outline-success">
                      Become an influencer
                    </Button>
                  </>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

Detail.prototype = {
  userRole: PropTypes.string,
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  userRole: makeSelectRole(),
  influencerProfile: makeSelectInfluencerDetails(),
});

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
)(Detail);
