import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import format from 'date-fns/format';
import PaperCard from '../../components/PaperCard';
import saga from './saga';
import reducer from './reducer';
import { deleteAlbum, getMyAlbumsRequest } from './actions';
import { makeSelectMyAlbums } from './selectors';

function AlbumList({ getMyAlbums, myAlbums, deleteAlbumCall }) {
  const [albumId, setAlbumId] = useState(0);

  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'album', saga });

  useEffect(() => {
    getMyAlbums();
  }, []);

  const [open, setOpen] = useState(false);

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
    {
      dataField: 'caption',
      text: 'Caption',
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
    {
      dataField: 'genre.title',
      text: 'Genre',
      style: {
        width: '20%',
      },
      headerStyle: {
        width: '20%',
      },
    },
    {
      dataField: 'releaseDate',
      text: 'Release Date',
      formatter: dateFormatter,
      style: {
        width: '15%',
      },
      headerStyle: {
        width: '15%',
      },
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
      style: {
        width: '15%',
      },
      headerStyle: {
        width: '15%',
        textAlign: 'center'
      },
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.releaseDate), 'MM/dd/yyyy');
  }

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
        }}
      >
        <Link to={`/album/edit/${row.id}`}>
          <button className="btn btn-info mr-3">
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </Link>
        <button
          className="btn btn-danger"
          onClick={() => handleClickOpen(row.id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    );
  }

  function handleClickOpen(id) {
    setAlbumId(id);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function deleteAlbumAction() {
    deleteAlbumCall(albumId);
    setOpen(false);
    setAlbumId(0);
  }

  return (
    <PaperCard title="Album List">
      <div className="row pb-5">
        <div className="col">
          <Link to="/album/add">
            <Button variant="success">Add Album</Button>
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
            keyField="id"
            data={myAlbums}
            columns={columns}
          />
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
        <Modal.Body>Are you sure you want to delete the album?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteAlbumAction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  );
}

AlbumList.propTypes = {
  getMyAlbums: PropTypes.func.isRequired,
  myAlbums: PropTypes.array.isRequired,
  deleteAlbumCall: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myAlbums: makeSelectMyAlbums(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMyAlbums: () => {
      dispatch(getMyAlbumsRequest());
    },
    deleteAlbumCall: id => dispatch(deleteAlbum(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AlbumList);
