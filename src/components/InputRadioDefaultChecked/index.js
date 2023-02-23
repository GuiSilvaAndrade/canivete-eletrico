function InputRadioDefaultChecked ({text, onChange, tag, name}) {
  return ( 
    <div className='container-input-radio'>
      <input onChange={onChange} type="radio" id={tag} name={name} defaultChecked/>
      <label htmlFor={tag}>{text}</label>
    </div>
  )
}

export default InputRadioDefaultChecked


