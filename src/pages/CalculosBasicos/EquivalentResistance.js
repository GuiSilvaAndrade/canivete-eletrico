import { useRef, useState } from 'react'
import { useEffect } from 'react';
import api from '../../services/api';
import Input from '../../components/Input'  
import InputRadio from '../../components/InputRadio'  
import InputRadioDefaultChecker from '../../components/InputRadioDefaultChecked'  
import Title from '../../components/Title';

function EquivalentResistance() {
  const [sendToAPI, setSendToAPI] = useState()
  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")
  const [valueThree, setValueThree] = useState("") 
  const [valueFour, setValueFour] = useState("") 
  const [valueFive, setValueFive] = useState("") 

  // Necessary to use the variable inside the useEffect
  const selectUnit = useRef('serie')
  const responseOne = useRef()

  // Request to the back-end
  const data = {
    r1: valueOne,
    r2: valueTwo,
    r3: valueThree,
    r4: valueFour,
    r5: valueFive,
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
  }

  // Handle input change
  const handleValueOne = (e) => { setValueOne(e.target.value) }
  const handleValueTwo = (e) => { setValueTwo(e.target.value) }
  const handleValueThree = (e) => { setValueThree(e.target.value) }  
  const handleValueFour = (e) => { setValueFour(e.target.value) }  
  const handleValueFive = (e) => { setValueFive(e.target.value) }  

  // Set input radio variable
  const setRadioOne = () => { selectUnit.current = "serie" }
  const setRadioTwo = () => { selectUnit.current = "parallel" }
      
  // Connection with the back-end
  useEffect(() => {
    api.post('equivalent-resistance', data)    
  .then(res => {
    const { response } = res.data[0]
    setSendToAPI() // Avoids having to make 2 clicks on the button
    console.log(data)
    console.log(res.data[0])
    responseOne.current = response    
  }).catch(err =>  {
    console.error(err);
  })
  }, [sendToAPI])


  return (
  <div className='container-main'>
    <div className='container-content'>
      <Title text={'Resistência Equivalente'} />      
      
      <div className='container-inputs'> 
        <div>
          <Input text={'Resistência 1 (Ω)'} value={valueOne} onChange={handleValueOne} />
          <Input text={'Resistência 2 (Ω)'} value={valueTwo} onChange={handleValueTwo} />        
          <Input text={'Resistência 3 (Ω)'} value={valueThree} onChange={handleValueThree} />
          <Input text={'Resistência 4 (Ω)'} value={valueFour} onChange={handleValueFour} />        
          <Input text={'Resistência 5 (Ω)'} value={valueFive} onChange={handleValueFive} /> 

          <div className='container-radio'>
            <div>
              <InputRadioDefaultChecker text={'Série'} onChange={setRadioOne} />
              <InputRadio text={'Paralelo'} onChange={setRadioTwo} />
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
      </div>
    </div>
  </div>
)}

export default EquivalentResistance