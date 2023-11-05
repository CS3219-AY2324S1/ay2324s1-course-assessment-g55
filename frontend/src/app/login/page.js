'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Heading,
  useToast
} from "@chakra-ui/react";

const LoginPage = () => {
  const router = useRouter()
  const toast = useToast();

  const [registerData, setRegisterData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users', registerData)

      setRegisterData({
        email: '',
        firstname: '',
        lastname: '',
      });

      if (response.status >= 200 && response.status < 300) {
        router.push("/users")
      }

    } catch (error) {
      console.error('Error creating user:', error)

      toast({
        title: "Error",
        description: "Failed to create a user. Please try again.",
        status: "error",
        duration: 5000, // Display the toast for 5 seconds
        isClosable: true,
      });
    }
  }

  return (
    <Box width="400px" margin="20">
      <Heading as="h2" size="xl" mb={4}>
        Peerprep
      </Heading>
      <Tabs>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>To be coming...</p>
          {/*
          <form onSubmit={handleRegister}>
              <FormControl id="registerFirstname" isRequired>
                <FormLabel>Firstname</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  value={registerData.firstname}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <FormControl id="registerLastname">
                <FormLabel>Lastname</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  value={registerData.lastname}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <FormControl id="registerEmail" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <Button type="submit" mt={4} colorScheme="green">
                Login
              </Button>
            </form>
            */}
          </TabPanel> 
          <TabPanel>
            <form onSubmit={handleRegister}>
            <FormControl id="registerName" isRequired>
                <FormLabel>Firstname</FormLabel>
                <Input
                  type="text"
                  name="firstname"
                  value={registerData.firstname}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <FormControl id="registerName">
                <FormLabel>Lastname</FormLabel>
                <Input
                  type="text"
                  name="lastname"
                  value={registerData.lastname}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <FormControl id="registerEmail" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterInputChange}
                />
              </FormControl>
              <Button type="submit" mt={4} colorScheme="green">
                Register
              </Button>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default LoginPage;
