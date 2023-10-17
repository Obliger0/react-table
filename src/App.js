import { useState } from 'react';
import './App.css';
import { TableCompFromApi } from './components/table/tableFromApi';
import { useRef } from 'react';

function App() {

const [modal, setModal] = useState(false);
const divApp = useRef();

  return (
    <div className="App App-header">
      <div ref={divApp} className={`App ${modal && "block-app"}`}>
        <TableCompFromApi 
            openModal={modal} 
            setOpenModal={setModal} 
            divApp={divApp}/>
      </div>
    </div>
  );
}

export default App;
