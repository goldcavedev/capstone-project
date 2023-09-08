import React from 'react';

const Loader = ({ src }) => {
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={src}
        alt="Loading..."
        style={{
          position: 'absolute',
          zIndex: 1,
          top: '120px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '150px',
        }}
      />
    </div>
  );
};

export default Loader;
