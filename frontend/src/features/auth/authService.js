import axios from 'axios';

const API_URL = '/api/users';

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL, userData);

  if (res.data) {
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  return res.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
};

export default authService;
