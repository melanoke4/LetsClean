import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteCrewMember } from '../api/crewData';

export default function CrewMemberCard({ memberObj, onUpdate }) {
  const deleteThisMember = () => {
    if (window.confirm(`Delete ${memberObj.name}?`)) {
      deleteCrewMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={memberObj.image} alt={memberObj.name} style={{ height: '18rem' }} />
        <Card.Title>
          {memberObj.name}
        </Card.Title>
        <p>
          {memberObj.email}
        </p>

        <Link href={`/job/edit/${memberObj.firebaseKey}`} passHref>
          <Button variant="secondary">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisMember} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

CrewMemberCard.propTypes = {
  memberObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,

    firebaseKey: PropTypes.string,
    // user: PropTypes.shape({
    //   firebaseKey: PropTypes.number,
    //   uid: PropTypes.string,
    //   username: PropTypes.string,
    // }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
