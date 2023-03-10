import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'   

function EnergyConsumption() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [powerValue, setPowerValue] = useState("")
  const [HoursPerDayValue, setHourPerDayValue] = useState("")
  const [daysPerMonthValue, setDaysPerMonthValue] = useState("") 

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('kW')
  const responseOne = useRef() 

  // Request to the back-end
  const data = {
    power: powerValue,
    unitOfMeasurement: selectUnit.current,
    hoursPerDay: HoursPerDayValue,
    daysPerMonth: daysPerMonthValue
  }

  // Clean all fields
  const cleanAll = () => {
    setPowerValue('')
    setHourPerDayValue('')
    setDaysPerMonthValue('')
    responseOne.current = ''
  }

  // Handle input change
  const handleChangePowerValue = (e) => {setPowerValue(e.target.value)}
  const handleChangeHoursPerDayValue = (e) => {setHourPerDayValue(e.target.value)}
  const handleChangeDaysPerMonthValue = (e) => {setDaysPerMonthValue(e.target.value)}  
  
  // Set input radio variable
  const setW = () => { selectUnit.current = "W" }
  const setKW = () => { selectUnit.current = "kW" }
  const setHP = () => { selectUnit.current = "HP" }
  const setCV = () => { selectUnit.current = "CV" }   
  

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
      <h2 className='main-title'>Consumo de Energia</h2>
      
      <div className='container-inputs'> 
        <div>
          <Input text={'Pot??ncia'} value={powerValue} onChange={handleChangePowerValue} />
          <Input text={'Horas por Dia'} value={HoursPerDayValue} onChange={handleChangeHoursPerDayValue} />          
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
             
          <Input text={'Dias por M??s'} value={daysPerMonthValue} onChange={handleChangeDaysPerMonthValue} />        
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