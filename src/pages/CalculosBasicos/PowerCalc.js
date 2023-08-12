import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import Title from '../../components/Title';
import Observation from '../../components/Observation';

function PowerCalc() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("") 

  // Necessary to use the variable inside the useEffect
  const responseOne = useRef() // Necessário para usar o textarea dentro do useEffect

  // Request to the back-end
  const data = {
    current: valueOne,
    resistance: valueTwo,
    voltage: valueThree
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
    api.post('power-calculate', data)    
  .then(res => {
    const { response } = res.data[0]
    setSendToAPI() // Avoids having to make 2 clicks on the button
    responseOne.current = response   
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
  <div className='container-main'>
    <div className='container-content'>
      <Title text={'Potência'} />
      <Observation text={'Preencha apenas os dois campos onde os valores são conhecidos'} />
      
      <div className='container-inputs'> 
          <div>
            <Input text={'Corrente (A)'} value={valueOne} onChange={handleValueOne} />
            <Input text={'Resistência (Ω)'} value={valueTwo} onChange={handleValueTwo} />
            <Input text={'Tensão (V)'} value={valueThree} onChange={handleValueThree} />  
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

export default PowerCalc