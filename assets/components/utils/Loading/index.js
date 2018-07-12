import React from 'react';
import FaSpinner from 'react-icons/lib/fa/spinner';

import './loading.scss';

const Loading = () => (
  <div className="utils-loading">
    <span>Chargement...</span>
    <FaSpinner className="utils-loading-spinner" />
  </div>
);

export default Loading;
