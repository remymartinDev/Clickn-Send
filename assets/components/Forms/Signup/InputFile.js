import React from 'react';
import PropTypes from 'prop-types';

const handleChange = handler => ({ target: { files } }) => {
  handler(files.length ? { file: files[0], name: files[0].name } : {});
};

const InputFile = ({
  input: {
    onChange,
    onBlur,
    value: omitValue,
    ...inputProps
  },
  meta: omitMeta,
  ...props
}) => (
  <input
    type="file"
    onChange={handleChange(onChange)}
    onBlur={handleChange(onBlur)}
    {...inputProps}
    {...props}
  />
);

InputFile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default InputFile;
