import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import {makeSelectSong} from './selectors';
import {deleteSong, songRequest} from './actions';
import reducer from './reducer';
import saga from './saga';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from "react-bootstrap/Button";

function SongList({getSongs, songs, deleteSongAction}) {
  useInjectReducer({key: 'song', reducer});
  useInjectSaga({key: 'song', saga});

  const [songId, setSongId] = useState(0);

  useEffect(() => {
    getSongs();
  }, []);

  const [open, setOpen] = React.useState(false);
  const columns = [{
    dataField: 'title',
    text: 'User ID'
  }, {
    dataField: 'description',
    text: 'User Name'
  }, {
    dataField: 'genreId',
    text: 'Phone'
  }, {
    dataField: 'releaseDate',
    text: 'City'
  }];

  function handleClickOpen(id) {
    setSongId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteSongCall() {
    deleteSongAction(songId);
    setOpen(false);
    setSongId(0);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <Link to="/song/add">
            <Button variant="success">Add Song</Button>
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <BootstrapTable
            striped
            hover
            bordered={false}
            bootstrap4
            pagination={paginationFactory()}
            keyField='id'
            data={songs}
            columns={columns}/>
          <div className="ag-theme-alpine" style={{height: 500, width: 1000}}>
            <AgGridReact rowData={songs} pagination={true} paginationPageSize={10}>
              <AgGridColumn field="title"/>
              <AgGridColumn field="description"/>
              <AgGridColumn field="genreId"/>
              <AgGridColumn field="releaseDate"/>
              <AgGridColumn headerName="Edit"/>

            </AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
}

SongList.propTypes = {
  getSongs: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  deleteSongAction: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  songs: makeSelectSong(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSongs: () => {
      dispatch(songRequest());
    },
    deleteSongAction: id => dispatch(deleteSong(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SongList);
