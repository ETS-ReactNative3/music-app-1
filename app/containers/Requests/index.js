/**
 *
 * Playlist
 *
 */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import influencerReducer from '../Influencer/reducer';
import influencerSaga from '../Influencer/saga';
import saga from './saga';
import { style1 } from './index.styles';
import {
  makeSelectCompletedRequestList,
  makeSelectInProgressRequestList,
  makeSelectNewRequestList,
} from './selectors';
import { newRequestColumns } from './utils';
import RequestPopup from './RequestPopup';
import {
  fetchRequestsAction,
  submitFeedbackRequestAction,
  submitSocialLinksAction,
  updateCampaignStatusAction,
} from './actions';
import { getSocialChannelsRequest } from '../Influencer/actions';
import { makeSelectSocialChannels } from '../Influencer/selectors';
import { handleSingleSong, setPlaylist } from '../App/actions';

function RequestListing({
  newRequestList,
  inProgressRequestList,
  completedRequestList,
  fetchRequests,
  updateCampaignStatus,
  submitFeedbackRequest,
  submitSocialLinksRequest,
  getSocialChannelList,
  socialChannels,
  setPlaylistAction,
  onHandleSingleSong,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  useInjectSaga({ key: 'request', saga });
  useInjectReducer({ key: 'request', reducer });
  useInjectReducer({ key: 'influencer', reducer: influencerReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });

  useEffect(() => {
    fetchRequests();
    getSocialChannelList();
  }, []);

  const renderTable = (data, columns) => (
    <BootstrapTable
      striped
      bordered={false}
      bootstrap4
      pagination={paginationFactory()}
      keyField="id"
      data={data}
      rowEvents={{
        onClick: (e, row, rowIndex) => {
          setSelectedRow(row);
          setOpenModal(true);
        },
      }}
      columns={columns}
    />
  );

  const playSong = song => {
    setPlaylistAction([{ song }]);
    onHandleSingleSong(0, true);
  };

  function handleClose() {
    fetchRequests();
    setOpenModal(false);
  }

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Requests</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs
          defaultActiveKey="new"
          id="uncontrolled-tab-example"
          style={style1}
          className="check"
        >
          <Tab eventKey="new" title="New" className="tab-style">
            {renderTable(newRequestList, newRequestColumns)}
          </Tab>
          <Tab
            eventKey="accepted"
            title="Accepted/In-progress"
            className="tab-style"
          >
            {renderTable(inProgressRequestList, newRequestColumns)}
          </Tab>
          <Tab
            eventKey="completed"
            title="Completed/Approved"
            className="tab-style"
          >
            {renderTable(completedRequestList, newRequestColumns)}
          </Tab>
        </Tabs>
      </div>

      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
            <div>Request</div>
          </div>
        </Modal.Header>
        <RequestPopup
          handleClose={handleClose}
          socialChannels={socialChannels}
          data={selectedRow}
          updateCampaignStatus={updateCampaignStatus}
          playSong={playSong}
          submitFeedbackRequest={submitFeedbackRequest}
          submitSocialLinksRequest={submitSocialLinksRequest}
        />
      </Modal>
    </div>
  );
}

RequestListing.propTypes = {
  newRequestList: PropTypes.array,
  inProgressRequestList: PropTypes.array,
  completedRequestList: PropTypes.array,
  updateCampaignStatus: PropTypes.func,
  setPlaylistAction: PropTypes.func,
  onHandleSingleSong: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newRequestList: makeSelectNewRequestList(),
  inProgressRequestList: makeSelectInProgressRequestList(),
  completedRequestList: makeSelectCompletedRequestList(),
  socialChannels: makeSelectSocialChannels(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchRequests: () => dispatch(fetchRequestsAction()),
    updateCampaignStatus: (campaignId, statusId) =>
      dispatch(updateCampaignStatusAction(campaignId, statusId)),
    submitFeedbackRequest: (campaignId, influencerId, feedback) =>
      dispatch(submitFeedbackRequestAction(campaignId, influencerId, feedback)),
    submitSocialLinksRequest: data => dispatch(submitSocialLinksAction(data)),
    getSocialChannelList: () => dispatch(getSocialChannelsRequest()),
    setPlaylistAction: songs => dispatch(setPlaylist(songs)),
    onHandleSingleSong: (index, status) =>
      dispatch(handleSingleSong(index, status)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RequestListing);
