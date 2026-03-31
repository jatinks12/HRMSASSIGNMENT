import { Route, Routes } from "react-router-dom"
import Dashboard from "./Components/Dashboard/Dashboard"
import Leave from "./Components/leave/Leave"
import Management from "./Components/Management/Management"
import { SupabaseClient } from "./Helper/Supabase"


const App = () => {
 
  return (
   <Routes>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="/leave" element={<Leave/>}/>
    <Route path="/management" element={<Management/>}/>
   </Routes>
  )
}

export default App