import React from 'react';
import axios from 'axios';
import ChevronDown from 'react-icons/lib/fa/chevron-down';

import ButtonCreate from '~/components/ButtonCreate';
import FactureItem from './componentsFactures/FactureItem';

import './factures.scss';

class Home extends React.Component {
  state = {
    factures: [],
  }

  componentDidMount() {
    axios.get('/api/invoices')
      .then(({ data: factures }) => {
        this.setState({
          factures,
        });
      });
  }

  render() {
<<<<<<< HEAD
    const dateString = '27-06-2018';
    console.log(dateString);
    const dateDate = new Date(dateString);
    console.log(dateDate);
    const orderedFactures = this.state.factures.sort((a, b) => (b.id - a.id));
    const facturesJSX = orderedFactures.map(facture => (
      <FactureItem
        key={facture.id}
        {...facture}
      />
    ));
    const lastFactures = facturesJSX.slice(0, 5);
=======
    const facturesJSX = this.state.factures.map(facture => (
      <FactureItem key={facture.id} {...facture} />
    ));
>>>>>>> 2f76fd8adb485b1a0b338a52a75a5684f3b50b5f
    return (
      <div className="page-container-facture">
        <h1 className="titre">Vos dernières factures</h1>
        <ButtonCreate class="facture-create-button" type="facture" />
        <div className="factures-box">
          <div className="facture-contain">
            <div className="facture-item">Client <ChevronDown className="chevron" /></div>
            <div className="facture-item">Date  <ChevronDown className="chevron" /></div>
            <div className="facture-item">Montant  <ChevronDown className="chevron" /></div>
            <div className="facture-item">Statut  <ChevronDown className="chevron" /></div>
          </div>
          {lastFactures}
        </div>
        <div className="factures-echues">
          <h2 className="factures-echues-title">Factures échues</h2>
          <div className="factures-echues-head">
            <div className="facture-echue-item">Client <ChevronDown className="chevron" /></div>
            <div className="facture-echue-item">Retard  <ChevronDown className="chevron" /></div>
          </div>
          <div className="facture-echues-contain">

          </div>
        </div>
        <button className="btn-fact-home">Voir toutes mes factures</button>
      </div>
    );
  }
}

export default Home;
