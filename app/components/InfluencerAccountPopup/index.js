import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { memo } from 'react';
import {
  Button,
  Image,
  Modal,
  Form,
  InputGroup,
  Spinner,
  Row,
  Col,
  Card,
  ListGroup,
  Container,
} from 'react-bootstrap';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InfluencerAccount from '../InfluencerAccount';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import { combineFollowers, formatFollowers } from '../../utils';
import defaultImage from '../../images/album-3.jpg';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from '../../containers/Tastemaker/reducer';
import { selectInfluencerAction } from '../../containers/Tastemaker/actions';
import { SOCIAL_MEDIA } from '../../containers/App/constants';

const InfluencerAccountPopup = ({
  openModal,
  handleClose,
  userSelected,
  selectInfluencer,
}) => {
  const followers = combineFollowers(
    (userSelected && userSelected.influencer) || {},
  );

  const _field = (icon, label, credits, callBack, followers, selected) => (
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <div>
          <FontAwesomeIcon
            size="1x"
            color="white"
            icon={icon}
            style={{ marginRight: 5 }}
          />
          {label}
        </div>
        <small className="text-muted">{`${followers} followers`}</small>
      </div>
      {credits !== '' && (
        <div className="custom-checkbox custom-checkbox__right">
          <input
            type="checkbox"
            id={`campaign${label}`}
            className="form-check-input"
            defaultChecked={selected}
            onChange={callBack}
          />
          <label className="form-check-label" htmlFor={`campaign${label}`}>
            <img
              className="mr-1"
              src={PlanSvgColor}
              alt="PlanSvg"
              width={15}
              height={15}
            />
            <small>{credits}</small>
          </label>
        </div>
      )}
    </div>

    // <div
    //   style={{
    //     display: 'flex',
    //     width: '50%',
    //     marginTop: 10,
    //     flexDirection: 'column',
    //   }}
    // >
    //   <div
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       justifyContent: 'space-between',
    //     }}
    //   >
    //     <div style={{ display: 'flex', flexDirection: 'column' }}>
    //       <div
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           justifyContent: 'flex-start',
    //         }}
    //       >
    //         <FontAwesomeIcon
    //           size="1x"
    //           color="white"
    //           icon={icon}
    //           style={{ marginRight: 5 }}
    //         />
    //         <div style={{ fontSize: 18 }}>{label}</div>
    //       </div>
    //       <div style={{ color: 'grey' }}>{`${followers} followers`}</div>
    //     </div>
    //     {credits !== '' && (
    //       <div
    //         style={{
    //           display: 'flex',
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           marginTop: 5,
    //         }}
    //       >
    //         <img
    //           src={PlanSvgColor}
    //           alt="PlanSvg"
    //           width={20}
    //           height={20}
    //           style={{ marginLeft: 10, marginRight: 5 }}
    //         />
    //         <div style={{ fontSize: 14, color: 'white' }}>
    //           {` ${credits}   `}
    //         </div>
    //         {/* <CheckBox color={colors.primaryColor} onPress={callBack} selected={selected} /> */}
    //         <input
    //           type="checkbox"
    //           style={{ marginLeft: 10, marginRight: 10 }}
    //           defaultChecked={selected}
    //           onChange={callBack}
    //         />
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
  const [innerInfluencer, setInnerInfluencer] = React.useState({
    ...userSelected,
    influencer: { ...userSelected.influencer, influencerServices: [] },
  });
  const [facebook, selectFacebook] = React.useState(false);
  const [twitter, selectTwitter] = React.useState(false);
  const [instagram, selectInstagram] = React.useState(false);
  const [blog, selectBlog] = React.useState(false);
  const [youtube, selectYoutube] = React.useState(false);
  const [campaignMedium, setCampaignMedium] = React.useState(0);
  const [price, setTotalPrice] = React.useState(0);

  useInjectReducer({ key: 'influencer', reducer });

  return (
    <Modal
      show={openModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
          <div>Influencer Account</div>
        </div>
      </Modal.Header>
      <Container fluid>
        <Row className="mt-5">
          <Col md={6} xl={7}>
            <div className="d-flex mb-4 align-items-center">
              <Image
                width={70}
                height={70}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
                src={userSelected.avatar}
                alt=""
                roundedCircle
              />
              <div className="ml-3">
                {userSelected.name}
                <small className="text-muted d-block">
                  {followers > 1000
                    ? `${formatFollowers(followers / 1000)}k`
                    : followers}{' '}
                  followers
                </small>
              </div>
            </div>
            <hr className="blick-border" />
            <InfluencerAccount navigation={{}} userId={userSelected.id} 
          showActivites={false}
          />
          </Col>
          <Col md={6} xl={5}>
            <Card className="mb-4 bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="pt-4 border-0 bg-transparent">
                  <div className="h6">Select campaign medium</div>
                </ListGroup.Item>
                <ListGroup.Item className="pb-0 border-0 bg-transparent">
                  {userSelected.influencer &&
                    userSelected.influencer.influencerServices.map(
                      influencerService => {
                        if (
                          influencerService.socialChannels.title ===
                          SOCIAL_MEDIA.FACEBOOK
                        )
                          return _field(
                            faFacebook,
                            'Facebook',
                            influencerService.price,
                            () => {
                              selectFacebook(!facebook);

                              if (!facebook) {
                                setCampaignMedium(campaignMedium + 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price + influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.concat(
                                      [influencerService],
                                    ),
                                  },
                                });
                              } else {
                                setCampaignMedium(campaignMedium - 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price - influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.filter(
                                      influencerService =>
                                        influencerService.socialChannels
                                          .title === SOCIAL_MEDIA.FACEBOOK,
                                    ),
                                  },
                                });
                              }
                            },
                            influencerService.followers,
                            facebook,
                          );

                        if (
                          influencerService.socialChannels.title ===
                          SOCIAL_MEDIA.INSTAGRAM
                        )
                          return _field(
                            faInstagram,
                            'Instagram',
                            influencerService.price,
                            () => {
                              selectInstagram(!instagram);
                              if (!instagram) {
                                setCampaignMedium(campaignMedium + 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price + influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.concat(
                                      [influencerService],
                                    ),
                                  },
                                });
                              } else {
                                setCampaignMedium(campaignMedium - 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price - influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.filter(
                                      influencerService =>
                                        influencerService.socialChannels
                                          .title === SOCIAL_MEDIA.INSTAGRAM,
                                    ),
                                  },
                                });
                              }
                            },
                            influencerService.followers,
                            instagram,
                          );

                        if (
                          influencerService.socialChannels.title ===
                          SOCIAL_MEDIA.TWITTER
                        )
                          return _field(
                            faTwitter,
                            'Twitter',
                            influencerService.price,
                            () => {
                              selectTwitter(!twitter);
                              if (!twitter) {
                                setCampaignMedium(campaignMedium + 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price + influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.concat(
                                      [influencerService],
                                    ),
                                  },
                                });
                              } else {
                                setCampaignMedium(campaignMedium - 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price - influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.filter(
                                      influencerService =>
                                        influencerService.socialChannels
                                          .title === SOCIAL_MEDIA.TWITTER,
                                    ),
                                  },
                                });
                              }
                            },
                            influencerService.followers,
                            twitter,
                          );

                        if (
                          influencerService.socialChannels.title ===
                          SOCIAL_MEDIA.YOUTUBE
                        )
                          return _field(
                            faYoutube,
                            'Youtube',
                            influencerService.price,
                            () => {
                              selectYoutube(!youtube);
                              if (!youtube) {
                                setCampaignMedium(campaignMedium + 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price + influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.concat(
                                      [influencerService],
                                    ),
                                  },
                                });
                              } else {
                                setCampaignMedium(campaignMedium - 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price - influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.filter(
                                      influencerService =>
                                        influencerService.socialChannels
                                          .title === SOCIAL_MEDIA.YOUTUBE,
                                    ),
                                  },
                                });
                              }
                            },
                            influencerService.followers,
                            youtube,
                          );

                        if (
                          influencerService.socialChannels.title ===
                          SOCIAL_MEDIA.BLOG
                        )
                          return _field(
                            faBlog,
                            'Blog',
                            influencerService.price,
                            () => {
                              selectBlog(!blog);
                              if (!blog) {
                                setCampaignMedium(campaignMedium + 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price + influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.concat(
                                      [influencerService],
                                    ),
                                  },
                                });
                              } else {
                                setCampaignMedium(campaignMedium - 1);
                                if (influencerService.price)
                                  setTotalPrice(
                                    price - influencerService.price,
                                  );
                                setInnerInfluencer({
                                  ...innerInfluencer,
                                  influencer: {
                                    ...innerInfluencer.influencer,
                                    influencerServices: innerInfluencer.influencer.influencerServices.filter(
                                      influencerService =>
                                        influencerService.socialChannels
                                          .title === SOCIAL_MEDIA.BLOG,
                                    ),
                                  },
                                });
                              }
                            },
                            influencerService.followers,
                            blog,
                          );
                      },
                    )}
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 border-0 bg-transparent">
                  <hr className="blick-border" />
                  {campaignMedium} campaign mediums
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <div>
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={15}
                        height={15}
                        style={{ marginRight: 5 }}
                      />
                      price
                    </div>
                    <div className="h4 m-0">{price}</div>
                  </div>
                  <Button
                    variant="warning"
                    block
                    className="mt-4"
                    disabled={campaignMedium === 0}
                    onClick={() => {
                      handleClose();
                      selectInfluencer({
                        ...innerInfluencer,
                        influencer: { ...innerInfluencer.influencer, price },
                      });
                    }}
                  >
                    Add
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <div style={{ marginLeft: 10 }}>
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
            src={userSelected.avatar}
            alt=""
            roundedCircle
          />
          <div style={{ marginLeft: 20, textAlign: 'left' }}>
            <div>{userSelected.name}</div>
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
        <div>Please select Campaign medium</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            flexWrap: 'wrap',
          }}
        >
          {userSelected.influencer &&
            userSelected.influencer.influencerServices.map(
              influencerService => {
                if (
                  influencerService.socialChannels.title ===
                  SOCIAL_MEDIA.FACEBOOK
                )
                  return _field(
                    faFacebook,
                    'Facebook',
                    influencerService.price,
                    () => {
                      selectFacebook(!facebook);
                      console.log(
                        innerInfluencer.influencer.influencerServices,
                      );
                      if (!facebook) {
                        setCampaignMedium(campaignMedium + 1);
                        if (influencerService.price)
                          setTotalPrice(price + influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.concat(
                              [influencerService],
                            ),
                          },
                        });
                      } else {
                        setCampaignMedium(campaignMedium - 1);
                        if (influencerService.price)
                          setTotalPrice(price - influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.filter(
                              influencerService =>
                                influencerService.socialChannels.title ===
                                SOCIAL_MEDIA.FACEBOOK,
                            ),
                          },
                        });
                      }
                    },
                    influencerService.followers,
                    facebook,
                  );

                if (
                  influencerService.socialChannels.title ===
                  SOCIAL_MEDIA.INSTAGRAM
                )
                  return _field(
                    faInstagram,
                    'Instagram',
                    influencerService.price,
                    () => {
                      selectInstagram(!instagram);
                      if (!instagram) {
                        setCampaignMedium(campaignMedium + 1);
                        if (influencerService.price)
                          setTotalPrice(price + influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.concat(
                              [influencerService],
                            ),
                          },
                        });
                      } else {
                        setCampaignMedium(campaignMedium - 1);
                        if (influencerService.price)
                          setTotalPrice(price - influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.filter(
                              influencerService =>
                                influencerService.socialChannels.title ===
                                SOCIAL_MEDIA.INSTAGRAM,
                            ),
                          },
                        });
                      }
                    },
                    influencerService.followers,
                    instagram,
                  );

                if (
                  influencerService.socialChannels.title ===
                  SOCIAL_MEDIA.TWITTER
                )
                  return _field(
                    faTwitter,
                    'Twitter',
                    influencerService.price,
                    () => {
                      selectTwitter(!twitter);
                      if (!twitter) {
                        setCampaignMedium(campaignMedium + 1);
                        if (influencerService.price)
                          setTotalPrice(price + influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.concat(
                              [influencerService],
                            ),
                          },
                        });
                      } else {
                        setCampaignMedium(campaignMedium - 1);
                        if (influencerService.price)
                          setTotalPrice(price - influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.filter(
                              influencerService =>
                                influencerService.socialChannels.title ===
                                SOCIAL_MEDIA.TWITTER,
                            ),
                          },
                        });
                      }
                    },
                    influencerService.followers,
                    twitter,
                  );

                if (
                  influencerService.socialChannels.title ===
                  SOCIAL_MEDIA.YOUTUBE
                )
                  return _field(
                    faYoutube,
                    'Youtube',
                    influencerService.price,
                    () => {
                      selectYoutube(!youtube);
                      if (!youtube) {
                        setCampaignMedium(campaignMedium + 1);
                        if (influencerService.price)
                          setTotalPrice(price + influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.concat(
                              [influencerService],
                            ),
                          },
                        });
                      } else {
                        setCampaignMedium(campaignMedium - 1);
                        if (influencerService.price)
                          setTotalPrice(price - influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.filter(
                              influencerService =>
                                influencerService.socialChannels.title ===
                                SOCIAL_MEDIA.YOUTUBE,
                            ),
                          },
                        });
                      }
                    },
                    influencerService.followers,
                    youtube,
                  );

                if (
                  influencerService.socialChannels.title === SOCIAL_MEDIA.BLOG
                )
                  return _field(
                    faBlog,
                    'Blog',
                    influencerService.price,
                    () => {
                      selectBlog(!blog);
                      if (!blog) {
                        setCampaignMedium(campaignMedium + 1);
                        if (influencerService.price)
                          setTotalPrice(price + influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.concat(
                              [influencerService],
                            ),
                          },
                        });
                      } else {
                        setCampaignMedium(campaignMedium - 1);
                        if (influencerService.price)
                          setTotalPrice(price - influencerService.price);
                        setInnerInfluencer({
                          ...innerInfluencer,
                          influencer: {
                            ...innerInfluencer.influencer,
                            influencerServices: innerInfluencer.influencer.influencerServices.filter(
                              influencerService =>
                                influencerService.socialChannels.title ===
                                SOCIAL_MEDIA.BLOG,
                            ),
                          },
                        });
                      }
                    },
                    influencerService.followers,
                    blog,
                  );
              },
            )}
        </div>
        <InfluencerAccount navigation={{}} userId={userSelected.id} />
      </div>
       */}
      {/* <Modal.Footer style={{ justifyContent: 'flex-start', flex: 1 }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>{`${campaignMedium} campaign mediums`}</div>
            <div>
              <img
                src={PlanSvgColor}
                alt="PlanSvg"
                width={20}
                height={20}
                style={{ marginRight: 5 }}
              />
              {`${price} price`}
            </div>
          </div>

          <Button
            disabled={campaignMedium === 0}
            style={{
              backgroundImage: 'linear-gradient(to right, #0053A5, #091924)',
            }}
            onClick={() => {
              handleClose();
              selectInfluencer({
                ...innerInfluencer,
                influencer: { ...innerInfluencer.influencer, price },
              });
            }}
          >
            Add
          </Button>
        </div>
      </Modal.Footer>
     */}
    </Modal>
  );
};

InfluencerAccountPopup.propTypes = {
  openModal: PropTypes.bool,
  handleClose: PropTypes.func,
  userSelected: PropTypes.any,
  selectInfluencer: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    selectInfluencer: data => dispatch(selectInfluencerAction(data)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InfluencerAccountPopup);
