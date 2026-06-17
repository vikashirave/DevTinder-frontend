import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

function Profile() {
  const user = useSelector((store) => store.user);
  return (
    <div className=''>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile