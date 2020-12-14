import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { makeSelectSong } from './selectors';
import { deleteSong, songRequest } from './actions';
import reducer from './reducer';
import saga from './saga';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function SongList({ getSongs, songs, deleteSongAction }) {
  useInjectReducer({ key: 'song', reducer });
  useInjectSaga({ key: 'song', saga });

  const [songId, setSongId] = useState(0);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 },
  ]);

  useEffect(() => {
    getSongs();
  }, []);

  const [open, setOpen] = React.useState(false);

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
    <div className="ag-theme-alpine" style={{ height: 400, width: 1000 }}>
      <AgGridReact rowData={songs}>
        <AgGridColumn field="title" />
        <AgGridColumn field="description" />
        <AgGridColumn field="genreId" />
        <AgGridColumn field="releaseDate" />
        <AgGridColumn field="releaseDate" />
      </AgGridReact>
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
