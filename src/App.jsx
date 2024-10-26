import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
// import Display from './Pages/Display';
import { Route,Routes } from 'react-router-dom';
import CreateBlog from './Pages/CreateBlog';

function App() {

  return (
    <>
      <Header />
      <CreateBlog/>
      <Routes>
        {/* <Route path='/' element={<Display/>} /> */}
        <Route path='/CreateBlog' element={<CreateBlog />} />
      </Routes>
    </>
  )
}

export default App
