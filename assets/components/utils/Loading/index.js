import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';

import './loading.scss';

const Loading = () => (
  <div className="utils-loading" style={{ top: 0, left: 0 }}>
    <span>Chargement</span>
    <FaSpinner className="utils-loading-spinner" />
  </div>
);

export default Loading;
