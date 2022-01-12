import React from 'react';

import './spinner.styles.scss';

const Spinner = ({overlayStyles, containerStyles}) => (
  <div className='spinner-overlay' style={overlayStyles}>
    <div className='spinner-container' style={containerStyles}/>
  </div>
);

export default Spinner;
