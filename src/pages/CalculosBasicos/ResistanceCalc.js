import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import Title from '../../components/Title';
import Observation from '../../components/Observation';

function OhmsLaw() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("") 

  // Necessary to use the variable inside the useEffect
  const responseOne = useRef() // Necessário para usar o textarea dentro do useEffect

  // Request to the back-end
  const data = {
    voltage: valueOne,
    current: valueTwo,
    power: valueThree
  }

  // Clean all fields
  const cleanAll = () => {
    setValueOne('')
    setValueTwo('')
    setValueThree('')
    responseOne.current = ''
  }

  // Handle input change
  const handleValueOne = (e) => { setValueOne(e.target.value) }
  const handleValueTwo = (e) => { setValueTwo(e.target.value) }
  const handleValueThree = (e) => { setValueThree(e.target.value) }  
  
  // Connection with the back-end
  useEffect(() => {
    api.post('resistance-calculate', data)    
  .then(res => {
    const { response1 } = res.data[0]
    setSendToAPI() // Avoids having to make 2 clicks on the button
    responseOne.current = response1   
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
  <div className='container-main'>
    <div className='container-content'>
      <Title text={'Resistência'} />
      <Observation text={'Preencha apenas os dois campos onde os valores são conhecidos'} />
      
      <div className='container-inputs'> 
          <div>
            <Input text={'Tensão (V)'} value={valueOne} onChange={handleValueOne} />
            <Input text={'Corrente (A)'} value={valueTwo} onChange={handleValueTwo} />
            <Input text={'Potência (W)'} value={valueThree} onChange={handleValueThree} />   
          </div>         
      </div>
      
      <div>
        <button className='send-button' onClick={setSendToAPI}>Calcular</button> 
        <button className='clear-button' onClick={cleanAll}>Limpar</button> 
      </div>     

      <div className='container-responses'>
        <p>{responseOne.current}</p>            
      </div>
    </div>
  </div>
)}

export default OhmsLaw