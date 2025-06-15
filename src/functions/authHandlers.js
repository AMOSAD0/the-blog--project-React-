
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase.js';


const validateName = (name) => {
  if (!name.trim()) return 'Name is required.';
  if (name.length < 2) return 'Name must be at least 2 characters.';
  return null;
};

const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email.trim()) return 'Email is required.';
  if (!emailRegex.test(email)) return 'Invalid email format.';
  return null;
};

const validatePassword = (password) => {
  if (!password) return 'Password is required.';
  if (password.length < 6) return 'Password must be at least 6 characters.';
  return null;
};

export const handleSignUp = async (
  name,
  email,
  password,
  setError,
  setSuccess,
  clearFields,
  setLoading,
  navigate,
  loginCallback
) => {
  const nameError = validateName(name);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (nameError || emailError || passwordError) {
    setError(nameError || emailError || passwordError);
    return;
  }
  try {
    setLoading(true);
    setError('');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      createdAt: new Date()
    });

    localStorage.setItem('token', user.uid);
    localStorage.setItem('name', name);

    setSuccess('Account created successfully!');
    loginCallback(user.uid); 
    navigate('/');
    clearFields();
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


export const handleLogin = async (
  email,
  password,
  setError,
  setSuccess,
  setLoading,
  navigate,
  loginCallback 
) => {
  try {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setError(emailError || passwordError);
      return;
    }
    setLoading(true);
    setError('');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem('token', user.uid);
      localStorage.setItem('name', userData.name);
    }
    setSuccess('Logged in successfully!');
    loginCallback(user.uid);
    navigate('/');
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
