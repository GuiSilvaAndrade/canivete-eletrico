function InputRadio ({ text, onChange}) {
  return ( 
    <div>
      <input onChange={onChange} type="radio" id={text} name="label" />
      <label htmlFor={text}>{text}</label>
    </div>    
  )
}

export default InputRadio