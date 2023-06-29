import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserDetailsQuery } from '../api/api';
import PostList from './HomePage';
import { Container, Row, Col, Button, Spinner, Alert } from 'react-bootstrap';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [delayedLoading, setDelayedLoading] = useState(true);

  const { data: user, isLoading, isError } = useGetUserDetailsQuery(userId);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setDelayedLoading(false);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading]);

  const goBack = () => {
    navigate('/');
  };

  if (isError) {
    return <Alert variant='danger'>Something went wrong!</Alert>; 
  }

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} sm={8}>
          {delayedLoading ? (
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
