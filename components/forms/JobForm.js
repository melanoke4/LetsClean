import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createJob, updateJob } from '../../api/jobData';

const initialState = {
  image: '',
  title: '',
  address: '',
  description: '',
};

function JobForm({ jobObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (jobObj.firebaseKey) setFormInput(jobObj);
  }, [jobObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobObj.firebaseKey) {
      updateJob(formInput).then(() => router.push('/jobs'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createJob(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateJob(patchPayload).then(() => {
          router.push('/jobs');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{jobObj.firebaseKey ? 'Update' : 'Add a'} Job</h2>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Job Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Title INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Job Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Address INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Job's Address" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an Address"
          name="address"
          value={formInput.address}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* description INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Job description" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{jobObj.firebaseKey ? 'Update' : 'Create'} job</Button>
    </Form>
  );
}

JobForm.propTypes = {
  jobObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    uid: PropTypes.string,
  }),
};

JobForm.defaultProps = {
  jobObj: initialState,
};

export default JobForm;
