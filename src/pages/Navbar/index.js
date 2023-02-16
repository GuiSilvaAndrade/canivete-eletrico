import './styles.scss'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='navbar'>

      <div className='navbar-logo'>
        <Link to="/">Canivete Elétrico</Link>
      </div>

      <h5>Cálculos Básicos</h5>

      <div className='navbar-link'>
        <Link to="/lei-de-ohm">Lei de Ohm</Link>
      </div>

      <div className='navbar-link'>
        <Link to="/resistencia-equivalente">Resistência Equivalente</Link>
      </div>

      <div className='navbar-link'>
        <Link to="/triangulo-de-potencias">Triângulo de Potências</Link>
      </div>



      <h5>Cálculos</h5>


      
       



      <h5>Dimensionamentos</h5>



    </nav>
  )
}

export default Navbar;