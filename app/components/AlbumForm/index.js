import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

function AlbumForm({genres, formSubmit, song}) {
  const {register, handleSubmit, errors, reset} = useForm();
  const [songDate, setSongDate] = useState(new Date());
  const [songGenre, setSongGenre] = useState('');

  const handleSongDateChange = date => {
    setSongDate(date);
  };

  const handleGenreChange = event => {
    setSongGenre(event.target.value);
  };

  useEffect(() => {
    if (song) {
      setSongGenre(song.genreId);
      setSongDate(song.releaseDate);
      reset(song);
    }
  }, [song]);

  const onSubmit = data => {
    const songData = {
      ...data,
      genreId: songGenre,
      releaseDate: songDate,
    };
    formSubmit(songData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="email">Title</label>
        <input
          name="title"
          placeholder="Enter album title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          ref={register({required: 'Email is required'})}
        />
        <div className="invalid-feedback">
          {errors.title && errors.title.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Title</label>
        <input
          name="caption"
          placeholder="Enter album caption"
          className={`form-control ${errors.caption ? 'is-invalid' : ''}`}
          ref={register({required: 'Email is required'})}
        />
        <div className="invalid-feedback">
          {errors.title && errors.title.message}
        </div>
      </div>
      <div className="form-group col">
        <label>Title</label>
        <select
          name="songGenre"
          ref={register}
          className={`form-control ${errors.songGenre ? 'is-invalid' : ''}`}
        >
          <option value=""/>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.title}
            </option>
          ))}
        </select>
        <div className="invalid-feedback">
          {errors.songGenre && errors.songGenre.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Description</label>
        <input
          name="description"
          placeholder="Enter description"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          ref={register({required: 'Description is required'})}
        />
        <div className="invalid-feedback">
          {errors.description && errors.description.message}
        </div>
      </div>
    </form>
  );
}

export default AlbumForm;
