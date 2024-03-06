import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCrewMember } from '../../../api/crewData';
import CrewMemberForm from '../../../components/forms/CrewMemberForm';

export default function EditMember() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCrewMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CrewMemberForm memberObj={editItem} />);
}
