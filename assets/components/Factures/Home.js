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
    const today = new Date();
    const facturesEchuesJSX = this.state.factures.filter((facture) => {
      const deadLine = new Date(facture.deadline1);
      return deadLine < today;
    });
    console.log(facturesEchuesJSX);

    const orderedFactures = this.state.factures.sort((a, b) => (b.id - a.id));
    const facturesJSX = orderedFactures.map(facture => (
      <FactureItem
        key={facture.id}
        {...facture}
      />
    ));
    const lastFactures = facturesJSX.slice(0, 5);
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
