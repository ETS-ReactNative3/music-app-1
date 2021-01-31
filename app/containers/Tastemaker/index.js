/**
 *
 * Tastemaker
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import {
  faAngleRight,
  faBlog,
  faCheck,
  faCross,
  faSearch,
  faSpellCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Form,
  Image,
  InputGroup,
  Spinner,
  Row,
  Col,
  Card,
  ListGroup,
} from 'react-bootstrap';
import { debounce } from 'lodash';
import { Link, useParams, withRouter } from 'react-router-dom';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import defaultImage from '../../images/album-3.jpg';

import reducer from './reducer';
import saga from './saga';
import { getTasteMakersRequest, removeInfluencerAction } from './actions';
import PaperCard from '../../components/PaperCard';
import {
  makeSelectSelectedInfluencers,
  makeSelectTastemaker,
} from './selectors';
import InfluencerAccountPopup from '../../components/InfluencerAccountPopup';
import { makeSelectLoader } from '../App/selectors';
import appReducer from '../App/reducer';
import {
  makeSelectedSong,
  makeSelectSong,
  makeSelectSongToPromote,
} from '../Song/selectors';
import { getSongRequest } from '../Song/actions';
import songReducer from '../Song/reducer';
import songSaga from '../Song/saga';
import { SOCIAL_MEDIA } from '../App/constants';

export function Tastemaker({
  getTasteMakersAction,
  getSongAction,
  tasteMakers,
  selectedInfluencers,
  removeInfluencer,
  formLoader,
  match,
  selectedSong,
}) {
  useInjectReducer({ key: 'tastemaker', reducer });
  useInjectSaga({ key: 'tastemaker', saga });
  useInjectReducer({ key: 'song', reducer: songReducer });
  useInjectSaga({ key: 'song', saga: songSaga });
  useInjectReducer({ key: 'app', reducer: appReducer });
  useEffect(() => {
    getTasteMakersAction();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState({});
  const [searchText, setSearchText] = React.useState('');
  const [filters, setFilters] = React.useState({
    facebook: false,
    youtube: false,
    blog: false,
    twitter: false,
    instagram: false,
  });

  function handleClose() {
    setOpenModal(false);
  }

  function handleOpen(user) {
    setUserSelected(user);
    setOpenModal(true);
  }

  const getSearchResults = text => {
    setSearchText(text);
    getTasteMakersAction(text, filters);
  };

  React.useEffect(() => {
    getTasteMakersAction(searchText, filters);
  }, [filters]);
  const inputRef = React.createRef();

  useEffect(() => {
    if (match.params.songId) {
      getSongAction(match.params.songId);
    }
  }, [match.params.songId]);

  return (
    <>
      <PaperCard title="Tastemakers">
        <Row className="mt-5">
          <Col md={5} lg={4} xl={3}>
            {/* {selectedInfluencers && selectedInfluencers.length > 0 && (
              <Card className="mb-4 bg-transparent blick-border">
                <ListGroup>
                  <ListGroup.Item className="p-4 bg-transparent border-bottom-primary">
                    <small className="h6 text-success">
                      {`${selectedInfluencers.length} influencers selected`}
                    </small>
                    <div className="my-3 d-flex align-items-center">
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={20}
                        height={20}
                        style={{ marginRight: 5 }}
                      />
                      <span className="h3 mb-0">
                        {`${_calculatePriceForSelectedInfluencers(
                          selectedInfluencers,
                        )}`}
                      </span>
                      price
                    </div>
                    <Link
                      to={{
                        pathname: `/tastemakers/${
                          match.params.songId
                        }/campaign`,
                      }}
                    >
                      <Button
                        disabled={
                          selectedInfluencers &&
                          selectedInfluencers.length === 0
                        }
                        variant="success"
                        style={{ paddingLeft: 15, paddingRight: 15 }}
                        onClick={() => {
                          selectInfluencer({
                            ...innerInfluencer,
                            influencer: {
                              ...innerInfluencer.influencer,
                              price,
                            },
                          });

                          handleClose();
                        }}
                      >
                        View Order{' '}
                        <FontAwesomeIcon size="1x" icon={faAngleRight} />
                      </Button>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )} */}

            <Card className="mb-4 bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="pt-4 bg-transparent">
                  <div className="h5">Campaign Mediums</div>
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 bg-transparent">
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filterFb"
                      onChange={() => {
                        setFilters({ ...filters, facebook: !filters.facebook });
                      }}
                    />
                    <label className="form-check-label" htmlFor="filterFb">
                      Facebook
                    </label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filterTwtr"
                      onChange={() => {
                        setFilters({ ...filters, twitter: !filters.twitter });
                      }}
                    />
                    <label className="form-check-label" htmlFor="filterTwtr">
                      Twitter
                    </label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filterYt"
                      onChange={() => {
                        setFilters({ ...filters, youtube: !filters.youtube });
                      }}
                    />
                    <label className="form-check-label" htmlFor="filterYt">
                      Youtube
                    </label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="filterIg"
                      onChange={() => {
                        setFilters({
                          ...filters,
                          instagram: !filters.instagram,
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="filterIg">
                      Instagram
                    </label>
                  </div>
                  <div className="custom-checkbox">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      onChange={() => {
                        setFilters({ ...filters, blog: !filters.blog });
                      }}
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                      Blog
                    </label>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={7} lg={8} xl={9}>
            <div className="search-input input-group mb-4">
              <input
                className="text-white form-control-lg bg-transparent form-control blick-border border-left-0 border-top-0 border-right-0"
                type="text"
                ref={inputRef}
                onChange={e => {
                  e.persist();
                  searchEnhancer(() => getSearchResults(e.target.value));
                }}
                placeholder="Search here...."
              />
              {searchText.length > 0 && (
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="cursor-pointer"
                      onClick={() => {
                        getSearchResults('');
                        inputRef.target.value = '';
                      }}
                    />
                  </span>
                </div>
              )}
            </div>
            <Row className="mt-5">
              {(!formLoader &&
                tasteMakers.map((item, index) => (
                  <Col md={2} lg={4} key={index}>
                    <Card className="mb-4 bg-transparent blick-border music-card">
                      <Card.Body>
                        <div className="d-flex align-items-center tastemaker__header">
                          <div className="mr-2 flex-grow-1 title">
                            <Card.Title className="text-truncate">
                              {item.name}
                            </Card.Title>
                            <Card.Text className=" music-card__desc">
                              {item.influencer.description}
                            </Card.Text>
                          </div>
                          <Image
                          className="ml-auto"
                            width={50}
                            height={50}
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = defaultImage;
                            }}
                            src={item.avatar}
                            alt=""
                            roundedCircle
                          />
                        </div>
                        <Card.Text className=" music-card__social">
                          {item.influencer.influencerServices &&
                            item.influencer.influencerServices.map(
                              influencerService => {
                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.FACEBOOK
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faFacebook}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.TWITTER
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faTwitter}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.YOUTUBE
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faYoutube}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.INSTAGRAM
                                )
                                  return (
                                    <FontAwesomeIcon
                                      icon={faInstagram}
                                      size="1x"
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.BLOG
                                )
                                  return (
                                    <FontAwesomeIcon
                                      icon={faBlog}
                                      size="1x"
                                      className="mr-2"
                                    />
                                  );
                              },
                            )}
                        </Card.Text>
                        <Card.Text className="music-card__gener">
                          {item.influencer.influencerGenres.map(genre => (
                            <span
                              className="badge badge-pill badge-light  mr-2"
                              key={genre.id}
                            >
                              {genre.genre.title}
                            </span>
                          ))}
                        </Card.Text>
                        <Card.Text key={selectedInfluencers.length}>
                          {selectedInfluencers &&
                          selectedInfluencers.findIndex(
                            influencer => influencer.id === item.id,
                          ) === -1 ? (
                            <Button
                              onClick={() => {
                                handleOpen(item);
                              }}
                              variant="warning"
                            >
                              Add
                            </Button>
                          ) : (
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="text-success">
                                <FontAwesomeIcon size="1x" icon={faCheck} />
                                Added
                              </div>
                              <Button
                                variant="danger"
                                onClick={() => removeInfluencer(item)}
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))) || (
                <Col md={12} className="text-center">
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </PaperCard>
      {selectedInfluencers && selectedInfluencers.length > 0 && (
        <footer className="main-footer fixed-bottom blick-border ">
          <div className="px-3 py-1 d-flex align-items-center justify-content-between">
            <div>
              <small className="text-success">
                {`${selectedInfluencers.length} influencers selected`}
              </small>
              <div className="d-flex align-items-center">
                <img
                  src={PlanSvgColor}
                  alt="PlanSvg"
                  width={15}
                  height={15}
                  style={{ marginRight: 5 }}
                />
                <span className="h5 mb-0">
                  {`${_calculatePriceForSelectedInfluencers(
                    selectedInfluencers,
                  )}`}
                </span>
                 credits
              </div>
            </div>
            <Link
              to={{
                pathname: `/tastemakers/${match.params.songId}/campaign`,
              }}
            >
              <Button
                disabled={
                  selectedInfluencers && selectedInfluencers.length === 0
                }
                variant="success"
                style={{ paddingLeft: 15, paddingRight: 15 }}
                onClick={() => {
                  selectInfluencer({
                    ...innerInfluencer,
                    influencer: {
                      ...innerInfluencer.influencer,
                      price,
                    },
                  });

                  handleClose();
                }}
              >
                View Order <FontAwesomeIcon size="1x" icon={faAngleRight} />
              </Button>
            </Link>
          </div>
        </footer>
      )}
      {openModal && userSelected.hasOwnProperty('id') && (
        <InfluencerAccountPopup
          openModal={openModal}
          handleClose={handleClose}
          userSelected={userSelected}
        />
      )}
      {/* // ======== */}
      {/* <div className="container-fluid" style={{ marginTop: '50px' }}>
        <div className="row album-detail">
          <div className="col pt-3 pt-md-0">
            <div className="row">
              <div
                className="col"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <h1>Tastemakers</h1>
                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    ref={inputRef}
                    onChange={e => {
                      e.persist();
                      searchEnhancer(() => getSearchResults(e.target.value));
                    }}
                    placeholder={'Search here....'}
                    style={{
                      marginTop: 10,
                      width: '90%',
                      flex: 1,
                      marginLeft: 20,
                      marignTop: 10,
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: 'none',
                      borderWidth: 0,
                      outline: 'none',
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      borderStyle: 'solid',
                    }}
                  />
                  {searchText.length > 0 && (
                    <FontAwesomeIcon
                      icon={faTimes}
                      style={{ marginLeft: -10, cursor: 'pointer' }}
                      onClick={() => {
                        getSearchResults('');
                        inputRef.target.value = '';
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    display: 'flex',
                    margin: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginRight: 10,
                    }}
                  >
                    <div>
                      {selectedInfluencers.length + ' influencers selected'}
                    </div>
                    <div>
                      <img
                        src={PlanSvgColor}
                        alt="PlanSvg"
                        width={20}
                        height={20}
                        style={{ marginRight: 5 }}
                      />
                      {_calculatePriceForSelectedInfluencers(
                        selectedInfluencers,
                      ) + ' price'}
                    </div>
                  </div>

                  <Link
                    to={{
                      pathname: `/tastemakers/${match.params.songId}/campaign`,
                    }}
                  >
                    <Button
                      disabled={
                        selectedInfluencers && selectedInfluencers.length === 0
                      }
                      variant="success"
                      style={{ paddingLeft: 15, paddingRight: 15 }}
                      onClick={() => {
                        // selectInfluencer({ ...innerInfluencer, influencer: { ...innerInfluencer.influencer, price: price } })

                        handleClose();
                      }}
                    >
                      View Order{' '}
                      <FontAwesomeIcon size="1x" icon={faAngleRight} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3">
            <div>Campaign Mediums</div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={() => {
                  setFilters({ ...filters, facebook: !filters.facebook });
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Facebook
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck2"
                onChange={() => {
                  setFilters({ ...filters, twitter: !filters.twitter });
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck2">
                Twitter
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck3"
                onChange={() => {
                  setFilters({ ...filters, youtube: !filters.youtube });
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck3">
                Youtube
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck4"
                onChange={() => {
                  setFilters({ ...filters, instagram: !filters.instagram });
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck4">
                Instagram
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck5"
                onChange={() => {
                  setFilters({ ...filters, blog: !filters.blog });
                }}
              />
              <label className="form-check-label" htmlFor="exampleCheck5">
                Blog
              </label>
            </div>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            <div className="row">
              {(!formLoader &&
                tasteMakers.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card bg-dark">
                      <Image
                        width={50}
                        height={200}
                        className="card-img-top"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src = defaultImage;
                        }}
                        src={item.avatar}
                        alt=""
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {item.influencer.description}
                        </h6>
                        <div>
                          {item.influencer.influencerServices &&
                            item.influencer.influencerServices.map(
                              influencerService => {
                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.FACEBOOK
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faFacebook}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.TWITTER
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faTwitter}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.YOUTUBE
                                )
                                  return (
                                    <FontAwesomeIcon
                                      size="1x"
                                      icon={faYoutube}
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.INSTAGRAM
                                )
                                  return (
                                    <FontAwesomeIcon
                                      icon={faInstagram}
                                      size="1x"
                                      className="mr-2"
                                    />
                                  );

                                if (
                                  influencerService.socialChannels.title ===
                                  SOCIAL_MEDIA.BLOG
                                )
                                  return (
                                    <FontAwesomeIcon
                                      icon={faBlog}
                                      size="1x"
                                      className="mr-2"
                                    />
                                  );
                              },
                            )}
                        </div>
                        {item.influencer.influencerGenres.map(genre => (
                          <span
                            className="badge badge-pill badge-light mr-2"
                            key={genre.id}
                          >
                            {genre.genre.title}
                          </span>
                        ))}
                      </div>
                      <div
                        key={selectedInfluencers.length}
                        className="card-footer text-muted"
                      >
                        {selectedInfluencers &&
                        selectedInfluencers.findIndex(
                          influencer => influencer.id === item.id,
                        ) === -1 ? (
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              handleOpen(item);
                            }}
                          >
                            Add
                          </button>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div style={{ color: 'green' }}>
                              <FontAwesomeIcon size="1x" icon={faCheck} />
                              Added
                            </div>
                            <Button
                              variant="danger"
                              onClick={() => removeInfluencer(item)}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))) || (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              )}
            </div>
          </div>
        </div>
        {openModal && userSelected.hasOwnProperty('id') && (
          <InfluencerAccountPopup
            openModal={openModal}
            handleClose={handleClose}
            userSelected={userSelected}
          />
        )}
      </div>
     */}
    </>
  );
}

export const _calculatePriceForSelectedInfluencers = selectedInfluencers => {
  if (selectedInfluencers.length === 1)
    return selectedInfluencers[0].influencer.price;

  let total = 0;
  selectedInfluencers.map(prev => {
    total = prev.influencer.price + total;
  });
  return total;
};

export const searchEnhancer = debounce(fuctionToExecute => {
  fuctionToExecute();
}, 1000);

Tastemaker.propTypes = {
  getTasteMakersAction: PropTypes.func.isRequired,
  selectedInfluencers: PropTypes.array,
  removeInfluencer: PropTypes.func,
  formLoader: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  tasteMakers: makeSelectTastemaker(),
  selectedInfluencers: makeSelectSelectedInfluencers(),
  formLoader: makeSelectLoader(),
  selectedSong: makeSelectedSong(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTasteMakersAction: (searchText, filters) =>
      dispatch(getTasteMakersRequest({ filters, searchText })),
    removeInfluencer: data => dispatch(removeInfluencerAction(data)),
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
)(Tastemaker);
