import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  

function TrianguloDePotencias() {
  const [sendToAPI, setSendToAPI] = useState('')
  const [powerValue, setPowerValue] = useState('')
  const [voltageValue, setVoltageValue] = useState('')
  const [fatorPotencia, setFatorPotencia] = useState('')
  const [radioInput, setRadioInput] = useState(true)

  const dados = {
    potencia: powerValue,
    tensao: voltageValue,
    fatorDePotencia: fatorPotencia,
    monofasico: radioInput
  }
  const cleanAll = () => {
    setPowerValue('')
    setVoltageValue('')
    setFatorPotencia('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }
  
  const monoChecked = () => {    
    setRadioInput(true)
  }

  const triChecked = () => {    
    setRadioInput(false) 
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

  const responseOne = useRef() // Necessário para usar o textarea dentro do useEffect
  const responseTwo = useRef() // Necessário para usar o textarea dentro do useEffect
  const responseThree = useRef() // Necessário para usar o textarea dentro do useEffect


  useEffect(() => {
    api.post('triangulo-de-potencias', dados)
  .then(res => {
    const { corrente, potenciaAparente, potenciaReativa, erro, descricaoErro } = res.data[0]
    setSendToAPI() // Evita de ter que dar 2 cliques no botão para o textarea renderizar
    console.log(dados)
    console.log(res.data[0])
    
      if (erro) {
        responseOne.current = `${descricaoErro}`
        responseTwo.current = ''
        responseThree.current = ''
      } else {
        responseOne.current = `Corrente: ${corrente} A`
        responseTwo.current = `Potência aparente: ${potenciaAparente} W`
        responseThree.current = `Potência reativa: ${potenciaReativa} VAR`
      }
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (<div className='container-main teste'>
  <div className='container-content'>

    <h2 className='main-title'>Triângulo de Potências</h2>
    
    <div className='container-inputs'> 
      <div>
        <Input text={'Potência (W)'} value={powerValue} onChange={handleChangePowerValue} />
        <Input text={'Fator de Potência'} value={fatorPotencia} onChange={handleChangeFatorPotencia} />
      </div> 

      <div>
        <Input text={'Tensão (V)'} value={voltageValue} onChange={handleChangeVoltageValue} />           
        <div className='container-input-radio'>
          <input onChange={monoChecked} type="radio" value="monofasico" name="rede" id='mono' defaultChecked/>
          <label htmlFor='mono'>Monofásico</label>
        </div>
        <div className='container-input-radio'> 
          <input onChange={triChecked} type="radio" value="trifasico" name="rede" id='tri' />
          <label htmlFor='tri'>Trifásico</label>
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
)
}

export default TrianguloDePotencias