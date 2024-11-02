import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Display from './Pages/Display';
import { Route,Routes } from 'react-router-dom';
import CreateBlog from './Pages/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Display/>} />
        <Route path='/CreateBlog' element={<CreateBlog />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
