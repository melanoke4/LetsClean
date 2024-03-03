import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { useAuth } from '../utils/context/authContext';
import { getJobs } from '../api/jobData';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();
  // console.warn(jobs);
  const getAllTheJobs = () => {
    getJobs(user.uid).then((data) => {
      setJobs(data);
    });
  };

  useEffect(() => {
    getAllTheJobs();
  }, []);

  return (
    <div key={jobs}>
      {jobs.map((job) => (

        <JobCard key={job.firebaseKey} jobObj={job} onUpdate={getAllTheJobs} />
      ))}
    </div>
  );
}
