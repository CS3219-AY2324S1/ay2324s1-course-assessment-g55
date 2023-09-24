import MonacoEditor from 'react-monaco-editor';
import { Flex, Box, Card, CardBody, Button, Select } from '@chakra-ui/react';
import { useState } from 'react';

export function Editor() {

  const [selectedLanguage, setSelectedLanguage] = useState<string>('javascript'); // Default language
    
  const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'c++' },
    { label: 'C', value: 'c' },
  ];
    
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };

  return (
    <Card height="100vh" display="flex" flexDirection="column">
      <CardBody display="flex" flexDirection="column" flex="1">
        <Flex justify="flex-end" pr={4}>
          {/* Language Change */}
          <Select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            width="150px"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Flex>

        <Box p={4} flex="1">
          {/* Monaco Editor */}
          <MonacoEditor
            width="100%"
            height="100%"
            language={selectedLanguage}
            theme="vs-dark"
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: 'line',
              automaticLayout: true,
            }}
          />
        </Box>
        
        <Box pl={4}>
          {/* Action buttons or controls */}
          <Button mt={4} colorScheme="blue">
            Save
          </Button>
        </Box>
      </CardBody>
    </Card>
  );
};