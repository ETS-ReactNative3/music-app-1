import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import AddtoPlaylistModal from '../AddtoPlaylistModal';

const SongsOptionBox = ({
  songId,
  playlists,
  createPlaylistandAddSongAction,
  getMyPlaylistAction,
  addSongIntoPlaylistAction,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) getMyPlaylistAction();
  }, [show]);

  const handleShow = () => setShow(true);

  return (
    <>
      <Dropdown className="social-album-share">
        <Dropdown.Toggle id="dropdown-basic" as="span">
          ...
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="cursor-pointer" onClick={handleShow}>Add To Playlist</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <AddtoPlaylistModal
        songId={songId}
        visible={show}
        onHide={() => setShow(false)}
        createPlaylistandAddSongAction={createPlaylistandAddSongAction}
        addSongIntoPlaylistAction={addSongIntoPlaylistAction}
        playlists={playlists}
      />
    </>
  );
};

export default SongsOptionBox;
