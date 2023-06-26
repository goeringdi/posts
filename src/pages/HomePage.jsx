import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, getUserPosts } from '../api/api';
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
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <Link to={`/user-details/${post.userId}`}>
            <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'gray' }}></div>
          </Link>
          <Comments postId={post.id} />
        </div>
      ))}
      <button onClick={handlePreviousPage} disabled={page === 1}>
        Назад
      </button>
      <button onClick={handleNextPage}>
        Вперед
      </button>
    </div>
  );
};

export default PostList;
