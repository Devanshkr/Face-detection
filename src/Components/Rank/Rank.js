import React from 'react';

const Rank = ({name, entries}) => {
  return (
    <div>
      <p className='f3 b'>
        {"Welcome to the Face Detection App."}
      </p>
      <div className='f3 black'>
      {`${name}, your current entry count is: `} 
      </div>
      <div className='black f1 pa1'>
        {entries}
      </div>
    </div>
      
      
  );
}

export default Rank;