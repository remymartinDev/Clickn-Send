import React from 'react';

import ButtonCreate from '~/components/ButtonCreate';

import './dashboard.scss';

export default () => (
  <div className="contain-dash">
    <h1 className="titre"> Bienvenue username </h1>
    <div className="dash-links">
      <ButtonCreate type="facture" />
      <ButtonCreate type="produit" />
      <ButtonCreate type="client" />
    </div>
  </div>
);
