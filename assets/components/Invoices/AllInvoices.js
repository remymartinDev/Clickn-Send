import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ButtonCreate from '~/components/ButtonCreate';
import { loadInvoices } from '~/store/reducers/dataActionCreator';
import FacturesListHead from '~/components/Invoices/componentsInvoices/FacturesListHead';
import FactureItem from '~/components/Invoices/componentsInvoices/FactureItem';

import './allInvoices.scss';

class AllInvoices extends React.Component {
  state = {
    filter: {
      type: 'date',
      asc: true,
    },
  }

  componentDidMount() {
    this.props.loadInvoices();
  }

  getInvoicesJSX = () => {
    const orderredInvoices = this.order();
    const invoicesJSX = orderredInvoices.map(invoice => (
      <FactureItem
        key={invoice.id}
        {...invoice}
      />
    ));
    return invoicesJSX;
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
  orderByDate = () => (
    [...this.props.invoices].sort((a, b) => {
      const filter = (new Date(b.date) - new Date(a.date));
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByUser = () => (
    [...this.props.invoices].sort((a, b) => {
      const filter = b.customer.lastname.localeCompare(a.customer.lastname);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByStatut = () => (
    [...this.props.invoices].sort((a, b) => {
      const filter = (b.status.id - a.status.id);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  orderByAmount = () => (
    [...this.props.invoices].sort((a, b) => {
      const filter = (b.amountAllTaxes - a.amountAllTaxes);
      return this.state.filter.asc ? filter : -filter;
    })
  )
  order = () => {
    switch (this.state.filter.type) {
      case 'date':
        return this.orderByDate();
      case 'montant':
        return this.orderByAmount();
      case 'client':
        return this.orderByUser();
      case 'clientEchue':
        return this.orderByUserEchue();
      case 'statut':
        return this.orderByStatut();
      case 'nbJours':
        return this.orderByNbJours();
      default:
        return this.props.invoices;
    }
  }

  render() {
    return (
      <div className="page-container-facture page-container-facture--all">
        <h1 className="titre">Toute vos factures</h1>
        <ButtonCreate class="dacture-create-button" type="facture" />
        <div className="factures-box">
          <FacturesListHead clickChevron={this.handleChevron} />
          {this.getInvoicesJSX()}
        </div>
      </div>
    );
  }
}

AllInvoices.propTypes = {
  loadInvoices: PropTypes.func.isRequired,
  invoices: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  invoices: state.data.invoices,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ loadInvoices }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllInvoices);
