import './styles.scss'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>
      <h1>Canivete Elétrico</h1>
      <Link to="/">Home</Link>
      <Link to="/triangulo-de-potencias">Triangulo de Potencias</Link>
    </nav>
  )
}

export default Navbar;