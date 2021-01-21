import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from 'prop-types';
import { useInjectReducer } from '../../utils/injectReducer';
import { fetchCampaignAction } from './actions';
import { makeSelectCampaigns } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { pictureFormatter, dateFormatter } from '../Requests/utils';
import history from '../../utils/history';

const List = ({ fetchCampaigns, campaigns }) => {
  useInjectReducer({ key: 'tastemaker', reducer });
  useInjectSaga({ key: 'campaign', saga });
  React.useEffect(() => {
    fetchCampaigns();
  }, []);

  const columns = [
    {
      dataField: '',
      text: '#',
      formatter: pictureFormatter,
      style: {
        width: '10%',
      },
      headerStyle: {
        textAlign: 'left',
      },
    },
    {
      dataField: 'song.title',
      text: 'Song name',
    },
    {
      dataField: 'song.description',
      text: 'Description',
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
    },
  ];
  return (
    <div style={{ marginTop: 20 }}>
      <BootstrapTable
        striped
        bordered={false}
        bootstrap4
        pagination={paginationFactory()}
        keyField="id"
        data={campaigns}
        rowEvents={{
          onClick: (e, row, rowIndex) => {
            history.push(`/campaigns/${row.id}`);
          },
        }}
        columns={columns}
      />
    </div>
  );
};

List.propTypes = {
  fetchCampaigns: PropTypes.func,
  campaigns: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  campaigns: makeSelectCampaigns(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaigns: () => dispatch(fetchCampaignAction()),
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
)(List);
