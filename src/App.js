import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

function App() {


  return (
    <BrowserRouter>
      <Home />      
    </BrowserRouter>
  );
}

export default App;
