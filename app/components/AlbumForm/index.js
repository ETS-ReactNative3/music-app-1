import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import Select from "react-select";
import {yupResolver} from "@hookform/resolvers/yup";

function AlbumForm({genres, formSubmit, song}) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    caption: Yup.string()
      .required('Caption is required'),
    description: Yup.string()
      .required('Description is required'),
    albumImage: Yup.mixed()
      .required('Album image is required'),
  });

  const {register, handleSubmit, errors, reset, control} = useForm({
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
            name="albumGenre"
            ref={register}
            className={`form-control ${errors.songGenre ? 'is-invalid' : ''}`}
          >
            <option value="" disabled selected>Select Album Genre</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.title}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {errors.songGenre && errors.songGenre.message}
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridGenre">
          <label htmlFor="email">Songs</label>
          <Controller
            name="songs"
            control={control}
            isMulti
            options={[
              {value: "chocolate", label: "Chocolate"},
              {value: "strawberry", label: "Strawberry"},
              {value: "vanilla", label: "Vanilla"}
            ]}
            as={Select}
          />
          <div className="invalid-feedback">
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
          <input name="copyrightDate" type="date" ref={register}
                 className={`form-control ${errors.copyrightDate ? 'is-invalid' : ''}`}/>
          <div className="invalid-feedback">
            {errors.copyrightDate && errors.copyrightDate.message}
          </div>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="fileGridGenre">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">Upload Album Image</span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                accept="image/*"
                className="custom-file-input"
                name="albumImage"
                ref={register}
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"/>
              <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
            </div>
            <div className="invalid-feedback">
              {errors.albumImage && errors.albumImage.message}
            </div>
          </div>
        </Form.Group>
      </Form.Row>
      <button className="btn btn-primary btn-block" type="submit">
        Submit
      </button>
    </form>
  );
}

export default AlbumForm;
