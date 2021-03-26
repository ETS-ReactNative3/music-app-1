import React, {memo, useEffect} from 'react';
import {
  Button,
  Image,
  Modal,
  Row,
  Col,
  Card,
  ListGroup,
  Container, Badge, OverlayTrigger, Tooltip,
} from 'react-bootstrap';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import {capatilizeText, combineFollowers, renderSocialMediaIcons} from '../../utils';
import defaultImage from '../../images/user.svg';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from '../../containers/Tastemaker/reducer';
import {selectInfluencerAction} from '../../containers/Tastemaker/actions';
import {SOCIAL_MEDIA} from '../../containers/App/constants';
import {createStructuredSelector} from 'reselect';
import {isArray} from 'lodash';
import {makeSelectGenres} from '../../containers/Album/selectors';
import './index.scss';
import saga from "../../containers/Influencer/saga";
import influencerReducer from "../../containers/Influencer/reducer";
import {fetchInfluencerStatsAction} from "../../containers/Influencer/actions";
import {makeSelectInfluencerStats, makeSelectInfluencerStatsLoader} from "../../containers/Influencer/selectors";
import LoadingIndicator from "../LoadingIndicator";
import TasteMakerStats from "../TasteMakerStats/Loadable";

const InfluencerAccountPopup = (
  {
    openModal,
    handleClose,
    userSelected,
    selectInfluencer,
    genres,
    getInfluencerStats,
    influencerStatsLoader,
    influencerStats,
  }) => {
  const followers = combineFollowers(
    (userSelected && userSelected.influencer) || {},
  );

  const _field = (icon, label, link, credits, callBack, followers, selected) => (

    <div

      className="d-flex align-items-center justify-content-between">
      <OverlayTrigger
        style={{
          cursor: 'pointer'
        }}

        trigger={["hover", "focus"]} placement="left" overlay={
        <Tooltip>
          Click to open
        </Tooltip>
      }>
        <div onClick={() => {
          window.open(link, "_blank")
        }}>
          <div className="icon_text">
            {renderSocialMediaIcons(icon, '1x', {marginRight: 5})}{capatilizeText(label)}
          </div>
          <small className="text-muted">{`${followers} followers`}</small>
        </div>
      </OverlayTrigger>
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
  );
  const [innerInfluencer, setInnerInfluencer] = React.useState({
    ...userSelected,
    influencer: {...userSelected.influencer, influencerServices: []},
  });
  const [facebook, selectFacebook] = React.useState(false);
  const [twitter, selectTwitter] = React.useState(false);
  const [instagram, selectInstagram] = React.useState(false);
  const [blog, selectBlog] = React.useState(false);
  const [youtube, selectYoutube] = React.useState(false);
  const [campaignMedium, setCampaignMedium] = React.useState(0);
  const [price, setTotalPrice] = React.useState(0);

  const [selectedMedium, setSelectedMedium] = React.useState([]);
  useInjectReducer({key: 'tastemaker', reducer});
  useInjectReducer({key: 'influencer', reducer: influencerReducer});
  useInjectSaga({key: 'influencer', saga});

  useEffect(() => {
    getInfluencerStats(userSelected.influencer.id)
  }, [userSelected]);

  const renderGenres = (genersToRender, genres) =>
    genersToRender &&
    isArray(genersToRender) &&
    (genersToRender || []).map(internalGener => (
      <Badge variant="success" className="p-2 mr-3 mt-2">
        {(genres.find(gener => gener.id === internalGener.genreId) || {}).title}
      </Badge>
    ));

  return (
    <Modal
      show={openModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="lg"
    >
      <Modal.Header closeButton>
        <div style={{display: 'flex', justifyContent: 'center', flex: 1}}>
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
                alt="user avatar"
                roundedCircle
              />
              <div className="ml-3">
                {userSelected.influencer.name || userSelected.name}
              </div>
            </div>
            <h6>Service Information</h6>
            <p>
              {userSelected.influencer.helpArtistDescription}
            </p>
            <hr className="blick-border"/>
            {renderGenres(userSelected.influencer.influencerGenres, genres)}
            <hr className="blick-border"/>
            {/* <InfluencerAccount navigation={{}} userId={userSelected.influencer.id}
              showActivites={false}
            /> */}

            {influencerStatsLoader ? <LoadingIndicator/> : <TasteMakerStats stats={influencerStats}/>}
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

                      return _field(
                        influencerService.socialChannels.title,
                        influencerService.socialChannels.title,
                        influencerService.link,
                        influencerService.price,
                        () => {

                          if (!selectedMedium.includes(influencerService.socialChannels.title)) {
                            setSelectedMedium([...selectedMedium, influencerService.socialChannels.title])
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
                            setSelectedMedium([...selectedMedium.filter(medium => medium !== influencerService.socialChannels.title)])

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
                        selectedMedium.includes(influencerService.socialChannels.title),
                      );
                    },
                  )}
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 border-0 bg-transparent">
                  <hr className="blick-border"/>
                  {selectedMedium.length} campaign mediums
                  <div className="my-3 d-flex align-items-center justify-content-between">
                    <div>
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={15}
                        height={15}
                        style={{marginRight: 5}}
                      />
                      price
                    </div>
                    <div className="h4 m-0">{price}</div>
                  </div>
                  <Button
                    variant="warning"
                    block
                    className="mt-4"
                    disabled={selectedMedium.length === 0}
                    onClick={() => {
                      handleClose();
                      selectInfluencer({
                        ...innerInfluencer,
                        influencer: {...innerInfluencer.influencer, price},
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
    </Modal>
  );
};

InfluencerAccountPopup.propTypes = {
  openModal: PropTypes.bool,
  handleClose: PropTypes.func,
  userSelected: PropTypes.any,
  selectInfluencer: PropTypes.func,
  getInfluencerStats: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  influencerStats: makeSelectInfluencerStats(),
  influencerStatsLoader: makeSelectInfluencerStatsLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    selectInfluencer: data => dispatch(selectInfluencerAction(data)),
    getInfluencerStats: (id) => dispatch(fetchInfluencerStatsAction(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InfluencerAccountPopup);
