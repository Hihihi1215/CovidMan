import logo from '../logo.svg';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import SelectOrganisation from './SelectOrganisation';
import RegisterAidApplicant from './RegisterAidApplicant';
import AidAppConfirmationModal from '../components/AidAppConfirmationModal';
import RegisterCovidManAdmin from './RegisterCovidManAdmin';
import ManageOrganization from './ManageOrganization';
import AdminConfirmationModal from '../components/AdminConfirmationModal';

function App() {

  const showModal = () => {
    const modal = document.querySelector('.confirmation-modal');
    modal.classList.add('confirmation-modalShow');
  }

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="*" 
            element={<Navigate to="/Home" replace />} />
          <Route path='/Home' element={
            <>
              <Home/>
            </>
          }/>
          <Route path='/SignIn' element={
            <>
              <SignIn/>
            </>
          }/>
          <Route path='/SelectOrg' element={
            <>
              <SelectOrganisation/>
            </>
          }/>
          <Route path='/RegisterApp' element={
            <>
              <RegisterAidApplicant showModal={showModal}/>
              <AidAppConfirmationModal/>
            </>
          }/>
          <Route path='/RegisterAdmin' element={
            <>
              <RegisterCovidManAdmin showModal={showModal}/>
              <AdminConfirmationModal/>
            </>
          }/>
          <Route path='/ManageOrg' element={
            <>
              <ManageOrganization/>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
