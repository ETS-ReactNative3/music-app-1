/**
 *
 * Playlist
 *
 */
import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Tab, Tabs} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import reducer from './reducer';
import influencerReducer from '../Influencer/reducer';
import influencerSaga from '../Influencer/saga';
import saga from './saga';
import {
  makeSelectApprovedRequestList,
  makeSelectCompletedRequestList,
  makeSelectDeclinedRequestList,
  makeSelectInProgressRequestList,
  makeSelectNewRequestList,
} from './selectors';
import {declineRequestColumn, newRequestColumns} from './utils';
import RequestPopup from './RequestPopup';
import {
  fetchRequestsAction,
  submitFeedbackRequestAction,
  submitSocialLinksAction,
  updateCampaignStatusAction,
} from './actions';
import {getSocialChannelsRequest} from '../Influencer/actions';
import {makeSelectSocialChannels} from '../Influencer/selectors';
import {handleSingleSong, setPlaylist} from '../App/actions';

function RequestListing(
  {
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
    approvedRequestList,
    declinedRequestList,
  }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  useInjectSaga({key: 'request', saga});
  useInjectReducer({key: 'request', reducer});
  useInjectReducer({key: 'influencer', reducer: influencerReducer});
  useInjectSaga({key: 'influencer', saga: influencerSaga});

  useEffect(() => {
    fetchRequests();
    getSocialChannelList();
  }, []);

  const renderTable = (data, columns) => (
    <BootstrapTable
      striped
      hover
      bordered={false}
      bootstrap4
      pagination={paginationFactory()}
      keyField="id"
      data={data}
      noDataIndication={() => (<div>No Requests available</div>)}
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
    setPlaylistAction([{song}]);
    onHandleSingleSong(song.id, true);
  };

  function handleClose() {
    fetchRequests();
    setOpenModal(false);
  }

  return (
    <PaperCard title="Requests">
      <Tabs
        defaultActiveKey="new"
        id="uncontrolled-tab-example"
        className="mt-4"
      >
        <Tab eventKey="new" title="New" className="tab-style table-cursor">
          {renderTable(newRequestList, newRequestColumns)}
        </Tab>
        <Tab
          eventKey="accepted"
          title="Accepted/In-progress"
          className="tab-style table-cursor"
        >
          {renderTable(inProgressRequestList, newRequestColumns)}
        </Tab>
        <Tab
          eventKey="completed"
          title="Completed"
          className="tab-style table-cursor"
        >
          {renderTable(completedRequestList, newRequestColumns)}
        </Tab>
        <Tab
          eventKey="approved"
          title="Approved"
          className="tab-style table-cursor"
        >
          {renderTable(approvedRequestList, newRequestColumns)}
        </Tab>
        <Tab
          eventKey="declined"
          title="Declined"
          className="tab-style table-cursor"
        >
          {renderTable(declinedRequestList, declineRequestColumn)}
        </Tab>
      </Tabs>
      <Modal
        show={openModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Request</Modal.Title>
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
    </PaperCard>
  );
}

RequestListing.propTypes = {
  newRequestList: PropTypes.array,
  inProgressRequestList: PropTypes.array,
  completedRequestList: PropTypes.array,
  approvedRequestList: PropTypes.array,
  declinedRequestList: PropTypes.array,
  updateCampaignStatus: PropTypes.func,
  setPlaylistAction: PropTypes.func,
  onHandleSingleSong: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  newRequestList: makeSelectNewRequestList(),
  inProgressRequestList: makeSelectInProgressRequestList(),
  completedRequestList: makeSelectCompletedRequestList(),
  socialChannels: makeSelectSocialChannels(),
  approvedRequestList: makeSelectApprovedRequestList(),
  declinedRequestList: makeSelectDeclinedRequestList()
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
