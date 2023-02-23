import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'  

function ResistenciaEquivalente() {
  const [sendToAPI, setSendToAPI] = useState()
  const [res1, setRes1] = useState("")
  const [res2, setRes2] = useState("")
  const [res3, setRes3] = useState("")
  const [res4, setRes4] = useState("")
  const [res5, setRes5] = useState("")
  const [radioInput, setRadioInput] = useState(true)

  const cleanAll = () => {
    setRes1('')
    setRes2('')
    setRes3('')
    setRes4('')
    setRes5('')
    responsePrincipal.current = ''
  }

  const handleChangeRes1 = (e) => {
    setRes1(e.target.value)
  }
  const handleChangeRes2 = (e) => {
    setRes2(e.target.value)
  }
  const handleChangeRes3 = (e) => {
    setRes3(e.target.value)
  }
  const handleChangeRes4 = (e) => {
    setRes4(e.target.value)
  }  
  const handleChangeRes5 = (e) => {
    setRes5(e.target.value)
  }   

  const serie = () => {    
    setRadioInput(true)
  }

  const paralelo = () => {    
    setRadioInput(false) 
  }
    
  const dados = {
    r1: res1,
    r2: res2,
    r3: res3,
    r4: res4,
    r5: res5,
    serie: radioInput
  }

  const responsePrincipal = useRef() // Necessário para usar o textarea dentro do useEffect

  useEffect(() => {
    api.post('resistencia-equivalente', dados)    
  .then(res => {
    const { resistenciaEquivalente } = res.data[0]
    console.log(res.data[0])
    setSendToAPI() // Evita de ter que dar 2 cliques no botão para o textarea renderizar
    if (resistenciaEquivalente !== '0,00') {
      responsePrincipal.current = `Resistência: ${resistenciaEquivalente} Ω`
    }
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
  <div className='container-main'>
    <div className='container-content'>
      <h2 className='main-title'>Resistência Equivalente</h2>    
      
      <div className='container-inputs'> 

        <div>
          <Input text={'Resistência 1 (Ω)'} value={res1} onChange={handleChangeRes1} />
          <Input text={'Resistência 2 (Ω)'} value={res2} onChange={handleChangeRes2} />        
          <Input text={'Resistência 3 (Ω)'} value={res3} onChange={handleChangeRes3} />
        </div> 

        <div>
          <Input text={'Resistência 4 (Ω)'} value={res4} onChange={handleChangeRes4} />        
          <Input text={'Resistência 5 (Ω)'} value={res5} onChange={handleChangeRes5} /> 
          <InputRadioDefaultChecker text={'Série'} onChange={serie} name={'label'} tag={'serie'}/>
          <InputRadio text={'Paralelo'} onChange={paralelo} name={'label'} tag={'paralelo'}/>
        </div> 
        
      </div>
      
      <div>
        <button className='send-button' onClick={setSendToAPI}>Calcular</button> 
        <button className='clear-button' onClick={cleanAll}>Limpar</button> 
      </div>     

      <div className='container-responses'>
        <p>{responsePrincipal.current}</p>             
      </div>
    </div>
  </div>
)}

export default ResistenciaEquivalente