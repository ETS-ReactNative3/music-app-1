import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonLoader from '../ButtonLoader';
import './index.scss';

function renderOptions(genres) {
  return genres.map(genre => ({ value: genre.id, label: genre.title }));
}

function InfluencerForm({ genres, formSubmit, formLoader }) {
  const validationSchema = Yup.object().shape({
    description: Yup.string().required('Service information is required'),
    genres: Yup.array()
      .required('Genre is required')
      .nullable(),
  });

  const { register, handleSubmit, errors, setValue, clearErrors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleSelectChange = data => {
    setValue('genres', data);
  };

  const onSubmit = data => {
    const formData = {
      ...data,
      genres: data.genres.map(val => val.value),
    };
    formSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridDiscription">
            <label htmlFor="description">Service Information</label>
            <input
              name="description"
              placeholder="Service Information"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''
              }`}
              ref={register}
            />
            <div className="invalid-feedback">
              {errors.description && errors.description.message}
            </div>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridGenre">
            <label htmlFor="genres">Genre</label>
            <Select
              name="genres"
              isMulti
              closeMenuOnSelect={false}
              className={`genre-select ${errors.genres ? 'is-invalid' : ''}`}
              classNamePrefix="genre-select"
              onChange={handleSelectChange}
              options={renderOptions(genres)}
              ref={e => register({ name: 'genres' })}
            />
            <div className="invalid-feedback">
              {errors.genres && errors.genres.message}
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} xs="12" controlId="formFacebookGrid">
            <label className="my-1 mr-2 label-divider">Facebook</label>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGridFacebookUrl">
            <input
              name="facebook.link"
              placeholder="Enter Facebook url"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFacebookPrice">
            <input
              name="facebook.price"
              type="number"
              placeholder="Price"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridFacebookCounter">
            <input
              name="facebook.followers"
              type="number"
              placeholder="Follower count"
              className="form-control"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="12" controlId="formGridinsta">
            <label className="my-1 mr-2 label-divider">Instagram</label>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGriInstadUrl">
            <input
              name="instagram.link"
              placeholder="Enter Intstagram url"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridInstaPrice">
            <input
              name="instagram.price"
              type="number"
              placeholder="Price"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridInstaCounter">
            <input
              name="instagram.followers"
              type="number"
              placeholder="Follower count"
              className="form-control"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="12" controlId="formGridTwitter">
            <label className="my-1 mr-2 label-divider">Twitter</label>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGridTwieerUrl">
            <input
              name="twitter.link"
              placeholder="Enter Twitter url"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTwitterPrice">
            <input
              name="twitter.price"
              type="number"
              placeholder="Price"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridTwitterCounter">
            <input
              name="twitter.followers"
              type="number"
              placeholder="Follower count"
              className="form-control"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="12" controlId="formGridYoutube">
            <label className="my-1 mr-2 label-divider">Youtube</label>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGridYoutubeUrl">
            <input
              name="youtube.link"
              placeholder="Enter youtube url"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridYoutubePrice">
            <input
              name="youtube.price"
              type="number"
              placeholder="Price"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridYoutubeCounter">
            <input
              name="youtube.followers"
              type="number"
              placeholder="Follower count"
              className="form-control"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} xs="12" controlId="formGridBlog">
            <label className="my-1 mr-2 label-divider">Blog</label>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="formGridBlogUrl">
            <input
              name="blog.link"
              placeholder="Enter Blog url"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBlogPrice">
            <input
              name="blog.price"
              type="number"
              placeholder="Price"
              className="form-control"
              ref={register}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridBlogCounter">
            <input
              name="blog.followers"
              type="number"
              placeholder="Follower count"
              className="form-control"
              ref={register}
            />
          </Form.Group>
        </Form.Row>

        {formLoader ? (
          <ButtonLoader />
        ) : (
          <button className="btn btn-primary btn-block" type="submit">
            Submit
          </button>
        )}
      </form>
    </>
  );
}

export default InfluencerForm;
