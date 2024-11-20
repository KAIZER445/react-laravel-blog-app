import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import Display from './Pages/Display';
import { Route,Routes } from 'react-router-dom';
import CreateBlog from './Pages/CreateBlog';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetailPage from './Pages/DetailPage';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Display/>} />
        <Route path='/CreateBlog' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<DetailPage />} />
      </Routes>
      
      <ToastContainer position="bottom-right"/>
    </>
  )
}

export default App
