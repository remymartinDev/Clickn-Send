import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './app.styl';

/**
 * L'application simule un lancé de dé.
 */
class App extends React.Component {
  state = {
    toc: null,
  };

  componentWillMount() {
    // appelle ajax vers la route /data
    axios.get('/data')
      .then(({ data }) => {
        // récupération des datas et on récupére également les clé de chaque objet
        const arrayData = Object.keys(data);
        // pour chaque objet on crée un paragraphe avec pour contenue la data.
        // Et on met tout ceci dans un tableau dataData
        const dataData = arrayData.map(element => <p key={data[element]}>{data[element]}</p>);
        // on envois tout a react pour qu'il rafraichie la page avec les données
        this.setState({
          toc: dataData,
        });
      });
  }

  render() {
    const {
      diceFacesNb,
      randomValue,
      generateRandomValue,
    } = this.props;
    return (
      <div>
        {/* affichage des données (paragraphes) */}
        version avec route data : {this.state.toc}
        <h1>{`D${diceFacesNb}`}</h1>
        <p className="message">
          {randomValue}
          <br />
          <button onClick={generateRandomValue}>Lancer le dé !</button>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  diceFacesNb: PropTypes.number.isRequired,
  randomValue: PropTypes.number,
  generateRandomValue: PropTypes.func.isRequired,
};

App.defaultProps = {
  randomValue: 0,
};

export default App;
