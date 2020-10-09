import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <div>Welcome to India Mart</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
