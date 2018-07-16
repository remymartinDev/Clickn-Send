import { connect } from 'react-redux';

import Home from '~/components/Invoices/Home';

const sortInvoices = invoices => invoices.sort((a, b) => new Date(b.date) - new Date(a.date));
const lastInvoices = invoices => sortInvoices(invoices).slice(0, 5);
const lateInvoices = (invoices) => {
  const today = new Date();
  return invoices.filter((invoice) => {
    const deadLine = new Date(invoice.deadline1);
    return !invoice.paid && deadLine < today;
  });
};

const mapStateToProps = state => ({
  invoices: lastInvoices(state.data.invoices),
  lateInvoices: lateInvoices(state.data.invoices),
  addReminder: id => console.log('TODO: faire le reminder ', id),
});

export default connect(
  mapStateToProps,
  null,
)(Home);
