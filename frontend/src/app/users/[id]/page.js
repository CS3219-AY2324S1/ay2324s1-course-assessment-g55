'use client'

import { Avatar, Box, Heading, Text, Button, VStack, FormControl, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ params }) => {
  const [profile, setProfile] = useState([])
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();
    try {
      // Make a PUT request to update the user profile on the server
      await axios.put(`http://localhost:8080/api/users/${params.id}`, profile);

      // After saving, switch back to view mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error);

      toast({
        title: "Error",
        description: "Failed to update user profile. Please try again.",
        status: "error",
        duration: 5000, // Display the toast for 5 seconds
        isClosable: true,
      });
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        // Make a DELETE request to delete the user account on the server
        await axios.delete(`http://localhost:8080/api/users/${params.id}`);

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
        const response = await axios.get(`http://localhost:8080/api/users/${params.id}`)

        setProfile(response.data)
        setIsLoading(false); 
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchProfile()
  }, [params.id])

  if (isLoading) {
    return <Spinner size="xl" margin="20"/>;
  }

  if (!profile) {
    return <p>User profile does not exist.</p>;
  }

  return (
    <Box margin="20">
      {isEditing ? (
        <form onSubmit={handleSaveClick}>
          <FormControl id="editFirstname" isRequired>
            <FormLabel>Firstname</FormLabel>
            <Input
              type="text"
              name="firstname"
              value={profile.firstname}
              onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
            />
          </FormControl>
          <FormControl id="editLastname" mt={4}>
            <FormLabel>Lastname</FormLabel>
            <Input
              type="text"
              name="lastname"
              value={profile.lastname}
              onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
            />
          </FormControl>
          <FormControl id="editEmail" mt={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Text>{profile.email}</Text>
          </FormControl>
          <FormControl id="editBio" mt={4}>
            <FormLabel>Bio</FormLabel>
            <Input
              type="text"
              name="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </FormControl>
          <Button type="submit" mt={4} colorScheme="green">
            Save
          </Button>
        </form>
        ) : (
        <div>
          <Box borderRadius="lg" overflow="hidden" p={4}>
            <Avatar name={profile.firstname + (profile.lastname || '')} size="xl" mb={4} />
            <VStack align="start" spacing={3}>
              <Heading as="h2" size="lg">
                {profile.firstname + ' ' + (profile.lastname || '')}
              </Heading>
              <Text>
                id: {profile.id}
              </Text>
              <Text>
                Email: {profile.email}
              </Text>
              <Text>
                {profile.bio || 'No bio provided.'} 
              </Text>
            </VStack>
            <Button
              colorScheme="teal"
              mt={4}
              onClick={handleEditClick}
              display={isEditing ? 'none' : 'block'}
            >
              Edit Profile
            </Button>
            <Button
              colorScheme="red"
              mt={4}
              onClick={handleDeleteClick}
            >
              Delete Account
            </Button>
            
          </Box>
        </div>
      )}
    </Box>
  )
};

export default UserProfile;
