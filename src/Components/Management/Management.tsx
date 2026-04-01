import  { useEffect, useState } from "react"
import EmployeeTable from "./Table";
import { SupabaseClient } from "../../Helper/Supabase";
import toast from "react-hot-toast";

interface Idata {
  
  Name: string,
    Email: string,
    role: string,
    department: string,
};
const Management = () => {
  const[formdata, setFormdata] =useState<Idata>({
    
    Name: "",
    Email: "",
    role: "",
    department: "",
  });
  const [employees,setEmployee] = useState<any[]>([]);

  async function  fetchData() {
    const {data,error} =await SupabaseClient.from("Employee").select("*");
    if(data){
      setEmployee(data);
    }else{
       console.log("error occured", error);
    }
  }

  useEffect(()=>{fetchData()},[])

  const handleChange = (e:any)=> {
      const {name, value} = e.target;

    setFormdata({ ...formdata,
      [name] : value
    });
    }

    const handleSubmit = async(e:any) =>{
      e.preventDefault(); 
      if(formdata.Name==="" || formdata.Email==="" || formdata.department==="" || formdata.role === ""){
        toast.error("please fill all credentials");
        return;
      }
      const {data,error} = await SupabaseClient.from("Employee").insert([
        formdata 
      ]);
      if (error){
        console.log("error occured", error);
      }else{
        console.log("success", data);
        fetchData();
      }
      console.log(formdata);

    
      setFormdata({
        
        Name:"",
        Email:"",
        role:"",
        department:"",
      })
    }
   const deleteEmployee = async (email: string) => {

  const { error } = await SupabaseClient
    .from("Employee")
    .delete()
    .eq("Email", email);

  if (error) {
    console.log("Delete error:", error);
  } else {
    console.log("Employee deleted");
    fetchData();
  }
};

  

  return (
    <div>
   <form onSubmit={handleSubmit}>
    <h1>Employees</h1>
    <label> Enter Your Name </label>
    <input type="text" name = "Name" placeholder="enter name"
     onChange={handleChange} value={formdata.Name} required/>
  <br/>
    <label>Enter Your Mail id. </label>
    <input type="email" name = "Email" placeholder="enter email"
    onChange={handleChange} value={formdata.Email} required/>
    <br/>
    <label>Enter Your Department </label>
    <select  name = "department" 
    onChange={handleChange} value={formdata.department} required> 
    <option value=""> Select department </option>
    <option value="HR">HR</option>
    <option value="IT">IT</option>
    <option value="Finance">Finance</option>
    <option value="Marketing">Marketing</option>
    <option value = "intern">Intern</option>
    </select>
<br/>
    <label>Enter your Role</label>
    <select name="role" 
    onChange={handleChange} value={formdata.role} required> <br/><br/>
  <option value =""> Select role </option>
  <option value = "manager">manager</option>
  <option value = "designer">Designer</option>
  <option value = "developer">Developer</option>
  <option value="intern">Intern</option>
  </select>
  <br/>
    <button type="submit" >Submit</button>

   </form>
   <EmployeeTable
   employees={employees}
   deleteEmployee={deleteEmployee} />
</div>
  )
}

export default Management