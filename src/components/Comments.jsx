import React, { useEffect, useState } from 'react';
import { getComments } from '../api/api';
import { Button, Card } from 'react-bootstrap';

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  
  useEffect(() => {
    if (showComments) {
      getComments(postId)
        .then(response => {
          setComments(response.data);
        });
    }
  }, [showComments, postId]);

  const handleShowComments = () => {
    setShowComments(prevState => !prevState);
  };

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
