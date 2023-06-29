import React, { useState } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useGetCommentsQuery } from '../api/api';

const Comments = ({ postId }) => {
  const [showComments, setShowComments] = useState(false);

  const { data: comments, isError } = useGetCommentsQuery(postId, { skip: !showComments });

  const handleShowComments = () => {
    setShowComments(prevState => !prevState);
  };

  if (isError) {
    return <Alert variant='danger'>Something went wrong!</Alert>
  }

  return (
    <div>
      <Button variant="primary" onClick={handleShowComments}>
        {showComments ? 'Скрыть' : 'Показать'} комментарии
      </Button>
      {showComments && comments && comments.map(comment => (
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
