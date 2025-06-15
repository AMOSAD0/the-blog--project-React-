
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { compressImageToBase64 } from './imgConvert';

export const fetchPostById = async (id, setTitle, setDescription, setImage, setPreview, setError) => {
  try {
    const postRef = doc(db, 'posts', id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const data = postSnap.data();
      setTitle(data.title);
      setDescription(data.description);
      setImage(data.img);
      setPreview(data.img);
    } else {
      setError('Post not found.');
    }
  } catch (err) {
    console.error(err);
    setError('Failed to load post.');
  }
};

export const submitPost = async ({
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
}) => {
  const userId = localStorage.getItem('token');
  const userName = localStorage.getItem('name');

  if (!userId && !isEdit) {
    setError('You must be logged in to add a post.');
    return;
  }

  if (!title || !description || (!image && !isEdit)) {
    setError('Please fill in all fields and select an image.');
    return;
  }

  try {
    let img64 = image;
    if (image && typeof image !== 'string') {
      img64 = await compressImageToBase64(image);
    }

    if (isEdit) {
      const postRef = doc(db, 'posts', id);
      await updateDoc(postRef, {
        title,
        description,
        img: img64,
      });
      setSuccess('Post updated successfully!');
      setTimeout(() => navigate('/'), 1500);
    } else {
      await addDoc(collection(db, 'posts'), {
        title,
        description,
        img: img64,
        userId,
        userName,
      });
      setSuccess('Post added successfully!');
      setTitle('');
      setDescription('');
      setImage(null);
      setPreview(null);
    }
  } catch (error) {
    setError('Something went wrong. Please try again.');
    console.error(error);
  }
};
