import './App.css';
import { useEffect, useState } from 'react';
import CurrentResult from './components/CurrentResult';
import NewResultForm from "./components/NewResultForm";
import { initWeb3, getCurrentTotalResult } from './WebClient';

function App() {
  const [initDone, setInitDone] = useState(false);
  const [totalResult, setTotalResult] = useState();

  useEffect(() => {
    const init = async () => {
      initWeb3().then(_ => {
        setInitDone(true);
        getCurrentTotalResult().then(result => {
          setTotalResult(result);
        })
      });
    }
    init();
  }, []);

  return (
    <div className="App">
      <h1>Paracétamol test result</h1>
      <h2>Pourcentage de réussite actuel : <CurrentResult total={totalResult} /></h2>
      

      <NewResultForm />
    </div>
  );
}

export default App;
