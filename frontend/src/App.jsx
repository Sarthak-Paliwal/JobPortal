
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Login from './components/auth/Login.jsx'
import Signup from './components/auth/Signup.jsx'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies.jsx'
import CreateCompany from './components/admin/CreateCompany'
import SetupCompany from './components/admin/SetupCompany'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import JobApplicants from './components/admin/JobApplicants'
import ProtectedRoutes from './components/admin/ProtectedRoutes'
import AuthenticateRoutes from './components/auth/AuthenticateRoutes'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  { 
    path:'/description/:id',
    element:<AuthenticateRoutes><JobDescription/></AuthenticateRoutes>
  },
  // Student authenticated routes
  {
    path:'/browse',
    element:<AuthenticateRoutes><Browse/></AuthenticateRoutes>
  },
  {
    path:'/profile',
    element:<AuthenticateRoutes><Profile/></AuthenticateRoutes>
  },
  // Admin routes (recruiter only)
  {
    path:"/admin/companies",
    element:<ProtectedRoutes><Companies/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoutes><CreateCompany/></ProtectedRoutes>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoutes><SetupCompany/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoutes><AdminJobs/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/post",
    element:<ProtectedRoutes><PostJob/></ProtectedRoutes>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoutes><JobApplicants/></ProtectedRoutes>
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
