import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import "./styles.css";
import api from './services/api';

export default function App() {

const [input, setInput] = useState('')
const [cep, setCep] = useState('')

/*Por ser algo assincrono e por termos que fazer requisição em uma api transformamos a função em uma função assincrona*/
async function handleChange(){
  // cep/json/ (isso é a url da api)
  
  if(input === ''){
    alert("Preencha algum CEP")
    return;
  }
    
  try{
    /*Aqui nos pegamos o input e usamos esse /json pq é a url so site da api*/
    const response = await api.get(`${input}/json`);
    //response.data pq quando damos so response ele nos passa várias informações da api, mas dessa informações aonde tem as informações que queremos é data
    setCep(response.data)
    setInput("")
  } catch{
    alert("Ops erro ao buscar")
    setInput("")
  }
  
}

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput"> 
        <input  
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        //O que esse onChange faz?
        //Quando há uma mudança no input o valor do elemento é alterado, ele pega o que está sendo digitado e passa pro setInput
        onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSearch" onClick={handleChange}>
          <FiSearch size={25} color="#ffffff"/>
        </button>
      </div>

      
      {//Renderização condicional, apenas quando cep.lenght for diferente de 0 que nossa mais será renderizada
      Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )}
      
    </div>
  );
}

