import './styles.scss'
import { Link } from 'react-router-dom'

function Navbar() {
  return ( 
    <div className='navbar'>
      <div className='logo'> 
        <Link to="/">Canivete Elétrico</Link>
      </div>      
    </div>
  )
}

export default Navbar;