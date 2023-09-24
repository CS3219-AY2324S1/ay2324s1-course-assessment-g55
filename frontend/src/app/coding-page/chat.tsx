import { useState } from 'react';
import { Box, Card, CardBody, Textarea, Button, Flex } from '@chakra-ui/react';

export function Chat() {

  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== '') {
      setChatHistory([...chatHistory, message]);
      setMessage('');
    }
  };

  return (
    <Card height="100%" variant="outline" overflowY="auto">
      <CardBody display="flex" flexDirection="column" flex="1">
        <Box flex="1" overflowY="auto">
          {chatHistory.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Box>
        <Flex>
          <Textarea
            value={message}
            onChange={handleInputChange}
            placeholder="Type your message..."
            size="sm"
            resize="none"
          />
          <Button ml={2} onClick={handleSubmit} size="sm" colorScheme="blue">
            Send
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};