import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Routes ,Route } from 'react-router-dom';
import Home from './components/Home'
import Landing from './components/Landing'
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/home' element={<Home/>} />
          <Route exact path='/' element={<Landing/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
