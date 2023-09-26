'use client'

import { Box, Flex } from '@chakra-ui/react';
import { QuestionDisplay } from "./question-display";
import { Editor } from "./editor";
import { Chat } from "./chat";

export default function CodingPage() {
  return (<main>
    <Flex>
      <Box w='40%'>
      <div style={{ height: '70%', overflowY: 'auto' }}>
            <QuestionDisplay id='1'/>
          </div>
          <div style={{ height: '30%', overflowY: 'auto' }}>
            <Chat />
          </div>
      </Box>
      <Box w='60%'>
        <Editor />
      </Box>
    </Flex>
  </main>);
}
