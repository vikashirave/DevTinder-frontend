import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      // Simulate fetching feed data
      const fetchedFeed = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(fetchedFeed.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return feed && (
    <div className='flex justify-center my-10'>
      <UserCard  user={feed[0]}/>
    </div>
  )
}

export default Feed