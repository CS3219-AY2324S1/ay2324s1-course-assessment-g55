'use client'

import UserCard from './user-card'
import Link from "next/link";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { SimpleGrid, Box, Button, Flex } from "@chakra-ui/react";

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
    <Box p={4}>
      <Flex justifyContent="flex-start" p={4}>
        <Link href="/">
          <Button colorScheme="gray" mr={4}>
            Home
          </Button>
        </Link>
      </Flex>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} p={8}>
        {users.length > 0 ? (
          users.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`}>
              <UserCard key={user.id} user={user} p={4} />
            </Link>
          ))
        ) : (
          <Box p={4} textAlign="center">
            No users found.
          </Box>
        )}
      </SimpleGrid>
    </Box>
    
  );
}

export default UserList
