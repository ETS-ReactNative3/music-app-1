import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ButtonLoader from "../ButtonLoader";

function SongForm({genres, formSubmit, song, formLoader}) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    description: Yup.string()
      .required('Description is required'),
  });

  const {register, handleSubmit, errors, reset} = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (song) {
      reset(song);
    }
  }, [song]);

  const onSubmit = data => {
    formSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridTitle">
          <label htmlFor="title">Title</label>
          <input
            name="title"
            placeholder="Enter song title"
            className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.title && errors.title.message}
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDescription">
          <label htmlFor="email">Description</label>
          <input
            name="description"
            placeholder="Enter song description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.description && errors.description.message}
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
          <label htmlFor="releaseDate">Release Date</label>
          <input name="releaseDate" type="date" ref={register}
                 className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">
            {errors.releaseDate && errors.releaseDate.message}
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="fileGridGenre">
          <label htmlFor="inputGroupFile01">Image</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">Upload Song Image</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                accept="image/*"
                className="custom-file-input"
                multiple
                name="songImage"
                ref={register}
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            </div>
            <div className="invalid-feedback">
              {errors.songImage && errors.songImage.message}
            </div>
          </div>
          {song && song.artwork && <img src={song.artwork} alt={song.title}/>}
        </Form.Group>
        <Form.Group as={Col} controlId="fileGridGenre">
          <label htmlFor="inputGroupFile02">Audio</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon02">Upload Song File</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                accept="audio/*"
                className="custom-file-input"
                multiple
                name="audio"
                ref={register}
                id="inputGroupFile02"
                aria-describedby="inputGroupFileAddon02"/>
              <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
            </div>
            <div className="invalid-feedback">
              {errors.audio && errors.audio.message}
            </div>
          </div>
        </Form.Group>
      </Form.Row>
      {formLoader ? <ButtonLoader/> :
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      }
    </form>
  );
}

export default SongForm;
