import './App.css';
import { useState } from 'react';
function App() {
  const [inizio, setInizio] = useState(true);
  const [tentativi, setTentativi] = useState();
  const [id, setId] = useState();
  const [modifica, setModifica] = useState(false);
  const [risultato, setRisultato] = useState(null);
  const [numeroInserito, setNumeroInserito] = useState();

  async function dammiNumero() {
    setInizio(true);
    const response = await fetch('http://localhost:8080/partita',
      {
        method: "POST"
      });
    const data = await response.json();
    setId(data.id);
    setTentativi(data.tentativi);
    setInizio(false);
  }
  function gestisciNumero(e) {
    setNumeroInserito(e.target.value);
  }
  async function indovinaNumero() {
    const response = await fetch(`http://localhost:8080/partita/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ numero: numeroInserito })
      });
    const data = await response.json();
    setTentativi(data.tentativi);
    setRisultato(data.risultato);
    setModifica(true);
  }
  function gestisciPagina(){
    setInizio(true);
    setModifica(false);
    setRisultato(null);
    setNumeroInserito('');
  }
  return (
    <div className="App">
      {
        inizio ?
          (
            <>
              <h1>Gioco dell'indovina numero</h1>
              <button onClick={dammiNumero}>Inizia</button>
            </>
          )
          :
          (
            <>
              <h1>Indovina numero</h1>
              <button onClick={gestisciPagina}>Nuova partita</button>
              <br />
              <h3>Id: {id}</h3>
              <h3>Tentativi: {tentativi}</h3>
        {
          risultato !== 0 &&
          ( 
            <>
            <div>Inserisci un numero tra 1 e 100:</div>
          <input type="number" onChange={gestisciNumero} value={numeroInserito} min={1} max={100} placeholder='Inserisci il numero da indovinare'/>
          <button onClick={indovinaNumero}>Invia</button>
            </>
          )
        
        }
            </>
          )
      }

      {
        modifica &&
        <div>
          {risultato === -1 &&
              <h3><b>Il numero è troppo piccolo</b></h3>}
            {risultato === 1 && 
              <h3><b>Il numero è troppo grande</b></h3>
            }
            {risultato === 0 &&
              <h3><b>Complimenti hai indovinato il numero</b></h3>
              }
            </div>
      }
    </div>
  );
}

export default App;
