import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCrewMember, updateCrewMember } from '../../api/crewData';

const initialState = {
  image: '',
  name: '',
  email: '',
};

function CrewMemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
  }, [memberObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memberObj.firebaseKey) {
      updateCrewMember(formInput).then(() => router.push('/crew'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createCrewMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCrewMember(patchPayload).then(() => {
          router.push('/crew');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-black mt-5">{memberObj.firebaseKey ? 'Update' : 'Add a'} Member</h2>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Member Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* Name INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Member Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* email INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="member email" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter an email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{memberObj.firebaseKey ? 'Update' : 'Create'} member</Button>
    </Form>
  );
}

CrewMemberForm.propTypes = {
  memberObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }),
};

CrewMemberForm.defaultProps = {
  memberObj: initialState,
};

export default CrewMemberForm;
