import Navbar from './pages/Navbar';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className='layout-app'>
      <div>
        <Navbar />
      </div>
      <div>
        <Outlet />   
      </div>   
    </div>
  );
}

export default App