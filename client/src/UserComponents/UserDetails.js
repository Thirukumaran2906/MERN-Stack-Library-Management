import React from 'react'
import './usersDetails.css'

const UserDetails = ({userData}) => {
  return (
    <div class="profile-container">
    <div class="profile-header">
        <h2>Profile</h2>
    </div>
    <div class="profile-info">
        <p><strong>Name : </strong>{userData.name}</p>
        <p><strong>Email : </strong>{userData.email}</p>
        <p><strong>User ID : </strong>{userData._id}</p>
        <p><strong>Number : </strong>{userData.number}</p>
    </div>
</div>
  )
}

export default UserDetails
