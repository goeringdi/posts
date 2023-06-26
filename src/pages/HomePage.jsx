import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getPosts } from "../api/api";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(response => {
        // Add artificial delay
        setTimeout(() => {
          setPosts(response.data);
          setLoading(false);
        }, 500);
      });
  }, []);

  if(isLoading) {
    return <div>Loading...</div>;
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
          <button>Comments</button>
          {/* Comments will be implemented later */}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
