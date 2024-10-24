import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Display from './Pages/Display';
import { Route,Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Display/>}>
        </Route>
      </Routes>
    </>
  )
}

export default App
