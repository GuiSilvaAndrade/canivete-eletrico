import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'  

function EquivalentResistance() {
  const [sendToAPI, setSendToAPI] = useState()
  const [res1, setRes1] = useState("")
  const [res2, setRes2] = useState("")
  const [res3, setRes3] = useState("")
  const [res4, setRes4] = useState("")
  const [res5, setRes5] = useState("")
  const [radioInput, setRadioInput] = useState(true)

  // Necessary to use the variable inside the useEffect
  const responseOne = useRef()

  // Request to the back-end
  const data = {
    r1: res1,
    r2: res2,
    r3: res3,
    r4: res4,
    r5: res5,
    serie: radioInput
  }

  // Clean all fields
  const cleanAll = () => {
    setRes1('')
    setRes2('')
    setRes3('')
    setRes4('')
    setRes5('')
    responseOne.current = ''
  }

  // Handle input change
  const handleChangeRes1 = (e) => { setRes1(e.target.value) }
  const handleChangeRes2 = (e) => { setRes2(e.target.value) }
  const handleChangeRes3 = (e) => { setRes3(e.target.value) }
  const handleChangeRes4 = (e) => { setRes4(e.target.value) }  
  const handleChangeRes5 = (e) => { setRes5(e.target.value) }   

  // Set input radio variable
  const serie = () => { setRadioInput(true) }
  const parallel = () => { setRadioInput(false) }
      
  // Connection with the back-end
  useEffect(() => {
    api.post('equivalent-resistance', data)    
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
          <InputRadio text={'Paralelo'} onChange={parallel} name={'label'} tag={'paralelo'}/>
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

export default EquivalentResistance