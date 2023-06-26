import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/api';
import PostList from './HomePage';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    getUserDetails(userId)
      .then(response => {
        setTimeout(() => { 
          setUser(response.data);
          setIsLoading(false); 
        }, 500); 
      });
  }, [userId]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  const goBack = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <p>{user.address.city}</p>
      <PostList userId={userId} />
      <button onClick={goBack}>Back</button>
    </div>
  );
};

export default UserDetails;
