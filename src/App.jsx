import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login  from './components/auth/login'
import Signup from './components/auth/signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/business/Companies'
import CompanyCreate from './components/business/CompanyCreate'
import CompanySetup from './components/business/CompanySetup'
import BusinessJobs from './components/business/BusinessJobs'
import PostJob from './components/business/PostJob'
import Applicants from './components/business/Applicants'
import ProtectedRoute from './components/business/ProtectedRoute'
import Company from './components/admin/Company'
import JobsByCompanyId from './components/admin/JobsBycompanyId'
import User from './components/admin/User'
import TentangKami from './components/TentangKami'
import Perusahaan from './components/Perusahaan'
import Pekerjaan from './components/Pekerjaan'
import CompanyDescription from './components/CompanyDescription'
import Setting from './components/Setting'

const appRouter = createBrowserRouter ([
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
    path:'/perusahaan',
    element:<Perusahaan/>
  },
  {
    path:'/job/:companyId',
    element:<Pekerjaan/>
  },
  {
    path:'/tentangKami',
    element:<TentangKami/>
  },
  {
    path:"/description/:id",
    element:<JobDescription/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/description/company/:companyId',
    element:<CompanyDescription/>
  },
  {
    path:'/setting',
    element:<Setting />
  },
  //business
  {
    path:"/business/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/business/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/business/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/business/jobs",
    element:<ProtectedRoute><BusinessJobs /></ProtectedRoute>
  },
  {
    path:"/business/jobs/create",
    element:<ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path:"/business/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants /></ProtectedRoute>
  },
  
  //Admin
  {
    path:"/admin/company",
    element:<ProtectedRoute><Company /></ProtectedRoute>
  },
  {
    path: "/admin/alljob/:companyId", // New route for jobs by company ID
    element: <ProtectedRoute><JobsByCompanyId /></ProtectedRoute>
  },
  {
    path: "/admin/pengguna", // New route for jobs by company ID
    element: <ProtectedRoute><User/></ProtectedRoute>
  },
])

function App() {

  return (
   <div>
  <RouterProvider router = {appRouter} />
   </div>
   
  )
}

export default App
