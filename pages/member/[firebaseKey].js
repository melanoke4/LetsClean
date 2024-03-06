import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleCrewMember } from '../../api/crewData';

export default function ViewMember() {
  const [memberDetails, setMemberDetails] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCrewMember(firebaseKey).then(setMemberDetails);
  }, [firebaseKey]);
  console.warn('', memberDetails);

  return (
    <div className="view-member">
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >

          <Card.Img variant="top" src={memberDetails?.image} alt={memberDetails?.name} style={{ maxHeight: '350px' }} />
          <Card.Body>
            <Card.Title>{memberDetails?.name} </Card.Title>

          </Card.Body>
        </Card>
      </div>

    </div>
  );
}
