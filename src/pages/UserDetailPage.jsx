import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../api/api';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    getUserDetails(userId)
      .then(response => {
        setUser(response.data);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
    </div>
  );
};

export default UserDetails;
