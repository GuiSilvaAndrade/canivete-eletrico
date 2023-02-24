import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'   

function ActivePowerUnit() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [powerValue, setPowerValue] = useState("")

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('kW')
  const responseOne = useRef() 
  const responseTwo = useRef() 
  const responseThree = useRef() 

  // Request to the back-end
  const data = {
    power: powerValue,
    unit: selectUnit.current
  }

  // Clean all fields
  const cleanAll = () => {
    setPowerValue('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }

  // Handle input change
  const handleChangePowerValue = (e) => {setPowerValue(e.target.value)}
  
  // Set input radio variable
  const setW = () => { selectUnit.current = "W" }
  const setKW = () => { selectUnit.current = "kW" }
  const setHP = () => { selectUnit.current = "HP" }
  const setCV = () => { selectUnit.current = "CV" }    

  // Connection with the back-end
  useEffect(() => {
    api.post('active-power-unit', data)    
  .then(res => {
    const { response1, response2, response3 } = res.data[0] 
    setSendToAPI() // Avoids having to make 2 clicks on the button
    console.log(data)
    console.log(res.data[0])
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
      <h2 className='main-title'>Unidade de Potência Ativa</h2>
      
      <div className='container-inputs'> 
        <div>
          <Input text={'Potência'} value={powerValue} onChange={handleChangePowerValue} />    
        </div> 

        <div className='container-radio-consumo'>
          <div className='container-radio-consumo-2'>
            <div className='container-radio-consumo-3'>

            <InputRadioDefaultChecker text={'kW'} onChange={setKW} name ={'label'} tag={'kw'}/>
            <InputRadio text={'W'} onChange={setW} name ={'label'} tag={'w'}/>
            
            </div>

            <div className='container-radio-consumo-3'>

              <InputRadio text={'HP'} onChange={setHP} name={'label'} tag={'hp'}/>
              <InputRadio text={'CV'} onChange={setCV} name={'label'} tag={'cv'}/>
                
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