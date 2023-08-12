import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import Title from '../../components/Title';
import Observation from '../../components/Observation';

function Defaut() {
  // States
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("") 
  const [valueFour, setValueFour] = useState("") 
  const [valueFive, setValueFive] = useState("") 

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('kW')
  const responseOne = useRef() // Necessário para usar o textarea dentro do useEffect
  const responseTwo = useRef() // Necessário para usar o textarea dentro do useEffect
  const responseThree = useRef() // Necessário para usar o textarea dentro do useEffect

  // Request to the back-end
  const data = {
    data1: valueOne,
    data2: valueTwo,
    data3: valueThree,
    data4: valueThree,
    data5: valueThree,
    type: selectUnit.current
  }

  // Clean all fields
  const cleanAll = () => {
    setValueOne('')
    setValueTwo('')
    setValueThree('')
    setValueFour('')
    setValueFive('')
    responseOne.current = ''
    responseTwo.current = ''
    responseThree.current = ''
  }

  // Handle input change
  const handleValueOne = (e) => { setValueOne(e.target.value) }
  const handleValueTwo = (e) => { setValueTwo(e.target.value) }
  const handleValueThree = (e) => { setValueThree(e.target.value) }  
  const handleValueFour = (e) => { setValueFour(e.target.value) }  
  const handleValueFive = (e) => { setValueFive(e.target.value) }  

  // Set input radio variable
  const setRadioOne = () => { selectUnit.current = "W" }
  const setRadioTwo = () => { selectUnit.current = "kW" }
  const setRadioThree = () => { selectUnit.current = "HP" }
  const setRadioFour = () => { selectUnit.current = "CV" }    
  const setRadioFive = () => { selectUnit.current = "CV" }    
  
  // Connection with the back-end
  useEffect(() => {
    api.post('data-api', data)    
  .then(res => {
    const { response1, response2 , response3 } = res.data[0]
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
      <Title text={'Título'} />
      <Observation text={'Observação (Quando necessário)'} />
      
      <div className='container-inputs'> 
          <div>
            <Input text={'Valor 1'} value={valueOne} onChange={handleValueOne} />
            <Input text={'Valor 2'} value={valueTwo} onChange={handleValueTwo} />
            <Input text={'Valor 3'} value={valueThree} onChange={handleValueThree} />   
            <Input text={'Valor 4'} value={valueFour} onChange={handleValueFour} />   
            <Input text={'Valor 5'} value={valueFive} onChange={handleValueFive} />  

            <div className='container-radio'>
              <div>
                <InputRadioDefaultChecker text={'kW'} onChange={setRadioOne} />
                <InputRadio text={'W'} onChange={setRadioTwo} />
                <InputRadio text={'HP'} onChange={setRadioThree} />
                <InputRadio text={'CV'} onChange={setRadioFour} />          
                <InputRadio text={'CV'} onChange={setRadioFive} />          
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

export default Defaut