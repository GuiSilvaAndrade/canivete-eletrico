import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  

function LeiDeOhm() {
  const [sendToAPI, setSendToAPI] = useState()
  const [currentValue, setCurrentValue] = useState("")
  const [voltageValue, setVoltageValue] = useState("")
  const [resistanceValue, setResistanceValue] = useState("") 

  const cleanAll = () => {
    setCurrentValue('')
    setVoltageValue('')
    setResistanceValue('')
    responsePrincipal.current = ''
    responsePotencia.current = ''
  }

  const handleChangeCurrentValue = (e) => {
    setCurrentValue(e.target.value)
  }
  const handleChangeVoltageValue = (e) => {
    setVoltageValue(e.target.value)
  }
  const handleChangeResistanceValue = (e) => {
    setResistanceValue(e.target.value)
  }  
    
  const data = {
    corrente: currentValue,
    resistencia: resistanceValue,
    tensao: voltageValue
  }

  const responsePrincipal = useRef() // Necessário para usar o textarea dentro do useEffect
  const responsePotencia = useRef() 

  useEffect(() => {
    api.post('lei-de-ohm', data)    
  .then(res => {
    const { correnteCalculada, resistenciaCalculada, tensaoCalculada, potenciaCalculada, itemCalculo, error } = res.data[0]
    setSendToAPI() // Evita de ter que dar 2 cliques no botão para o textarea renderizar
    if (itemCalculo !== "") {
      if (itemCalculo === "Tensão") {
        responsePrincipal.current = `Tensão: ${tensaoCalculada} V`
        responsePotencia.current = `Potência: ${potenciaCalculada} W`
      } else if (itemCalculo === "Resistência") {
        responsePrincipal.current = `Resistência: ${resistenciaCalculada} Ω`
        responsePotencia.current = `Potência: ${potenciaCalculada} W`
      } else if (itemCalculo === "Corrente") {
        responsePrincipal.current = `Corrente: ${correnteCalculada} A`
        responsePotencia.current = `Potência: ${potenciaCalculada} W`
      } else if (itemCalculo === "Erro"){
        responsePrincipal.current = `${error}.`
        responsePotencia.current = ''
      }      
    }
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
        <p>{responsePrincipal.current}</p>
        <p>{responsePotencia.current}</p>              
      </div>
    </div>
  </div>
)}

export default LeiDeOhm