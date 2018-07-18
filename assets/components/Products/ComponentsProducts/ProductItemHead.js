import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';
import ChevronDown from 'react-icons/lib/fa/chevron-down';
// import ChevronUp from 'react-icons/lib/fa/chevron-up';


const ProductItemHead = ({ clickChevron }) => (
  <div className="list-contain-product list-contain-product--head">
    <Media query="(max-width: 768px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Dén.
          <ChevronDown className="chevron" onClick={clickChevron('denomination')} />
        </div>
      )}
    </Media>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Dénomination
          <ChevronDown className="chevron" onClick={clickChevron('denomination')} />
        </div>
      )}
    </Media>
    <Media query="(max-width: 768px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Réf.
          <ChevronDown className="chevron" onClick={clickChevron('denomination')} />
        </div>
      )}
    </Media>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Référence
          <ChevronDown className="chevron" onClick={clickChevron('reference')} />
        </div>
      )}
    </Media>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Description
          <ChevronDown className="chevron" onClick={clickChevron('description')} />
        </div>
      )}
    </Media>
    <div className="list-item">
      Prix
      <ChevronDown className="chevron" onClick={clickChevron('prix')} />
    </div>
    <Media query="(min-width: 769px)">
      {matches => (
        matches
        &&
        <div className="list-item">
          Unité
          <ChevronDown className="chevron" onClick={clickChevron('unite')} />
        </div>
      )}
    </Media>
    
  </div>
);

ProductItemHead.propTypes = {
  clickChevron: PropTypes.func.isRequired,
};

export default ProductItemHead;
