import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleJob } from '../../../api/jobData';
import JobForm from '../../../components/forms/JobForm';

export default function EditJob() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleJob(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<JobForm jobObj={editItem} />);
}
