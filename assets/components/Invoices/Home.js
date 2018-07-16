import React from 'react';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';
import FactureItem from './componentsInvoices/FactureItem';
import FacturesListHead from './componentsInvoices/FacturesListHead';
import FactureEchueListHead from './componentsInvoices/FactureEchueListHead';
import FactureEchue from './componentsInvoices/FactureEchue';

import './factures.scss';

class Home extends React.Component {
  state = {
    filter: {
      type: 'date',
      asc: true,
    },
    filterEchue: {
      type: 'nbJours',
      asc: false,
    },
  }

  handleChevron = type => () => {
    const { type: stateType, asc } = this.state.filter;
    this.setState({
      filter: {
        type,
        asc: type === stateType ? !asc : false,
      },
    });
  }

  handleChevronEchues = type => () => {
    const { type: stateType, asc } = this.state.filterEchue;
    this.setState({
      filterEchue: {
        type,
        asc: type === stateType ? !asc : false,
      },
    });
  }

  orderByDate = factures => (
    [...factures].sort((a, b) => {
      const filter = (new Date(b.date) - new Date(a.date));
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByUser = factures => (
    [...factures].sort((a, b) => {
      const filter = b.customer.lastname.localeCompare(a.customer.lastname);
      return this.state.filter.asc ? filter : -filter;
    })
  )

  orderByUserEchue = factures => (
    [...factures].sort((a, b) => {
      const filter = b.customer.lastname.localeCompare(a.customer.lastname);
      return this.state.filterEchue.asc ? filter : -filter;
    })
  )
  orderByStatut = factures => (
    [...factures].sort((a, b) => {
      const filter = (b.status.id - a.status.id);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByAmount = factures => (
    [...factures].sort((a, b) => {
      const filter = (b.amountAllTaxes - a.amountAllTaxes);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByNbJours = factures => (
    [...factures].sort((a, b) => {
      const filter = (new Date(b.deadline1) - new Date(a.deadline1));
      return this.state.filterEchue.asc ? filter : -filter;
    })
  )
  order = (factures, type) => {
    switch (type) {
      case 'date':
        return this.orderByDate(factures);
      case 'montant':
        return this.orderByAmount(factures);
      case 'client':
        return this.orderByUser(factures);
      case 'clientEchue':
        return this.orderByUserEchue(factures);
      case 'statut':
        return this.orderByStatut(factures);
      case 'nbJours':
        return this.orderByNbJours(factures);
      default:
        return factures;
    }
  }

  addReminder = id => () => {
    this.props.addReminder(id);
  }

  render() {
    console.log(this.props.invoices);
    const invoices = this.order(this.props.invoices, this.state.filter.type);
    console.log(invoices);
    const InvoicesJSX = invoices.map(invoice => (
      <FactureItem
        key={invoice.id}
        {...invoice}
      />
    ));

    const lateInvoices = this.order(this.props.lateInvoices, this.state.filterEchue.type);
    const lateInvoicesJSX = lateInvoices.map(invoice => (
      <FactureEchue
        key={invoice.id}
        {...invoice}
        onClick={this.addReminder}
      />
    ));

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
          {InvoicesJSX}
        </div>
        {/* div des factures echues */}
        <div className="factures-echues">
          {/* titre */}
          <h2 className="factures-echues-title">Factures échues</h2>
          {/* en tête */}
          <FactureEchueListHead clickChevron={this.handleChevronEchues} />
          {/* div de la liste des echues */}
          <div className="facture-echues-contain">
            {/* list des echues */}
            {lateInvoicesJSX}
          </div>
        </div>
        {/* bouton pour toute les factures */}
        <button className="btn-fact-home">Voir toutes mes factures</button>
      </div>
    );
  }
}

Home.propTypes = {
  invoices: PropTypes.array.isRequired,
  lateInvoices: PropTypes.array.isRequired,
  addReminder: PropTypes.func.isRequired,
};

export default Home;
