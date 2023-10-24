import {
  Box,
  Text,
  SimpleGrid,
  Avatar,
  Center,
} from "@chakra-ui/react";

const UserCard = ({ user }) => {
  const fullName = `${user.firstname} ${user.lastname || ""}`;
  
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      mb={4}
    >
      <SimpleGrid columns={2} spacing={4}>
        <Center>
          <Avatar size="lg" name={fullName} />
        </Center>
        <Box>
          <Text fontWeight="bold">{fullName}</Text>
          <Text>id: {user.id}</Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};



export default UserCard
