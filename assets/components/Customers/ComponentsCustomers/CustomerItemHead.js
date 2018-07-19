import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
// import ChevronUp from 'react-icons/lib/fa/chevron-up';


const ProductItemHead = ({ clickChevron }) => (
  <div className="list-contain-client list-contain-client--head">
    <div className="list-item">
      Pro
      <ChevronDown className="chevron" onClick={clickChevron('pro')} />
    </div>
    <div className="list-item">
      Nom
      <ChevronDown className="chevron" onClick={clickChevron('nom')} />
    </div>
    <div className="list-item">
      TVA
    </div>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <React.Fragment>
          <div className="list-item">
            Adresse
          </div>
          <div className="list-item">
            Pays
            <ChevronDown className="chevron" onClick={clickChevron('pays')} />
          </div>
          <div className="list-item">
            Téléphone
          </div>
          <div className="list-item">
            Portable
          </div>
          <div className="list-item">
            E-mail
          </div>
          <div className="list-item">
            Remise
            <ChevronDown className="chevron" onClick={clickChevron('remise')} />
          </div>
        </React.Fragment>
      )}
    </Media>
  </div>
);

ProductItemHead.propTypes = {
  clickChevron: PropTypes.func.isRequired,
};

export default ProductItemHead;
