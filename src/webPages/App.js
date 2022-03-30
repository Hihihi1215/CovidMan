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
import ViewAppeals from './ViewAppeals';
import OrgRepHome from './OrgRepHome';
import ProtectedRoute from './ProtectedRoute';
import ViewOrgAppeals from './ViewOrgAppeals';
import RecordAidDisbursement from './RecordAidDisbursement';
import NavbarCovidMan from '../components/NavbarCovidMan';
import OrganizeAidAppeal from './OrganizeAidAppeal';
import OrganizeAppealConfirmationModal from '../components/OrganizeAppealConfirmationModal';
import RecordContribution from './RecordContribution';
import RecordOutcomeSuccess from '../components/RecordOutcomeSuccess';
import SignUp from './SignUp';

function App() {

  const showModal = () => {
    const modal = document.querySelector('.confirmation-modal');
    modal.classList.add('confirmation-modalShow');
  }

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/Home' element={
            <>
              <NavbarCovidMan/>
              <Home/>
            </>
          }/>
          <Route path='/SignIn' element={
            <>
              <SignIn/>
            </>
          }/>
          <Route path='/SignUp' element={
            <>
              <SignUp/>
            </>
          }/>
          <Route path='/SelectOrg' element={
            <>
              <SelectOrganisation/>
            </>
          }/>
          <Route path='/OrgRepHome' element={
            <>
              <ProtectedRoute>
                <NavbarCovidMan/>
                <OrgRepHome/>
              </ProtectedRoute>
            </>
          }/>
          <Route path='/OrgRepHome/RegisterApp' element={
              <>
                <ProtectedRoute>
                  <RegisterAidApplicant showModal={showModal}/>
                  <AidAppConfirmationModal/>
                </ProtectedRoute>
              </>
          }/>
          <Route path='/OrgRepHome/ViewOrgAppeals' element={
              <>
                <ProtectedRoute>
                  <NavbarCovidMan/>
                  <ViewOrgAppeals/>
                </ProtectedRoute>
              </>
          }/>
          <Route path='/OrgRepHome/RecordAidDisbursement' element={
              <>
                <ProtectedRoute>
                  <NavbarCovidMan/>
                  <RecordAidDisbursement showRecordSuccess={showModal}/>
                  <RecordOutcomeSuccess/>
                </ProtectedRoute>
              </>
          }/>
          <Route path='/OrgRepHome/OrganizeAidAppeal' element={
              <>
                <ProtectedRoute>
                  <OrganizeAidAppeal showModal={showModal}/>
                  <OrganizeAppealConfirmationModal/>
                </ProtectedRoute>
              </>
          }/>
          <Route path='/OrgRepHome/RecordContribution' element={
              <>
                <ProtectedRoute>
                  <NavbarCovidMan/>
                  <RecordContribution/>
                </ProtectedRoute>
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
              <ProtectedRoute>
                <ManageOrganization/>
              </ProtectedRoute>
            </>
          }/>
          <Route path='/ViewAppeals' element={
            <>
              <ViewAppeals/>
            </>
          }/>
          <Route path="*" 
            element={<Navigate to="/Home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
