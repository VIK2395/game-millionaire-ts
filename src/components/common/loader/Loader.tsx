import React from 'react';
import './Loader.css';

type LoaderProps = {
  isActive: boolean;
  children: React.ReactElement<any>;
};

const Loader: React.FC<LoaderProps> = ({ isActive, children }) => {
  if (isActive) {
    return (
      <div className="loader">
        <p>Loading...</p>
      </div>
    );
  }
  return children;
};

export default Loader;
