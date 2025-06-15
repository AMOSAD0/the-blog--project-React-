import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchPosts = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'posts'));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
