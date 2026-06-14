import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from '../../Footer'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    if (userData) return; // If user data already exists, no need to fetch again
    try {
      const response = await axios.get(BASE_URL + '/profile', {withCredentials: true});
      dispatch(addUser(response.data));
      if (!response.data) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Unauthorized, redirect to login
        navigate('/login');
      }
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <>
    <NavBar />
        <Outlet/>
    <Footer/>
    </>
  )
}

export default Body