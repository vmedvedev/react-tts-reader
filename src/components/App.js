import React, { useRef,forwardRef } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import NavBar from './NavBar';
import TextEditor from './TextEditor';
import './App.css';

const App = () => {

  const TextEditorWithRef = forwardRef((props, ref) => (
      <TextEditor ref={ref}/>
  ));

  const TextEditorEl = useRef();

  return (
    <Box>
      <NavBar textFieldRef={TextEditorEl}/>
      <Container maxWidth="md" style={{minWidth: 660}}>
        <TextEditorWithRef ref={TextEditorEl}/>
      </Container>
    </Box>
  );
}

export default App;
