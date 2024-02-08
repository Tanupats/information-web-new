import React ,{useEffect}from 'react';
import NavbarMenu from './components/NavbarMenu';
import Container from 'react-bootstrap/esm/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import "video-react/dist/video-react.css"; // import css
import './App.css';
import Footer from './components/Footer'

function App() {
  
  return (
    <>
      <Container fluid>

      <NavbarMenu/>
     

      </Container>
  <Footer/> 
    </>
  )
}

export default App
