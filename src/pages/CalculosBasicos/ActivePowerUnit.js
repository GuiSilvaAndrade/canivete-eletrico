import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'  
import Title from '../../components/Title';

function ActivePowerUnit() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('kW')
  const responseOne = useRef() 
  const responseTwo = useRef() 
  const responseThree = useRef()  

  // Request to the back-end
  const data = { 
    power: valueOne,
    unit: selectUnit.current
  }

  // Clean all fields
  const cleanAll = () => {
    setValueOne('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }

  // Handle input change
  const handleValueOne = (e) => {setValueOne(e.target.value)}
  
  // Set input radio variable
  const setRadioOne = () => { selectUnit.current = "kW" }
  const setRadioTwo = () => { selectUnit.current = "W" }
  const setRadioThree = () => { selectUnit.current = "HP" }
  const setRadioFour = () => { selectUnit.current = "CV" }   

  // Connection with the back-end
  useEffect(() => {
    api.post('active-power-unit', data)    
  .then(res => {
    const { response1, response2, response3 } = res.data[0] 
    setSendToAPI() // Avoids having to make 2 clicks on the button
    responseOne.current = response1 
    responseTwo.current = response2
    responseThree.current = response3
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])

  return (
  <div className='container-main'>
    <div className='container-content'>
      <Title text={'Unidade de Potência Ativa'} />
      
      <div className='container-inputs'> 
        <div>          
          <Input text={'Potência'} value={valueOne} onChange={handleValueOne} /> 

           <div className='container-radio'>
              <div>
                <InputRadioDefaultChecker text={'kW'} onChange={setRadioOne} />
                <InputRadio text={'W'} onChange={setRadioTwo} />
                <InputRadio text={'HP'} onChange={setRadioThree} />
                <InputRadio text={'CV'} onChange={setRadioFour} />          
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
        <p>{responseTwo.current}</p>             
        <p>{responseThree.current}</p>             
      </div>

    </div>
  </div>
)}

export default ActivePowerUnit