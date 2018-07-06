import React from 'react';
import axios from 'axios';

import ButtonCreate from '~/components/ButtonCreate';
import FactureItem from './componentsFactures/FactureItem';
import FacturesListHead from './componentsFactures/FacturesListHead';
import FactureEchueListHead from './componentsFactures/FactureEchueListHead';
import FactureEchue from './componentsFactures/FactureEchue';

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

  addReminder = id => () => {
    const factures = this.state.factures.map((facture) => {
      if (facture.id === id) {
        return { ...facture, reminder: 1 };
      }
      return facture;
    });
    this.setState({
      factures,
    });
  }

  handleChevron = (type) => () => {
    console.log(type);
  }

  orderBy = () => {
    return [...this.state.factures].sort((a, b) => (new Date(b.date) - new Date(a.date)));
  }

  render() {
    const today = new Date();
    // Pour les factures échues
    const listFacturesEchuesJSX = this.state.factures.filter((facture) => {
      const deadLine = new Date(facture.deadline1);
      return !facture.paid && deadLine < today;
    });
    const facturesEchuesJSX = listFacturesEchuesJSX.map(facture => (
      <FactureEchue
        key={facture.id}
        {...facture}
        onClick={this.addReminder}
      />
    ));
    // pour les 5 derniers factures
    const orderedFactures = this.orderBy();
    const facturesJSX = orderedFactures.map(facture => (
      <FactureItem
        key={facture.id}
        {...facture}
      />
    ));
    const lastFactures = facturesJSX.slice(0, 5);
    return (
      <div className="page-container-facture">
        {/* titre */}
        <h1 className="titre">Vos dernières factures</h1>
        {/* bouton création facture */}
        <ButtonCreate class="facture-create-button" type="facture" />
        {/* div de la list des 5 dernière factures */}
        <div className="factures-box">
          {/* en tête de la liste */}
          <FacturesListHead clickChevron={this.handleChevron} />
          {/* 5 dernière factures */}
          {lastFactures}
        </div>
        {/* div des factures echues */}
        <div className="factures-echues">
          {/* titre */}
          <h2 className="factures-echues-title">Factures échues</h2>
          {/* en tête */}
          <FactureEchueListHead />
          {/* div de la liste des echues */}
          <div className="facture-echues-contain">
            {/* list des echues */}
            {facturesEchuesJSX}
          </div>
        </div>
        {/* bouton pour totue les factures */}
        <button className="btn-fact-home">Voir toutes mes factures</button>
      </div>
    );
  }
}

export default Home;
