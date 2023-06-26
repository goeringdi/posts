import React, { useEffect, useState } from 'react';
import { getComments } from '../api/api';

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
      <button onClick={handleShowComments}>
        {showComments ? 'Скрыть' : 'Показать'} комментарии
      </button>
      {showComments && comments.map(comment => (
        <div key={comment.id}>
          <h4>{comment.email}</h4>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
