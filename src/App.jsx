import { useState } from 'react';
import './App.css';
import Page from './components/Page';

function App() {
  const [formIndex, setFormIndex] = useState(1);

  return (
    <div className='container-app'>
      <Page />
    </div>
  );
}

export default App;
