import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/api';
import PostList from './HomePage';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={8}>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>{user.address.city}</p>
          <PostList userId={userId} />
          <Button variant="primary" onClick={goBack}>Back</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
