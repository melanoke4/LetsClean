import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteJob } from '../api/jobData';

export default function JobCard({ jobObj, onUpdate }) {
  const deleteThisJob = () => {
    if (window.confirm(`Delete ${jobObj.title}?`)) {
      deleteJob(jobObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={jobObj.image} alt={jobObj.title} style={{ height: '18rem' }} />
        <Card.Title>
          {jobObj.title}
        </Card.Title>
        <p>
          {jobObj.address}
        </p>
        <p>
          {jobObj.assigned}
          {jobObj.status}
        </p>
        <Link href={`/job/${jobObj.firebaseKey}`} passHref>
          <Button variant="light" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/job/edit/${jobObj.firebaseKey}`} passHref>
          <Button variant="secondary">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisJob} className="m-2">DELETE</Button>
      </Card.Body>
    </Card>
  );
}

JobCard.propTypes = {
  jobObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    address: PropTypes.string,
    status: PropTypes.bool,
    assigned: PropTypes.bool,
    firebaseKey: PropTypes.string,
    // user: PropTypes.shape({
    //   firebaseKey: PropTypes.number,
    //   uid: PropTypes.string,
    //   username: PropTypes.string,
    // }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
