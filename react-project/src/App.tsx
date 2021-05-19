import React from 'react';
import * as MyButtonModule from './MyButton';

function App() {
  const [state, setState] = React.useState(true);

  return (
    <div>
      {[1,2,3,4,5,6,7,8,9,10].map((number)=>(
        <div>{number}</div>
      ))}
    </div>
  );
}

export default App;
