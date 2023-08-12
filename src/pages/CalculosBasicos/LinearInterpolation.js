import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'  
import Title from '../../components/Title';

function PowerTriangle() {
  // States
  const [sendToAPI, setSendToAPI] = useState('')
  const [powerValue, setPowerValue] = useState('')
  const [voltageValue, setVoltageValue] = useState('')
  const [powerFactor, setPowerFactor] = useState('')
  const [radioInput, setRadioInput] = useState(true)

  // Necessary to use the variable inside the useEffect
  const responseOne = useRef()
  const responseTwo = useRef()
  const responseThree = useRef()

  // Request to the back-end
  const data = {
    power: powerValue,
    voltage: voltageValue,
    powerFactor: powerFactor,
    monophasic: radioInput
  }
  
  // Clean all fields
  const cleanAll = () => {
    setPowerValue('')
    setVoltageValue('')
    setPowerFactor('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }

  // Handle input change
  const handleChangePowerValue = (e) => { setPowerValue(e.target.value) }
  const handleChangeVoltageValue = (e) => { setVoltageValue(e.target.value) }
  const handleChangePowerFactor = (e) => { setPowerFactor(e.target.value) }
  
  // Set input radio variable
  const monophasicChecked = () => { setRadioInput(true) }
  const triphasicChecked = () => {  setRadioInput(false) }
  
  // Connection with the back-end
  useEffect(() => {
    api.post('power-triangle', data)
  .then(res => {
    const { response1, response2, response3 } = res.data[0]
    setSendToAPI() // Evita de ter que dar 2 cliques no botão para o textarea renderizar
    responseOne.current = response1
    responseTwo.current = response2
    responseThree.current = response3    
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (<div className='container-main teste'>
  <div className='container-content'>

    <h2 className='main-title'>Interpolação Linear</h2>
    
    <div className='container-inputs'>       
      <div>
        <Input text={'Valor mínimo equipamento'} value={powerValue} onChange={handleChangePowerValue} />
        <Input text={'Valor mínimo real'} value={powerFactor} onChange={handleChangePowerFactor} />
        <Input text={'Valor a ser interpolado'} value={powerFactor} onChange={handleChangePowerFactor} />      
        <Input text={'Valor máximo equipamento'} value={voltageValue} onChange={handleChangeVoltageValue} />       
        <Input text={'Valor máximo real'} value={voltageValue} onChange={handleChangeVoltageValue} />       
        <Input text={'Resultado'} value={voltageValue} onChange={handleChangeVoltageValue} />       
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
)
}

export default PowerTriangle