function InputRadioDefaultChecked ({text, onChange}) {
  return ( 
    <div>
      <input onChange={onChange} type="radio" id={text} name="label" defaultChecked/>
      <label htmlFor={text}>{text}</label>
    </div>
  )
}

export default InputRadioDefaultChecked


