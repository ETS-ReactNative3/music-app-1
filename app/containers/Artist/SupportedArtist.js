import React, { memo } from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PaperCard from '../../components/PaperCard';
import { fetchSupportedArtistAction } from './actions';
import { makeSelectArtistFetching, makeSelectSupportedArtist } from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {connect} from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

const SupportedArtist = ({ fetchSupportedArtist, fetching, supportedArtistData }) => {

    useInjectReducer({ key: 'artist', reducer });
  useInjectSaga({ key: 'artist', saga });
    React.useEffect(() => {
        fetchSupportedArtist();
    }, [])

    const columns = [
        {
          dataField: 'name',
          text: 'Beneficiary Name',
          style: {
            width: '30%',
            textAlign: 'left'
          },
          headerStyle: {
            width: '30%',
            textAlign: 'left'
          }
        },
        // {
        //   dataField: 'amount',
        //   text: 'Amount',
        //   style: {
        //     width: '20%',
        //     textAlign: 'left'
        //   },
        //   headerStyle: {
        //     width: '20%',
        //     textAlign: 'left'
        //   }
        // },
        // {
        //   dataField: 'influencerWithdrawalStatus.name',
        //   text: 'Status',
        //   style: {
        //     width: '25%',
        //     textAlign: 'left'
        //   },
        //   headerStyle: {
        //     width: '25%',
        //     textAlign: 'left'
        //   }
        // },
        // {
        //   dataField: 'createdDate',
        //   text: 'Created Date',
        //   formatter: dateFormatter,
        //   style: {
        //     width: '25%',
        //     textAlign: 'left'
        //   },
        //   headerStyle: {
        //     width: '25%',
        //     textAlign: 'left'
        //   },
        // },
      ];
    return (
        <>
            {fetching ? <LoadingIndicator /> :
                <PaperCard title={"Supported Artist"}>
                    <BootstrapTable
                        striped
                        bordered={false}
                        bootstrap4
                        pagination={paginationFactory()}
                        keyField="id"
                        data={supportedArtistData}
                        columns={columns}
                    />
                </PaperCard>}
        </>
    )
}


SupportedArtist.propTypes = {
    fetchSupportedArtist: PropTypes.func,
    fetching: PropTypes.bool,
    supportedArtistData: PropTypes.array
};

const mapStateToProps = createStructuredSelector({
    fetching: makeSelectArtistFetching(),
    supportedArtistData: makeSelectSupportedArtist()

});

function mapDispatchToProps(dispatch) {
    return {
        fetchSupportedArtist: () => dispatch(fetchSupportedArtistAction())
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(SupportedArtist);
