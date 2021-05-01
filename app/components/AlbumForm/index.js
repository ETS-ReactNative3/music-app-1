import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import Select from "react-select";
import {yupResolver} from "@hookform/resolvers/yup";
import ButtonLoader from "../ButtonLoader";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';

function AlbumForm({genres, formSubmit, songList, album, formLoader}) {
  const [image, setImage] = useState({preview: ""})
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    caption: Yup.string()
      .required('Caption is required'),
    description: Yup.string()
      .required('Description is required'),
    albumGenres: Yup.array()
      .required('Genre is required')
      .nullable(),
    songs: Yup.array(Yup.object({value: Yup.string()})).required('Songs are required'),
  });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const {register, handleSubmit, errors, reset, control} = useForm({
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
    if (album && songList && genres) {
      // To set songs
      const albumSongList = album.albumSongs.map(song => song.songId);
      const songs = albumSongList.map(s => {
        return songList.find(i => i.id === s)
      })
      // To set releaseDate
      album.releaseDate = new Date(album.releaseDate)
      album.copyRightDate = new Date(album.copyRightDate)

      const tempFullGenre = [];
      album.albumGenres.map(generToSearch => {
        const index = genres.findIndex(
          genre => genre.id === generToSearch.genreId,
        );
        if (index !== -1) tempFullGenre.push(genres[index]);
        return true;
      });
      reset({...album, songs, albumGenres: tempFullGenre});
    }
  }, [album, songList, genres]);

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
            <textarea
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
            <textarea
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
            <Controller
              name="albumGenres"
              styles={customStyles}
              control={control}
              isMulti
              isClearable
              getOptionLabel={option => option.title}
              getOptionValue={option => option.id}
              options={genres}
              as={Select}
            />
            <div className="invalid-feedback">
              {errors.albumGenres && errors.albumGenres.message}
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
            <Controller
              name="releaseDate"
              control={control}
              render={({onChange, value}) => (
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  popperPlacement="top-start"
                  popperModifiers={{
                    flip: {
                      behavior: ["top-start"] // don't allow it to flip to be above
                    },
                    preventOverflow: {
                      enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                    },

                  }}
                  className={`form-control ${errors.releaseDate ? 'is-invalid' : ''}`}
                  selected={value}
                  style={{flex: 1}}
                  onChange={onChange}
                />
              )}
            />
            <div className="invalid-feedback">
              {errors.releaseDate && errors.releaseDate.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="copyrightDate">Copyright Date</label>
            <Controller
              dateFormat={'dd/MM/yyyy'}
              name="copyRightDate"
              control={control}
              render={({onChange, value}) => (
                <DatePicker
                  popperPlacement="top-start"
                  popperModifiers={{
                    flip: {
                      behavior: ["top-start"] // don't allow it to flip to be above
                    },
                    preventOverflow: {
                      enabled: false // tell it not to try to stay within the view (this prevents the popper from covering the element you clicked)
                    },

                  }}
                  className={`form-control ${errors.copyRightDate ? 'is-invalid' : ''}`}
                  selected={value}
                  style={{flex: 1}}
                  onChange={onChange}
                />
              )}
            />
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
                  required
                  aria-describedby="inputGroupFileAddon01"/>
                <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
              </div>
            </div>
            <div className="invalid-feedback-block">
              {errors.albumImage && errors.albumImage.message}
            </div>
            {album && album.artwork && !image.preview &&
            <img className="img-thumbnail mt-3" src={album.artwork} alt={album.title}/>}
            {image.preview && <img className="img-thumbnail mt-3" src={image.preview} alt="uploadedImage"/>}
          </Form.Group>
        </Form.Row>
        {formLoader ? <ButtonLoader/> :
          <button className="btn btn-primary btn-block" type="submit">
            Submit
          </button>
        }
      </form>
    </>
  );
}

export default AlbumForm;
