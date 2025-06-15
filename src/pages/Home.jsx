import React, { useEffect, useState } from 'react';
import MultiActionAreaCard from '../components/Card';
import { Box, CircularProgress, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchPosts } from '../functions/fetchPosts'; 

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <Box
      sx={{
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : posts.length === 0 ? (
        <Typography>No posts found.</Typography>
      ) : (
        posts.map((post) => (
          <MultiActionAreaCard
            key={post.id}
            title={post.title}
            description={post.description}
            image={post.img}
            userId={post.userId}
            userName={post.userName}
            postId={post.id}
            onDelete={() => handleDelete(post.id)}
          />
        ))
      )}

      {localStorage.getItem('token') && (
        <Link to="/addPost">
          <Fab color="primary" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <AddIcon />
          </Fab>
        </Link>
      )}
    </Box>
  );
}
