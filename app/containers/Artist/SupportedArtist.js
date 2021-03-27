import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PaperCard from '../../components/PaperCard';
import {fetchSupportedArtistAction} from './actions';
import {makeSelectArtistFetching, makeSelectSupportedArtist} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import defaultImage from '../../images/album-1.jpg';
import {Image} from 'react-bootstrap';

const SupportedArtist = ({fetchSupportedArtist, fetching, supportedArtistData}) => {
  useInjectReducer({key: 'artist', reducer});
  useInjectSaga({key: 'artist', saga});

  useEffect(() => {
    fetchSupportedArtist();
  }, [])

  function pictureFormatter(cell, row) {
    if (row && row.artist && row.artist.artwork) {
      return (
        <span>
              <Image
                src={row.artist.artwork}
                style={{width: 40, height: 40, borderRadius: 20}}
              />
            </span>
      );
    }

    return (
      <Image
        src={defaultImage}
        style={{width: 40, height: 40, borderRadius: 20}}
      />
    )
  }

  const columns = [
    {
      dataField: '',
      text: '#',
      formatter: pictureFormatter,
      style: {
        width: '10%',
      },
      headerStyle: {
        width: '10%',
        textAlign: 'left',
      },
    },
    {
      dataField: 'artist.name',
      text: 'Artist Name',
      style: {
        width: '30%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '30%',
        textAlign: 'left'
      }
    },

  ];
  return (
    <>
      {fetching ? <LoadingIndicator/> :
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
