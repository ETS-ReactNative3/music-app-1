import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Modal, Row, Col, ListGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './index.scss';

const AddtoPlaylistModal = ({
  songId,
  visible,
  onHide,
  createPlaylistandAddSongAction,
  playlists,
  addSongIntoPlaylistAction,
}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be two letter'),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ title }) => {
    createPlaylistandAddSongAction({ title, songId });
    onHide();
  };

  const addSongintoPlaylist = id => {
    addSongIntoPlaylistAction({
      id,
      songId,
    });
    onHide();
  };

  return (
    <Modal show={visible} onHide={onHide} centered>
      <Row>
        <Col>
          <div className="newplaylist">
            <h4>Create a New Playlist</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridTitle">
                  <input
                    name="title"
                    placeholder="Your new playlist name"
                    className={`form-control ${
                      errors.title ? 'is-invalid' : ''
                    }`}
                    ref={register}
                  />
                  <div className="invalid-feedback">
                    {errors.title && errors.title.message}
                  </div>
                </Form.Group>
              </Form.Row>
              <button className="btn btn-success btn-block" type="submit">
                Save
              </button>
            </form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="existingplaylist">
            <h4>OR ADD TO AN EXISTING PLAYLIST</h4>
            <ListGroup>
              {playlists.map(list => (
                <ListGroup.Item
                className="cursor-pointer"
                  key={list.id}
                  action
                  onClick={() => addSongintoPlaylist(list.id)}
                >
                  {list.title}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddtoPlaylistModal;
