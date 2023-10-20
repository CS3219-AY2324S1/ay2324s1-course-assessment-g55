'use client'

import UserCard from './user-card'
import { useState, useEffect } from 'react'
import axios from 'axios'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // make a GET request to backend server via axios
        const response = await axios.get('http://localhost:8080/api/users')
        // update the users state with the retrieved data
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchAllUsers()
  }, [users])

  return (
    <div className="flex-1 max-w-3xl">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList
