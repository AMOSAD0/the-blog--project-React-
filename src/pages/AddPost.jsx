
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPostById, submitPost } from '../functions/addPostHandlers';
import { compressImageToBase64 } from '../functions/imgConvert';

export default function AddPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    setIsEdit(true);
    setLoading(true);
    fetchPostById(id, setTitle, setDescription, setImage, setPreview, setError)
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    await submitPost({
      id,
      isEdit,
      title,
      description,
      image,
      setSuccess,
      setError,
      setTitle,
      setDescription,
      setImage,
      setPreview,
      navigate,
    });

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: '100%' }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          {isEdit ? 'Edit Post' : 'Add New Post'}
        </Typography>

        <form onSubmit={handleSubmit}>
          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

          <Snackbar
            open={!!success}
            autoHideDuration={3000}
            onClose={() => setSuccess('')}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
              {success}
            </Alert>
          </Snackbar>

          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <TextField
            fullWidth
            type="file"
            margin="normal"
            inputProps={{ accept: 'image/*' }}
            onChange={handleImageChange}
          />

          {preview && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" gutterBottom>
                Image Preview:
              </Typography>
              <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 8 }} />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : isEdit ? 'Update Post' : 'Add Post'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}


