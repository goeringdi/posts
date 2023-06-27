import React, { useEffect, useState } from 'react';
import { getComments } from '../api/api';
import { Button, Card, Alert } from 'react-bootstrap';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [error, setError] = useState(null);  
  useEffect(() => {
    const fetchComments = async () => {
      setError(null);  
      try {
        if (showComments) {
          const response = await getComments(postId);
          setComments(response.data);
        }
      } catch (err) {
        setError(err.message); 
      }
    }

    fetchComments();
  }, [showComments, postId]);

  const handleShowComments = () => {
    setShowComments(prevState => !prevState);
  };

  if (error) {
    return <Alert variant='danger'>{error}</Alert>
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShowComments}>
        {showComments ? 'Скрыть' : 'Показать'} комментарии
      </Button>
      {showComments && comments.map(comment => (
        <Card key={comment.id} className="mt-2">
          <Card.Header>{comment.email}</Card.Header>
          <Card.Body>
            <Card.Text>{comment.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
