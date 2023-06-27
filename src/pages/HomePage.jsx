import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getUserPosts } from '../api/api';
import { Button, Card, Spinner, Container, Row, Col } from 'react-bootstrap';
import Comments from '../components/Comments';

const PostList = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      let response;
      if (userId) {
        response = await getUserPosts(userId);
      } else {
        response = await getPosts(page, 10);
      }
      setTimeout(() => {
        setPosts(response.data);
        setIsLoading(false);
      }, 500);
    }

    fetchPosts();
  }, [page, userId]);

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col xs={12} sm={8}>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status" />
            </div>
          ) : 
            posts.map((post, idx) => (
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
            ))
          }
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
