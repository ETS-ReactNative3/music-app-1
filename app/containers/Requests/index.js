/**
 *
 * Playlist
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tab, Tabs } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { combineFollowers } from '../../utils';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { style1, style2 } from './index.styles';
import { makeSelectCompletedRequestList, makeSelectInProgressRequestList, makeSelectNewRequestList, makeSelectRequestList } from './selectors';
import { newRequestColumns } from './utils';
import RequestPopup from './RequestPopup';
import { fetchRequestsAction } from './actions';

function RequestListing({
  newRequestList, inProgressRequestList, completedRequestList, fetchRequests
}) {

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({});
  useInjectSaga({ key: 'request', saga });
  useInjectReducer({ key: 'request', reducer });

  React.useEffect(() => {
    fetchRequests()
  }, []);

  const renderTable = (data, columns) => {
    return (
      <BootstrapTable
        striped
        bordered={false}
        bootstrap4
        pagination={paginationFactory()}
        keyField='id'
        data={data}
        rowEvents={{
          onClick: (e, row, rowIndex) => {
              setSelectedRow(row);
              setOpenModal(true);
          },

        }}
        columns={columns} />

    )
  }

  function handleClose() {
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
        <Tabs defaultActiveKey="new" id="uncontrolled-tab-example" style={style1} className="check">
          <Tab eventKey="new" title="New" className="tab-style" >
            {renderTable(newRequestList, newRequestColumns)}
          </Tab>
          <Tab eventKey="accepted" title="Accepted/In-progress" className="tab-style">
            {renderTable(inProgressRequestList, newRequestColumns)}
          </Tab>
          <Tab eventKey="completed" title="Completed/Approved" className="tab-style">
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
            <div>Influencer Account</div>
          </div>
        </Modal.Header>
        <RequestPopup data={selectedRow}/>
      </Modal>
    </div>
  );
}

RequestListing.propTypes = {
  newRequestList: PropTypes.array,
  inProgressRequestList: PropTypes.array,
  completedRequestList: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
  newRequestList: makeSelectNewRequestList(),
  inProgressRequestList: makeSelectInProgressRequestList(),
  completedRequestList: makeSelectCompletedRequestList()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchRequests: () => dispatch(fetchRequestsAction())
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
