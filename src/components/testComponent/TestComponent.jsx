import React, {useState} from 'react';

const TestComponent = () => {
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false);

    function handleClick() {
        setCount(c=>c+1);
        setFlag(f=>!f)
    }


    return (
      <div>
          <button onClick={handleClick}>Next</button>
          <h1 style={{color:flag?'blue' :'black'}}>{count}</h1>
      </div>
    );
};

export default TestComponent;
