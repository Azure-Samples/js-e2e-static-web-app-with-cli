import { useState } from 'react'
import './App.css'

function App() {

    const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const getDataFromApi = async(e: any)=>{

    let contentType;
    let status;

    try{
      e.preventDefault();

      console.log('BEGIN: fetch data')
  
      const data = await fetch(`/api/hello?name=${name}`);

      contentType = data.headers.get('Content-Type')
      status = data.status
      console.log(`${contentType} - ${status}`)

      if(contentType?.includes('json') && status===200){
        const json = await data.json();
  
        console.log('END: fetch data')
    
        if (json.value){
          console.log('MESSAGE: set message')
          setMessage(json.value);
        }
      } else {
        console.log(`wrong content type or status returned`)
      }

    } catch(err: unknown){
      if(err instanceof Error){
        console.log(`GET Data error: ${err?.message}`)
      } else {
        console.log(`GET Data error: ${JSON.stringify(err)}`)
      }
      
    }

  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Static Web App: React App with Azure Function API
        </p>
        <form id="form1" className="App-form" onSubmit={e => getDataFromApi(e)}>
          <div>
            <input 
              type="text" 
              id="name" 
              className="App-input" 
              placeholder="Name" 
              value={name} 
              onChange={e=>setName(e.target.value)} />
            <button type="submit" className="App-button">Submit</button>
          </div>
        </form>
        <div><h5>Message: {message} </h5></div>
      </header>
    </div>
  )
}

export default App
