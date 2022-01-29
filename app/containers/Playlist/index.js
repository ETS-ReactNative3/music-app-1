/**
 *
 * Playlist
 *
 */

import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Form} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {
  createPlaylist,
  deletePlaylist,
  getMyPlaylist,
  togglePlaylistPopup, toggleUpdatePlaylistPopup, updatePlaylist,
} from './actions';
import PaperCard from '../../components/PaperCard';
import saga from './saga';
import reducer from './reducer';
import {makeSelectPlaylistPopUpState, makeSelectPlaylists, makeSelectUpdateModalStatus} from './selectors';

export function Playlist(
  {
    createPlaylistAction,
    togglePlaylistPopupAction,
    popupState,
    getMyPlaylistAction,
    playlists,
    deletePlaylistAction,
    updatePlaylistAction,
    toggleUpdatePlaylistPopupAction,
    updatePopupState
  }
) {
  useInjectReducer({key: 'playlist', reducer});
  useInjectSaga({key: 'playlist', saga});

  const [open, setOpen] = useState(false);
  const [playlistId, setPlaylistId] = useState(0);
  const [playlistTitle, setPlaylistTitle] = useState('');

  const validationSchema = Yup.object().shape({
    title: Yup.string()

    .required('Title is required')
    .test('space', 'Title is required', val => { return val.trim().toString().length > 0 })
    .test('min', 'Title must have 5 characters atleast', val => { return val.trim().toString().length > 4 })
    .test('max', 'Title should have atmost 50 characters', val => { return val.trim().toString().length < 51 }),
  });

  useEffect(() => {
    getMyPlaylistAction();
  }, []);

  const handleClose = () => togglePlaylistPopupAction(false);
  const handleShow = () => togglePlaylistPopupAction(true);
  const handleUpdatePopupClose = () => toggleUpdatePlaylistPopupAction(false);
  const handleUpdatePopupShow = () => toggleUpdatePlaylistPopupAction(true);

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    createPlaylistAction(data);
  };

  const savePlaylist = data => {
    updatePlaylistAction({id: playlistId, ...data});
  }

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      formatter: linkFormatter,
    },
    {
      dataField: 'songs',
      text: 'Songs',
      formatter: songsFormatter,
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
      headerStyle: {
        textAlign: 'center'
      },
    },
  ];

  function linkFormatter(cell, row, rowIndex, formatExtraData) {
    return <Link to={`/playlist/${row.id}`}>{row.title}</Link>;
  }

  function songsFormatter(cell, row, rowIndex, formatExtraData) {
    return row.playlistSongs.length;
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
        <button
          className="btn btn-info mr-3"
          onClick={() => handleEditPopupOpen(row.id, row.title)}
        >
          <FontAwesomeIcon icon={faEdit}/>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDeletePopupOpen(row.id)}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    );
  }

  function handleDeletePopupOpen(id) {
    setPlaylistId(id);
    setOpen(true);
  }

  function handleEditPopupOpen(id, title) {
    handleUpdatePopupShow();
    setPlaylistId(id);
    setPlaylistTitle(title);
  }

  function handleEditPopupClick() {
    handleUpdatePopupClose();
  }

  function handleDeletePopupClose() {
    setOpen(false);
  }

  function deletePlaylistCall() {
    deletePlaylistAction(playlistId);
    setOpen(false);
    setPlaylistId(0);
  }

  return (
    <PaperCard title="My Playlists">
      <div className="row pb-5">
        <div className="col">
          <Button variant="success" onClick={handleShow}>
            Create Playlist
          </Button>
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
            data={playlists}
            columns={columns}
          />
          {playlists.length === 0 && <h4 className='d-flex justify-content-center'>No playlist available.</h4>}
        </div>
      </div>
      <Modal show={popupState} onHide={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  placeholder="Enter playlist title"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
                <div className="invalid-feedback">
                  {errors.title && errors.title.message}
                </div>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal show={updatePopupState} onHide={handleEditPopupClick}>
        <form onSubmit={handleSubmit(savePlaylist)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridTitle">
                <label htmlFor="title">Title</label>
                <input
                  name="title"
                  placeholder="Enter playlist title"
                  defaultValue={playlistTitle}
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  ref={register}
                />
                <div className="invalid-feedback">
                  {errors.title && errors.title.message}
                </div>
              </Form.Group>
            </Form.Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleEditPopupClick}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <Modal
        show={open}
        onHide={handleDeletePopupClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the playlist?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeletePopupClose}>
            No
          </Button>
          <Button variant="primary" onClick={deletePlaylistCall}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  );
}

Playlist.propTypes = {
  createPlaylistAction: PropTypes.func.isRequired,
  togglePlaylistPopupAction: PropTypes.func.isRequired,
  toggleUpdatePlaylistPopupAction: PropTypes.func.isRequired,
  getMyPlaylistAction: PropTypes.func.isRequired,
  deletePlaylistAction: PropTypes.func.isRequired,
  updatePlaylistAction: PropTypes.func.isRequired,
  popupState: PropTypes.bool.isRequired,
  updatePopupState: PropTypes.bool.isRequired,
  playlists: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  popupState: makeSelectPlaylistPopUpState(),
  updatePopupState: makeSelectUpdateModalStatus(),
  playlists: makeSelectPlaylists(),

});

function mapDispatchToProps(dispatch) {
  return {
    createPlaylistAction: data => dispatch(createPlaylist(data)),
    updatePlaylistAction: data => dispatch(updatePlaylist(data)),
    togglePlaylistPopupAction: data => dispatch(togglePlaylistPopup(data)),
    toggleUpdatePlaylistPopupAction: data => dispatch(toggleUpdatePlaylistPopup(data)),
    getMyPlaylistAction: () => dispatch(getMyPlaylist()),
    deletePlaylistAction: id => dispatch(deletePlaylist(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Playlist);
