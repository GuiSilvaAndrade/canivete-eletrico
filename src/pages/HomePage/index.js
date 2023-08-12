import './styles.scss'
import { Link } from 'react-router-dom'


function HomePage() {
  return (
    <div className='container-homepage'>
      <div className='main'>  
        <Link className='item' to="/consumo-de-energia">Consumo de Energia</Link>
        <Link className='item' to="/corrente">Corrente</Link>
        <Link className='item' to="/potencia">Potência</Link>
        <Link className='item' to="/resistencia">Resistência</Link>
        <Link className='item' to="/resistencia-equivalente">Resistência Equivalente</Link>
        <Link className='item' to="/tensao">Tensão</Link>
        <Link className='item' to="/triangulo-de-potencias">Triângulo de Potências</Link>          
        <Link className='item' to="/unidade-de-potencia-ativa">Unidade de Potência Ativa</Link>   

        {/* <Link className='item' to="/interpolacao-linear">Interpolação Linear</Link>   */}       
      </div>
    </div>
  )
}

export default HomePage; 