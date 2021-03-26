/**
 *
 * Tastemaker
 *
 */

import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Multiselect} from 'multiselect-react-dropdown';
import {
  faAngleRight,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Image,
  Spinner,
  Row,
  Col,
  Card,
  ListGroup,
} from 'react-bootstrap';
import {debounce} from 'lodash';
import {Link, withRouter} from 'react-router-dom';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import defaultImage from '../../images/user.svg';

import reducer from './reducer';
import saga from './saga';
import {getTasteMakersRequest, removeInfluencerAction} from './actions';
import PaperCard from '../../components/PaperCard';
import {
  makeSelectSelectedInfluencers,
  makeSelectTastemaker,
} from './selectors';
import InfluencerAccountPopup from '../../components/InfluencerAccountPopup';
import {makeSelectLoader, makeSelectPlaylist} from '../App/selectors';
import appReducer from '../App/reducer';
import {
  makeSelectedSong,
} from '../Song/selectors';
import {getSongRequest} from '../Song/actions';
import songReducer from '../Song/reducer';
import songSaga from '../Song/saga';
import {getGenres} from '../Album/actions';
import albumSaga from '../Album/saga';
import albumReducer from '../Album/reducer';
import {capatilizeText, renderSocialMediaIcons} from '../../utils';
import {getSocialChannelsRequest} from '../Influencer/actions';
import {makeSelectSocialChannels} from '../Influencer/selectors';
import influencerSaga from '../Influencer/saga';
import influencerReducer from '../Influencer/reducer';
import {makeSelectGenres} from '../Album/selectors';

