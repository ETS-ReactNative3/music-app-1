import React, {useEffect, useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import ButtonLoader from "../ButtonLoader";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './index.scss';
import {toast} from "react-toastify";

function SongForm({genres, formSubmit, song, formLoader, moods, members}) {
  const [audio, setAudio] = useState({audioFile: ""})
  const [counter, setCounter] = useState(0)
  const [indexes, setIndexes] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
    description: Yup.string()
      .required('Description is required'),
    genreId: Yup.string()
      .required('Genre is required'),
    collaborator: Yup.array().of(
      Yup.object().shape({
        member: Yup.string().required("Select a collaborator"),
        percentage: Yup.number().typeError('You must specify a number')
          .min(0, 'Min value 0.')
          .max(99, 'Max value 99').required("Percentage is required")
      })
    )
  });

  const handleAudioChange = e => {
    if (e.target.files.length) {
      setAudio({
        audioFile: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const {register, handleSubmit, errors, reset, control} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const addCollaborator = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  };

  const removeFriend = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  };

  useEffect(() => {
    if (song) {
      setCounter(0)
      setIndexes([])
      song.collaborator = song.songContributors.map((item, index) => {
        setCounter(index + 1)
        setIndexes(prevIndexes => [...prevIndexes, index])
        return {
          member: item.userId,
          percentage: item.percentage
        }
      })

      song.releaseDate = new Date(song.releaseDate)
      song.moods = song.songMoods.map(moodItem => moodItem.moods)
      reset(song);
    }
  }, [song]);

  const onSubmit = data => {
    if (indexes.length > 0) {
      const totalPercentage = data.collaborator.reduce((a, b) => a.percentage + b.percentage)
      if (totalPercentage > 99) {
        toast.error("Collaborator percentage is more than 99")
        return false
      }

      let seen = new Set();
      const hasDuplicates = data.collaborator.some(currentObject => seen.size === seen.add(currentObject.member).size);
      if (hasDuplicates) {
        toast.error("Same member repeated in collaboration")
        return false
      }
    }

    formSubmit(data);
  };
  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black',
    }),
    control: provided => ({
      ...provided,
      color: 'black',
      backgroundColor: '#020f1f'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black',
    }),
    menu: provided => ({...provided, zIndex: 9999}),
  };

  return (
    <>
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
            <textarea
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
              <option value="" disabled selected>Select Song Genre</option>
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
            <Controller
              dateFormat={'dd/MM/yyyy'}
              name="releaseDate"
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
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridMood" style={{flex: 0.5, marginRight: 10}}>
            <label htmlFor="email">Moods</label>
            <Controller
              name="moods"
              styles={customStyles}
              control={control}
              isMulti
              isClearable
              getOptionLabel={option => option.title}
              getOptionValue={option => option.id}
              options={moods}
              as={Select}
            />
            <div className="invalid-feedback">
              {errors.moods && errors.moods.message}
            </div>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridPublish">
            <label htmlFor="explicitContent">Explicit Content</label>
            <Form.Check
              type="switch"
              name="explicitContent"
              id="custom-switch"
              ref={register}
              label="Explicit Content"
            />
            <div className="invalid-feedback">
              {errors.explicitContent && errors.explicitContent.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
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
                  onChange={handleAudioChange}
                  id="inputGroupFile02"
                  required
                  aria-describedby="inputGroupFileAddon02"/>
                <label className="custom-file-label" htmlFor="inputGroupFile02">Choose file</label>
              </div>
              <div className="invalid-feedback-block">
                {errors.audio && errors.audio.message}
              </div>
            </div>
            {audio.audioFile && (
              <div className="mt-3">
                <audio controls>
                  <source src={audio.audioFile}/>
                </audio>
              </div>
            )}
            {song && song.url && !audio.audioFile && (
              <div className="mt-3">
                <audio controls>
                  <source src={song.url}/>
                </audio>
              </div>
            )}
          </Form.Group>
        </Form.Row>
        {indexes.map(index => {
          const fieldName = `collaborator[${index}]`;
          return (
            <div className="row" key={index}>
              <div className="col-md-5">
                <label htmlFor="email">Collaborator</label>
                <select
                  name={`${fieldName}.member`}
                  ref={register}
                  className={`form-control ${errors.collaborator && errors.collaborator[index] && errors.collaborator[index].member ? 'is-invalid' : ''}`}
                >
                  <option value="" disabled selected>Select Collaborator</option>
                  {members.map(member => (
                    <option key={member.id} value={member.user.id}>
                      {member.user.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback-block">
                  {errors.collaborator && errors.collaborator[index] && errors.collaborator[index].member && errors.collaborator[index].member.message}
                </div>
              </div>
              <div className="col-md-5">
                <label>Percentage</label>
                <input
                  type="number"
                  name={`${fieldName}.percentage`}
                  placeholder="Enter percentage"
                  className={`form-control ${errors.collaborator && errors.collaborator[index] && errors.collaborator[index].percentage ? 'is-invalid' : ''}`}
                  ref={register}
                />
                <div className="invalid-feedback-block">
                  {errors.collaborator && errors.collaborator[index] && errors.collaborator[index].percentage && errors.collaborator[index].percentage.message}
                </div>
              </div>
              <div className="col-md-2 pt-4">
                <button className="btn btn-danger mt-2" type="button" onClick={removeFriend(index)}>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
        <div className="row mb-4 mt-2">
          <div className="col">
            <button className="btn btn-warning" type="button" onClick={addCollaborator}>
              Add Collaborator
            </button>
          </div>
        </div>
        {formLoader ? <ButtonLoader/> :
          <button className="btn btn-primary btn-block" type="submit">
            Submit
          </button>
        }
      </form>
    </>
  );
}

export default SongForm;
