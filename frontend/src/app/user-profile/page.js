'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';

const UserProfile = (id) => {
  id = 8
  const [profile, setProfile] = useState([])
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      // Make a PUT request to update the user profile on the server
      await axios.put(`http://localhost:8080/api/users/${id}`, profile);

      // After saving, switch back to view mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        // Make a DELETE request to delete the user account on the server
        await axios.delete(`http://localhost:8080/api/users/${id}`);

        // Handle the user account deletion (e.g., log out or redirect)
      } catch (error) {
        console.error('Error deleting user account:', error);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // make a GET request to backend server via axios
        const response = await axios.get(`http://localhost:8080/api/users/${id}`)

        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchProfile()
  }, [id])

  if (!profile) {
    // Render a loading message or loading spinner while fetching data
    return <p>User profile does not exist.</p>;
  }

  return (
    <div className="flex-1 max-w-3xl">
      {isEditing ? (
        <div>
          <h2>Edit Profile</h2>
          <label>Name:
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </label>
          <label>Email:
            <input
              type="text"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </label>
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{profile.name}</h2>
          <p>Email: {profile.email}</p>
          <button onClick={handleEditClick}>Edit Profile</button>
          <button onClick={handleDeleteClick}>Delete Account</button>
        </div>
      )}
    </div>
  )
};

export default UserProfile;
