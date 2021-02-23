/**
 *
 * Influencer
 *
 */

import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faBan, faBlog} from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import LoadingIndicator from '../../components/LoadingIndicator';
import PaperCard from '../../components/PaperCard';
import saga from './saga';
import reducer from './reducer';
import {makeSelectLoader, makeSelectRequests} from './selectors';
import {getInfluencerRequests, updateInfluencerStatus} from './actions';
import {PLAY_ICON_BG_COLOR} from "../../utils/constants";
import {faFacebook, faInstagram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

export function Requests(
  {
    getRequests,
    influencerRequests,
    loader,
    updateInfluencerStatusAction,
  }) {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [influencer, setInfluencer] = useState(null);

  useInjectReducer({key: 'influencer', reducer});
  useInjectSaga({key: 'influencer', saga});

  useEffect(() => {
    getRequests();
  }, []);

  const columns = [
    {
      dataField: 'name',
      text: 'Name',
      style: {
        width: '20%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left'
      },
    },
    {
      dataField: 'description',
      text: 'Description',
      style: {
        width: '50%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '50%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'influencerStatus.title',
      text: 'Status',
      style: {
        width: '10%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
      style: {
        width: '20%',
      },
      headerStyle: {
        width: '20%',
        textAlign: 'center',
      },
    },
  ];

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
        }}
      >
        <button
          className="btn btn-success mr-3"
          onClick={() => openApprovalModal(row)}
        >
          <FontAwesomeIcon icon={faCheckCircle}/>
        </button>
        <button className="btn btn-danger" onClick={() => openRejectModal(row)}>
          <FontAwesomeIcon icon={faBan}/>
        </button>
      </div>
    );
  }

  function openRejectModal(data) {
    setInfluencer(data);
    setRejectOpen(true);
  }

  function openApprovalModal(data) {
    setInfluencer(data);
    setApprovalOpen(true);
  }

  function handleRejectClose() {
    setRejectOpen(false);
  }

  function handleApprovalClose() {
    setApprovalOpen(false);
  }

  function rejectInfluencer() {
    updateInfluencerStatusAction({id: influencer.id, influencerStatusId: 1});
    setInfluencer(null);
    setRejectOpen(false);
  }

  function approveInfluencer() {
    updateInfluencerStatusAction({id: influencer.id, influencerStatusId: 2});
    setInfluencer(null);
    setApprovalOpen(false);
  }

  return (
    <PaperCard title="Tastemakers Requests">
      <div className="row">
        <div className="col">
          {loader || !influencerRequests ? (
            <LoadingIndicator/>
          ) : (
            <BootstrapTable
              striped
              bordered={false}
              bootstrap4
              pagination={paginationFactory()}
              keyField="id"
              data={influencerRequests}
              columns={columns}
            />
          )}
        </div>
      </div>
      <Modal
        show={rejectOpen}
        onHide={handleRejectClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reject</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to reject the request?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleRejectClose}>
            No
          </Button>
          <Button variant="primary" onClick={rejectInfluencer}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={approvalOpen}
        onHide={handleApprovalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Approve Influencer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {influencer && (
            <>
              <div className="bio">
                <h3>Name</h3>
                <p>{influencer.name}</p>
                <h3>Bio</h3>
                <p>{influencer.description}</p>
                <h3>How can you help artists</h3>
                <p>{influencer.helpArtistDescription}</p>
              </div>
              <div className="genres">
                <h3>Genres</h3>
                {influencer.influencerGenres.map(item => (
                  <Badge pill variant="warning" key={item.genre.id}>
                    {item.genre.title}
                  </Badge>
                ))}
              </div>
              <div className="services">
                <h3>Services</h3>
                <div className="mb-3">
                  <div>
                    {influencer && influencer.influencerServices &&
                    influencer.influencerServices.map(service => {
                      switch (service.socialChannels.title) {
                        case 'facebook':
                          return (
                            <div key={service.id}>
                              <a href={service.link} target="_blank" className="pr-2">
                                <FontAwesomeIcon
                                  size="1x"
                                  color={PLAY_ICON_BG_COLOR}
                                  icon={faFacebook}
                                  style={{marginLeft: 5}}
                                />
                                <span className="pl-2">{service.followers} followers</span>
                              </a> | Price: {service.price} credits
                            </div>
                          );
                        case 'twitter':
                          return (
                            <div key={service.id}>
                              <a href={service.link} target="_blank" className="pr-2">
                                <FontAwesomeIcon
                                  size="1x"
                                  color={PLAY_ICON_BG_COLOR}
                                  icon={faTwitter}
                                  style={{marginLeft: 5}}
                                />
                                <span className="pl-2">{service.followers} followers</span>
                              </a> | Price: {service.price} credits
                            </div>
                          );
                        case 'instagram':
                          return (
                            <div key={service.id}>
                              <a href={service.link} target="_blank" className="pr-2">
                                <FontAwesomeIcon
                                  size="1x"
                                  color={PLAY_ICON_BG_COLOR}
                                  icon={faInstagram}
                                  style={{marginLeft: 5}}
                                />
                                <span className="pl-2">{service.followers} followers</span>
                              </a> | Price: {service.price} credits
                            </div>
                          );
                        case 'blog':
                          return (
                            <div key={service.id}>
                              <a href={service.link} target="_blank" className="pr-2">
                                <FontAwesomeIcon
                                  size="1x"
                                  color={PLAY_ICON_BG_COLOR}
                                  icon={faBlog}
                                  style={{marginLeft: 5}}
                                />
                                <span className="pl-2">{service.followers} followers</span>
                              </a> | Price: {service.price} credits
                            </div>
                          );
                        case 'youtube':
                          return (
                            <div key={service.id}>
                              <a href={service.link} target="_blank" className="pr-2">
                                <FontAwesomeIcon
                                  size="1x"
                                  color={PLAY_ICON_BG_COLOR}
                                  icon={faYoutube}
                                  style={{marginLeft: 5}}
                                />
                                <span className="pl-2">{service.followers} followers</span>
                              </a> | Price: {service.price} credits
                            </div>
                          );
                      }
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleApprovalClose}>
            No
          </Button>
          <Button variant="primary" onClick={approveInfluencer}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  );
}

Requests.propTypes = {
  getRequests: PropTypes.func,
  influencerRequests: PropTypes.any,
  loader: PropTypes.bool,
  updateInfluencerStatusAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  influencerRequests: makeSelectRequests(),
  loader: makeSelectLoader(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequests: () => dispatch(getInfluencerRequests()),
    updateInfluencerStatusAction: data =>
      dispatch(updateInfluencerStatus(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Requests);
