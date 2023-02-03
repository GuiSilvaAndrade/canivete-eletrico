import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import './styles.scss'

function PowerTriangle() {
  const [sendToAPI, setSendToAPI] = useState()
  const [powerValue, setPowerValue] = useState()
  const [voltageValue, setVoltageValue] = useState()
  const [fatorPotencia, setFatorPotencia] = useState()
  const [radioInput, setRadioInput] = useState(true)

  const dados = {
    potencia: powerValue,
    tensao: voltageValue,
    fatorDePotencia: fatorPotencia,
    monofasico: radioInput
  }
  
  const monoChecked = () => {    
    setRadioInput(true)
    console.log('mono', dados)
  }

  const triChecked = () => {    
    setRadioInput(false)
    console.log('tri', dados)   
  }

  const handleChangePowerValue = (e) => {
    setPowerValue(e.target.value)
  }

  const handleChangeVoltageValue = (e) => {
    setVoltageValue(e.target.value)
  }

  const handleChangeFatorPotencia = (e) => {
    setFatorPotencia(e.target.value)
  }

  const textarea = useRef() // Necessário para usar o textarea dentro do useEffect


  useEffect(() => {
    api.post('power-triangle', dados)
  .then(res => {
    const { corrente, potenciaAparente, potenciaReativa } = res.data[0]
    setSendToAPI() // Evita de ter que dar 2 cliques no botão para o textarea renderizar
    if (corrente > 0) {
    textarea.current = `Corrente: ${corrente} A
Potência aparente: ${potenciaAparente} W
Potência reativa: ${potenciaReativa} VAR
`}
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
    <div className='power-triangle'>

      <h2>Triângulo de Potências</h2>
      
      <div className='container'>  
        <div className='block-input'>
          <div className='label'>
            <label htmlFor='potencia'>Potência (W)</label>
          </div>
          <div className='input'>
            <input type="text" value={powerValue} onChange={handleChangePowerValue} />  
          </div>        
        </div>

        <div className='block-input'>
          <div className='label'>
            <label htmlFor='tensao'>Tensão (V)</label>
          </div>
          <div className='input'>
            <input type="text" value={voltageValue} onChange={handleChangeVoltageValue} />  
          </div>        
        </div>

        <div className='block-input'>
          <div className='label'>
            <label htmlFor='fp'>Fator de Potência</label>
          </div>
          <div className='input'>
            <input type="text" value={fatorPotencia} onChange={handleChangeFatorPotencia} />  
          </div>        
        </div>

        <div className='block-radio'>
          <input onChange={monoChecked} type="radio" value="monofasico" name="rede" id='mono' defaultChecked/>
          <label htmlFor='mono'>Monofásico</label>
        </div>
        <div className='block-radio'> 
          <input onChange={triChecked} type="radio" value="trifasico" name="rede" id='tri' />
          <label htmlFor='tri'>Trifásico</label>
        </div>
      </div> 
      
      <div>
        <button onClick={setSendToAPI}>Enviar</button>   
      </div>

      <textarea value={textarea.current}></textarea> 

    </div>
  )
}

export default PowerTriangle