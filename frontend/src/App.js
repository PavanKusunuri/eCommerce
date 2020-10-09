import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Container>
        <div>Welcome to eCommerce Application</div>
      </Container>
      <Footer />
    </>
  );
}

export default App;
