import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import './styles/Loading.css';

function Loading() {
  return (
    <div className='loading'>
      <FaSpinner className='loading-icon' />
    </div>
  );
}

export default Loading;
