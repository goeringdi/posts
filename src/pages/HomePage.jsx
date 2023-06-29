import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Spinner, Container, Row, Col, Alert } from 'react-bootstrap';
import { useGetPostsQuery, useGetUserPostsQuery } from '../api/api';
import Comments from '../components/Comments';

const PostList = ({ userId }) => {
  const [page, setPage] = useState(1);
  const [delayedLoading, setDelayedLoading] = useState(true);

  const userPostsQuery = useGetUserPostsQuery(userId);
  const postsQuery = useGetPostsQuery({ page, limit: 10 });

  let data, isLoading, error;
  if (userId) {
    data = userPostsQuery.data;
    isLoading = userPostsQuery.isLoading;
    error = userPostsQuery.error;
  } else {
    data = postsQuery.data;
    isLoading = postsQuery.isLoading;
    error = postsQuery.error;
  }

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

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (delayedLoading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" />
      </div>
    )
  }

  if (error) {
    return <Alert variant='danger'>Something went wrong!</Alert>
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} sm={8}>
          {data && data.map((post, idx) => (
            <Card className="mt-2" key={post.id}>
              <Card.Header>
                {post.title}
              </Card.Header>
              <Card.Body>
                <Card.Text>{post.body}</Card.Text>
                <Link to={`/user-details/${post.userId}`}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'gray', marginBottom: '12px' }}></div>
                </Link>
                <Comments postId={post.id} />
              </Card.Body>
            </Card>
          ))}
          <div style={{ marginTop: '20px' }}>
            <Button variant="primary" onClick={handlePreviousPage} disabled={page === 1} style={{ marginRight: '20px', marginBottom: '20px', width: '80px' }}>
              Назад
            </Button>
            <Button variant="primary" onClick={handleNextPage} style={{marginBottom: '20px', width: '80px' }}>
              Вперед
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PostList;
