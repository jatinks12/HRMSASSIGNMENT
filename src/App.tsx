import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard/Dashboard"
import Leave from "./Components/leave/Leave"
import Management from "./Components/Management/Management"
import './App.css'
import Login from "./Components/Authentication/Login"
import SignUp from "./Components/Authentication/SignUp"

const App = () => {
 
  return (
    <>
   <header className="header">
      <div className="logo">HRMS</div>

      <nav className="nav">
        <a href="/">Dashboard</a>
        <a href="/leave">Leave</a>
        <a href="/management">Management</a>
      </nav>
    </header>
   <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/Signup" element={<SignUp/>}/>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/leave" element={<Leave/>}/>
    <Route path="/management" element={<Management/>}/>
   </Routes>

   </>
  )
}

export default App