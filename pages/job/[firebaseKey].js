import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { getSingleJob } from '../../api/jobData';

export default function ViewJob() {
  const [jobDetails, setJobDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleJob(firebaseKey).then(setJobDetails);
  }, [firebaseKey]);
  console.warn('', jobDetails);

  return (
    <div className="view-job">
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >

          <Card.Img variant="top" src={jobDetails?.image} alt={jobDetails?.name} style={{ maxHeight: '350px' }} />
          <Card.Body>
            <Card.Title>{jobDetails?.title} </Card.Title>
            <p>status: {jobDetails?.status}</p>
            <ListGroup>
              <ListGroupItem> Address: {jobDetails?.address} </ListGroupItem>

            </ListGroup>
          </Card.Body>
        </Card>
      </div>
      {/* <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >
          <CommentForm jobObj={jobDetails} setJobObj={setJobDetails} />
          <div className="d-flex flex-wrap"> Comments:
            {jobDetails?.comments?.map((comment) => (
              <CommentCard key={comment.firebaseKey} comment={comment} />
            ))}
          </div>
        </Card>
      </div> */}
    </div>
  );
}
