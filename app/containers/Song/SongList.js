import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {makeSelectSong} from './selectors';
import {deleteSong, songRequest} from './actions';
import reducer from './reducer';
import saga from './saga';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from "react-bootstrap/Button";
import PaperCard from "../../components/PaperCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";

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
    text: 'Title'
  }, {
    dataField: 'description',
    text: 'Description'
  }, {
    dataField: 'genreId',
    text: 'Genre'
  }, {
    dataField: 'releaseDate',
    text: 'Release Date'
  }, {
    dataField: 'actions',
    text: 'Actions',
    isDummyField: true,
    csvExport: false,
    formatter: actionsFormatter,
  }];

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: "center",
          cursor: "pointer",
          lineHeight: "normal"
        }}>
        <Link to={`/song/edit/${row.id}`}>
          <button className="btn btn-info mr-3">
            <FontAwesomeIcon icon={faEdit}/>
          </button>
        </Link>
        <button className="btn btn-danger" onClick={() => handleClickOpen(row.id)}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    );
  }

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
    <PaperCard title="Song List">
      <div className="row pb-5">
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
            bordered={false}
            bootstrap4
            pagination={paginationFactory()}
            keyField='id'
            data={songs}
            columns={columns}/>
        </div>
      </div>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the song?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteSongCall}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
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
