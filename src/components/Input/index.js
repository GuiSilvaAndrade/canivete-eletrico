function Input ({text, value, onChange}) {
  return (
    <div className='container-individual-input'>
      <div className='label'>
        <label>{text}</label>
      </div>
      <div className='input'>
        <input type="number" value={value} onChange={onChange} />  
      </div>        
    </div>
  )
}

export default Input