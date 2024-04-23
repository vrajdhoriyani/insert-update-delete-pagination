import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';
import Dashboadr from './Dashboadr';
import AddNewItem from './AddNewItem';
import Updateitem from './Updateitem';
import DeleteItem from './DeleteItem';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Dashboadr' element={<Dashboadr />} />
        <Route path='/AddNewItem' element={<AddNewItem />} />
        <Route path='/Updateitem/:id' element={<Updateitem />} />
        <Route path='/DeleteItem/:id' element={<DeleteItem />} />
      </Routes>
    </>
  );
}

export default App;