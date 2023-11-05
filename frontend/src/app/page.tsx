import Link from 'next/link';
import { Box, Button, Heading } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p="4">
      <Heading as="h1" size="xl" mb="4">
        Assignment 2
      </Heading>
      <Box p="4">
        <Link href="/questions">
          <Box mb="2">
            <Button colorScheme="teal">
              Question Repository
            </Button>
          </Box>
        </Link>
        <Link href="/login">
          <Box mb="2">
            <Button colorScheme="teal" mb="2">
              User Profile Management
            </Button>
          </Box>
        </Link>
      </Box>
    </Box>
  );
}
