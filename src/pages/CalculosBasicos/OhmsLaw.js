import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  

function OhmsLaw() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [currentValue, setCurrentValue] = useState("")
  const [voltageValue, setVoltageValue] = useState("")
  const [resistanceValue, setResistanceValue] = useState("") 

  // Necessary to use the variable inside the useEffect
  const responseOne = useRef() // Necessário para usar o textarea dentro do useEffect
  const responseTwo = useRef() 

  // Request to the back-end
  const data = {
    current: currentValue,
    resistance: resistanceValue,
    voltage: voltageValue
  }

  // Clean all fields
  const cleanAll = () => {
    setCurrentValue('')
    setVoltageValue('')
    setResistanceValue('')
    responseOne.current = ''
    responseTwo.current = ''
  }

  // Handle input change
  const handleChangeCurrentValue = (e) => { setCurrentValue(e.target.value) }
  const handleChangeVoltageValue = (e) => { setVoltageValue(e.target.value) }
  const handleChangeResistanceValue = (e) => { setResistanceValue(e.target.value) }  
  
  // Connection with the back-end
  useEffect(() => {
    api.post('ohms-law', data)    
  .then(res => {
    const { response1, response2 } = res.data[0]
    console.log(data)
    console.log(res.data[0])
    setSendToAPI() // Avoids having to make 2 clicks on the button
    responseOne.current = response1
    responseTwo.current = response2    
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
  <div className='container-main'>
    <div className='container-content'>
      <h2 className='main-title-with-observation'>Lei de Ohm</h2>
      <h3 className='observation-title'> Preencha apenas os dois campos onde os valores são conhecidos</h3>      
      
      <div className='container-inputs'> 
        <div>
          <Input text={'Tensão (V)'} value={voltageValue} onChange={handleChangeVoltageValue} />
          <Input text={'Resistência (Ω)'} value={resistanceValue} onChange={handleChangeResistanceValue} />
        </div> 
        <div>
          <Input text={'Corrente (A)'} value={currentValue} onChange={handleChangeCurrentValue} />        
        </div> 
      </div>
      
      <div>
        <button className='send-button' onClick={setSendToAPI}>Calcular</button> 
        <button className='clear-button' onClick={cleanAll}>Limpar</button> 
      </div>     

      <div className='container-responses'>
        <p>{responseOne.current}</p>
        <p>{responseTwo.current}</p>              
      </div>
    </div>
  </div>
)}

export default OhmsLaw