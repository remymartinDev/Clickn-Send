/**
 * Ce middleware permet d'éviter de générer deux fois de suite la même valeur.
 */
const preventDuplicates = store => next => (action) => {
  // console.log('salut je suis le store', store);
  // console.log('salut je suis la Suite', next);
  // console.log('salut je suis une action', action);
  // console.log('état actuel', store.getState());

  const computeNewValue = () => {
    // Math.random() génère un nombre entre O et 1, d'où la multiplication
    // et le +1 pour ne pas avoir la valeur 0 comme minimum.
    return Math.floor(Math.random() * action.facesNb) + 1;
  };

  if (action.type === 'GENERATE_RANDOM_VALUE') {
    let newValue = computeNewValue();
    while (newValue === store.getState().value) {
      newValue = computeNewValue();
    }
    action.value = newValue;
  }

  next(action);
};

export default preventDuplicates;
