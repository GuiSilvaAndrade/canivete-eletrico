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

      <h5>Cálculos</h5>

      <div className='navbar-link'>
        <Link to="/triangulo-de-potencias">Triângulo de Potências</Link>
      </div>
      <div className='navbar-link'>
        <Link to="/triangulo-de-potencias">Queda de Tensão</Link>
      </div>
      <div className='navbar-link'>
        <Link to="/triangulo-de-potencias">Correção de Fator de Potência</Link>
      </div>      

      <h5>Dimensionamentos</h5>

      <div className='navbar-link'>
        <Link to="/triangulo-de-potencias">Disjuntor Geral</Link>
      </div>
      <div className='navbar-link'>
        <Link to="/dimensionamento-cabo-eletrico">Cabo Elétrico</Link>
      </div>
      
    </nav>
  )
}

export default Navbar;