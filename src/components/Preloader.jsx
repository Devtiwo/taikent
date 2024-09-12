import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <img src="/images/taikent.png" alt="loading" className="w-28 h-auto animate-zoomInOut" />
    </div>
  )
}

export default Preloader;