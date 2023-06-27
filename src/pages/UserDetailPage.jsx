import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../api/api';
import PostList from './HomePage';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);   
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      setError(null);  
      try {
        const response = await getUserDetails(userId);
        setTimeout(() => { 
          setUser(response.data);
          setIsLoading(false); 
        }, 500);
      } catch (err) {
        setError(err.message); 
      }
    }

    fetchUserDetails();
  }, [userId]);

  if (error) {
    return <Alert variant='danger'>{error}</Alert>; 
  }

  const goBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={8}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : (
            <>
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <p>{user.address.city}</p>
              <PostList userId={userId} />
              <Button variant="primary" onClick={goBack} style={{marginBottom: '20px', marginTop: '20px', marginLeft: '20px', width: '120px' }}>На главную</Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
