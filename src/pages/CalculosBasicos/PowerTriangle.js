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
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("") 

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('mono')
  const responseOne = useRef()
  const responseTwo = useRef()
  const responseThree = useRef()

  // Request to the back-end
  const data = {
    power: valueOne,
    powerFactor: valueTwo,
    voltage: valueThree,
    type: selectUnit.current
  }
  
  // Clean all fields
  const cleanAll = () => {
    setValueOne('')
    setValueTwo('')
    setValueThree('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }

  // Handle input change
  const handleValueOne = (e) => { setValueOne(e.target.value) }
  const handleValueTwo = (e) => { setValueTwo(e.target.value) }
  const handleValueThree = (e) => { setValueThree(e.target.value) }  
  
  // Set input radio variable
  const setRadioOne = () => { selectUnit.current = "monophasic" }
  const setRadioTwo = () => { selectUnit.current = "triphasic" }
  
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
  <Title text={'Triângulo de Potências'} />
    
    <div className='container-inputs'> 
      <div>        
        <Input text={'Potência (W)'} value={valueOne} onChange={handleValueOne} />
        <Input text={'Fator de Potência'} value={valueTwo} onChange={handleValueTwo} />
        <Input text={'Tensão (V)'} value={valueThree} onChange={handleValueThree} /> 

        <div className='container-radio'>
          <div>
          <InputRadioDefaultChecker text={'Monofásico'} onChange={setRadioOne} />
          <InputRadio text={'Trifásico'} onChange={setRadioTwo} />
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
)
}

export default PowerTriangle