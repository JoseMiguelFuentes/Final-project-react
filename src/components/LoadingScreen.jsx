
import React from 'react';
import '../styles/loadingScreen.css'
import { Spinner }from 'react-bootstrap'

const LoadingScreen = () => {
  return (
    <div className='overlay'>
      <Spinner animation="border" />
      Loading...
    </div>
  );
};

export default LoadingScreen;