import React from 'react';
import {
  Button,
  Card,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteJob } from '../api/jobData';

export default function JobCard({ jobObj, onUpdate }) {
  const deleteThisJob = () => {
    if (window.confirm(`Delete ${jobObj.title}?`)) {
      deleteJob(jobObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <Card.Img />

      <Card.Body>
        <Card.Title>
          {jobObj.title}
        </Card.Title>

        <Button variant="danger" onClick={deleteThisJob} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

JobCard.propTypes = {
  jobObj: PropTypes.shape({
    // image: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    assigned: PropTypes.string,
    firebaseKey: PropTypes.string,
    // user: PropTypes.shape({
    //   firebaseKey: PropTypes.number,
    //   uid: PropTypes.string,
    //   username: PropTypes.string,
    // }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
