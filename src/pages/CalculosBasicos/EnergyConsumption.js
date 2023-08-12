import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'   
import Title from '../../components/Title';

function EnergyConsumption() { 
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("")

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('kW')
  const responseOne = useRef() 

  // Request to the back-end
  const data = {
    hoursPerDay: valueOne,
    daysPerMonth: valueTwo,
    power: valueThree,
    unitOfMeasurement: selectUnit.current,    
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
  
  // Set input radio variable
  const setRadioOne = () => { selectUnit.current = "kW" }
  const setRadioTwo = () => { selectUnit.current = "W" }
  const setRadioThree = () => { selectUnit.current = "HP" }
  const setRadioFour = () => { selectUnit.current = "CV" } 
  

  // Connection with the back-end
  useEffect(() => {
    api.post('energy-consumption', data)    
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
      <Title text={'Consumo de Energia'} />
      
      <div className='container-inputs'> 
        <div>

          <Input text={'Horas por Dia'} value={valueOne} onChange={handleValueOne} />
          <Input text={'Dias por Mês'} value={valueTwo} onChange={handleValueTwo} />     
          <Input text={'Potência'} value={valueThree} onChange={handleValueThree} />

          <div className='container-radio'>
            <div>
              <InputRadioDefaultChecker text={'kW'} onChange={setRadioOne} tag={'kw'}/>
              <InputRadio text={'W'} onChange={setRadioTwo} tag={'w'}/>
              <InputRadio text={'HP'} onChange={setRadioThree} tag={'hp'}/>
              <InputRadio text={'CV'} onChange={setRadioFour} tag={'cv'}/>
            </div>
          </div>
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

export default EnergyConsumption