export function Tastemaker(
  {
    getTasteMakersAction,
    getSongAction,
    tasteMakers,
    selectedInfluencers,
    removeInfluencer,
    formLoader,
    match,
    selectedSong,
    getGenreList,
    getPlaylist,
    getSocialChannelList,
    socialChannels,
    genres
  }) {
  useInjectReducer({key: 'tastemaker', reducer});
  useInjectSaga({key: 'tastemaker', saga});
  useInjectReducer({key: 'song', reducer: songReducer});
  useInjectSaga({key: 'song', saga: songSaga});
  useInjectReducer({key: 'app', reducer: appReducer});
  useInjectSaga({key: 'influencer', saga: influencerSaga});
  useInjectReducer({key: 'influencer', reducer: influencerReducer});
  useInjectSaga({key: 'album', saga: albumSaga});
  useInjectReducer({key: 'album', reducer: albumReducer});

  useEffect(() => {
    getTasteMakersAction();
    getGenreList();
    getSocialChannelList();
  }, []);

  const [openModal, setOpenModal] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState({});
  const [searchText, setSearchText] = React.useState('');
  const [filters, setFilters] = React.useState([]);
  const [genresFilter, setGenresFilter] = React.useState([]);

  function handleClose() {
    setOpenModal(false);
  }

  function handleOpen(user) {
    setUserSelected(user);
    setOpenModal(true);
  }

  const getSearchResults = text => {
    setSearchText(text);
    getTasteMakersAction(text, filters, genresFilter);
  };

  useEffect(() => {
    getTasteMakersAction(searchText, filters, genresFilter);
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
            <div className="genreFilter mb-3">
              <Multiselect
                displayValue="title"
                placeholder="Filter by genre"
                style={{
                  flex: 1,
                  chips: {background: 'green'},
                  optionContainer: {
                    color: 'black',
                  },
                  searchBox: {
                    color: 'white',
                  },
                  inputField: {
                    // To change input field position or margin
                    color: 'white',
                  },
                }}
                options={genres} // Options to display in the dropdown
                selectedValues={genresFilter}
                onSelect={(selectedList, selectedItem) => {
                  getTasteMakersAction(searchText, filters, selectedList);
                  setGenresFilter(selectedList);
                }}
                onRemove={(selectedList, selectedItem) => {
                  getTasteMakersAction(searchText, filters, selectedList);
                  setGenresFilter(selectedList);
                }}
              />
            </div>
            <Card className="mb-4 bg-transparent blick-border">
              <ListGroup>
                <ListGroup.Item className="pt-4 bg-transparent">
                  <div className="h5">Campaign Mediums</div>
                </ListGroup.Item>
                <ListGroup.Item className="pb-4 bg-transparent">
                  {socialChannels && socialChannels.map(channel => (
                    <div className="custom-checkbox" key={channel.id}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={channel.id}
                        onChange={() => {
                          if (filters.includes(channel.id)) {
                            setFilters([...filters.filter(filter => filter !== channel.id)])
                          } else {
                            setFilters([...filters, channel.id]);
                          }
                        }}
                      />
                      <label className="form-check-label" htmlFor={channel.id}>
                        {capatilizeText(channel.title)}
                      </label>
                    </div>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
          <Col md={7} lg={8} xl={9}>
            <div className="search-input input-group mb-4" style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{flex: 1}}><input
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
            </div>
            <Row className="mt-5">
              {(!formLoader &&
                tasteMakers.map((item, index) => (
                  <Col md={2} lg={4} key={index}>
                    <Card className="mb-4 bg-transparent blick-border music-card">
                      <Card.Body>
                        <div className="d-flex align-items-center tastemaker__header">
                          <div className="mr-2 flex-grow-1 title">
                            <Card.Title className="text-truncate cursor-pointer" onClick={() => {
                              handleOpen(item);
                            }}>
                              {item.influencer.name}
                            </Card.Title>
                            <Card.Text className=" music-card__desc">
                              {item.influencer.description}
                            </Card.Text>
                          </div>
                          <Image
                            className="ml-auto cursor-pointer"
                            width={50}
                            height={50}
                            onError={e => {
                              e.target.onerror = null;
                              e.target.src = defaultImage;
                            }}
                            src={item.avatar}
                            alt=""
                            roundedCircle
                            onClick={() => {
                              handleOpen(item);
                            }}
                          />
                        </div>
                        <Card.Text className=" music-card__social">
                          {item.influencer.influencerServices &&
                          item.influencer.influencerServices.map(
                            (influencerService, index) => {

                              return (
                                <a key={index} target={'_blank'}
                                   href={(influencerService.link.includes('https') || influencerService.link.includes('http')) ? influencerService.link : `https://${influencerService.link}`}
                                   style={{color: "white"}}>
                                  {renderSocialMediaIcons(influencerService.socialChannels.title)}
                                </a>
                              );
                            }
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
                                <FontAwesomeIcon size="1x" icon={faCheck}/>
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
        <footer
          className={`main-footer fixed-bottom blick-border ${getPlaylist.length > 0 ? "footer-extra-padding" : ""}`}>
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
                  style={{marginRight: 5}}
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
                style={{paddingLeft: 15, paddingRight: 15}}
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
                View Order <FontAwesomeIcon size="1x" icon={faAngleRight}/>
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
  getGenreList: PropTypes.func,
  socialChannels: PropTypes.array,
  getSocialChannelList: PropTypes.func,
  genres: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  tasteMakers: makeSelectTastemaker(),
  selectedInfluencers: makeSelectSelectedInfluencers(),
  formLoader: makeSelectLoader(),
  selectedSong: makeSelectedSong(),
  getPlaylist: makeSelectPlaylist(),
  socialChannels: makeSelectSocialChannels(),
  genres: makeSelectGenres()
});

function mapDispatchToProps(dispatch) {
  return {
    getTasteMakersAction: (searchText, filters, genresFilter) =>
      dispatch(getTasteMakersRequest({filters, searchText, genresFilter})),
    removeInfluencer: data => dispatch(removeInfluencerAction(data)),
    getSongAction: id => dispatch(getSongRequest(id)),
    getGenreList: () => dispatch(getGenres()),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
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
