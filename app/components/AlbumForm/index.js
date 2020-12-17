import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import Select from "react-select";
import {yupResolver} from "@hookform/resolvers/yup";

function AlbumForm({genres, formSubmit, songList, album}) {
  const [image, setImage] = useState({preview: ""})
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    caption: Yup.string()
      .required('Caption is required'),
    description: Yup.string()
      .required('Description is required'),
    genreId: Yup.string()
      .required('Genre is required'),
    songs: Yup.array(Yup.object({value: Yup.string()})).required('Songs are required'),
  });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const {register, handleSubmit, errors, reset, control, setValue} = useForm({
    resolver: yupResolver(validationSchema)
  });

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    }),
    menu: provided => ({...provided, zIndex: 9999})
  }

  useEffect(() => {
    if (album && songList) {
      // To set songs
      const albumSongList = album.albumSongs.map(song => song.songId);
      const songs = albumSongList.map(s => {
        return songList.find(i => i.id === s)
      })
      // To set releaseDate
      album.releaseDate = new Date(album.releaseDate).toISOString().split('T')[0]
      album.copyRightDate = new Date(album.copyRightDate).toISOString().split('T')[0]
      reset({...album, songs});
    }
  }, [album, songList]);

  const onSubmit = data => {
    formSubmit(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridTitle">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              placeholder="Enter album title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.title && errors.title.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCaption">
            <label htmlFor="caption">Caption</label>
            <input
              name="caption"
              placeholder="Enter album caption"
              className={`form-control ${errors.caption ? 'is-invalid' : ''}`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.caption && errors.caption.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDescription">
            <label htmlFor="email">Description</label>
            <input
              name="description"
              placeholder="Enter album description"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.description && errors.description.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPublish">
            <label htmlFor="publish">Publish</label>
            <Form.Check
              type="switch"
              name="publish"
              id="custom-switch"
              ref={register}
              label="Publish Album"
            />
            <div className="invalid-feedback">
              {errors.publish && errors.publish.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="email">Genre</label>
            <select
              name="genreId"
              ref={register}
              className={`form-control ${errors.genreId ? 'is-invalid' : ''}`}
            >
              <option value="" disabled selected>Select Album Genre</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>
                  {genre.title}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              {errors.genreId && errors.genreId.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="email">Songs</label>
            <Controller
              name="songs"
              styles={customStyles}
              control={control}
              isMulti
              isClearable
              getOptionLabel={(option) => option.title}
              getOptionValue={(option) => option.id}
              options={songList}
              as={Select}
            />
            <div className="invalid-feedback-block">
              {errors.songs && errors.songs.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="releaseDate">Release Date</label>
            <input name="releaseDate" type="date" ref={register}
                   className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">
              {errors.releaseDate && errors.releaseDate.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="copyrightDate">Copyright Date</label>
            <input name="copyRightDate" type="date" ref={register}
                   className={`form-control ${errors.copyrightDate ? 'is-invalid' : ''}`}/>
            <div className="invalid-feedback">
              {errors.copyRightDate && errors.copyRightDate.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="fileGridGenre">
            <label htmlFor="inputGroupFileAddon01">Image</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroupFileAddon01">Upload Album Image</span>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  name="albumImage"
                  ref={register}
                  className={`custom-file-input ${errors.albumImage ? 'is-invalid' : ''}`}
                  onChange={handleChange}
                  id="inputGroupFile01"
                  aria-describedby="inputGroupFileAddon01"/>
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
              </div>
            </div>
            <div className="invalid-feedback-block">
              {errors.albumImage && errors.albumImage.message}
            </div>
            {album && album.artwork && !image.preview && <img className="img-thumbnail mt-3" src={album.artwork} alt={album.title}/>}
            {image.preview && <img className="img-thumbnail mt-3" src={image.preview} alt="uploadedImage"/>}
          </Form.Group>
        </Form.Row>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default AlbumForm;
