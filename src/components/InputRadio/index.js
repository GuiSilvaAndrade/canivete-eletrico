function InputRadio ({ text, onChange, tag, name  }) {
  return ( 
    <div className='container-input-radio'>
      <input onChange={onChange} type="radio" id={tag} name={name} />
      <label htmlFor={tag}>{text}</label>
    </div>
  )
}

export default InputRadio


