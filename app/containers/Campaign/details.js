import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { toast } from 'react-toastify';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import styles from './index.styles';
import { makeSelectCampaign } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { fetchCampaignAction, getSelectedCampaignAction } from './actions';
import defaultImage from '../../images/album-3.jpg';
import { columns } from './tableFormatter';
import history from '../../utils/history';
import { CampaignStatus } from '../Requests/constants';

const Details = ({
  match,
  selectedCampaign,
  getSelectedCampaign,
  fetchCampaigns,
}) => {
  useInjectReducer({ key: 'campaign', reducer });
  useInjectSaga({ key: 'campaign', saga });
  React.useEffect(() => {
    if (match.params.id) {
      getSelectedCampaign(match.params.id);
    }
  }, [match.params.id]);

  React.useEffect(() => {
    fetchCampaigns();
    getSelectedCampaign(match.params.id);
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Campaign Details</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={styles.selectedDataParent}>
          <h3>Selected Song:</h3>
          {selectedCampaign && selectedCampaign.song && (
            <div style={{ marginLeft: 10 }}>
              <div style={styles.selectedSongParent}>
                <Image
                  width={100}
                  height={100}
                  src={selectedCampaign.song.artwork || ''}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div style={styles.songInfo}>
                  <div>{selectedCampaign.song.title}</div>
                  <div>{selectedCampaign.song.description}</div>
                  <div>
                    {moment(selectedCampaign.song.releaseDate).format(
                      'DD MMMM YYYY',
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <h3>Influencer:</h3>
      <div style={{ marginTop: 20 }}>
        <BootstrapTable
          striped
          bordered={false}
          bootstrap4
          pagination={paginationFactory()}
          keyField="id"
          data={
            (selectedCampaign && selectedCampaign.campaignInfluencers) || []
          }
          rowEvents={{
            onClick: (e, row) => {
              if (
                row.campaignStatusId === CampaignStatus.COMPLETED ||
                row.campaignStatusId === CampaignStatus.DECLINED ||
                row.campaignStatusId === CampaignStatus.APPROVED
              ) {
                history.push(
                  `/campaigns/${selectedCampaign.id}/influencer/${row.id}`,
                );
              } else if (row.campaignStatusId === CampaignStatus.DECLINED) {
                toast.info('Influencer not completed requested.');
              }
            },
          }}
          columns={columns}
        />
      </div>
    </div>
  );
};

Details.propTypes = {
  match: PropTypes.any,
  selectedCampaign: PropTypes.any,
  getSelectedCampaign: PropTypes.func,
  fetchCampaigns: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedCampaign: makeSelectCampaign(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaigns: () => dispatch(fetchCampaignAction()),
    getSelectedCampaign: id => dispatch(getSelectedCampaignAction(id)),
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
)(Details);
