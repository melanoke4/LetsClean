import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import CrewMemberCard from '../components/CrewMemberCard';
import { getCrewMembers } from '../api/crewData';

export default function CrewPage() {
  const [crewMembers, setCrewMembers] = useState([]);
  const { user } = useAuth();
  // console.warn(crewMembers);
  const getAllTheCrewMembers = () => {
    getCrewMembers(user.uid).then((data) => {
      setCrewMembers(data);
    });
  };

  useEffect(() => {
    getAllTheCrewMembers();
  }, []);

  return (
    <div key={crewMembers}>
      {crewMembers.map((crewMember) => (

        <CrewMemberCard key={crewMember.firebaseKey} memberObj={crewMember} onUpdate={getAllTheCrewMembers} />
      ))}
    </div>
  );
}
