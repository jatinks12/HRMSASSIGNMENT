import  { useEffect, useState } from "react"
import EmployeeTable from "./Table";
import { SupabaseClient } from "../../Helper/Supabase";

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
      const {data,error} = await SupabaseClient.from("Employee").insert([
        formdata 
      ]);
      if (error){
        console.log("error occured", error);
      }else{
        console.log("success", data);
      }
      console.log(formdata);

    
      setFormdata({
        
        Name:"",
        Email:"",
        role:"",
        department:"",
      })
    }
      const deleteEmployee = async (id: number) => {

  const deleteEmployee = async (id: number) => {

  if (!window.confirm("Are you sure you want to delete this employee?")) {
    return;
  }

  const { error } = await SupabaseClient
    .from("Employee")
    .delete()
    .eq("id", id);

  if (error) {
    console.log("Delete error:", error);
    return;
  }

  fetchData();
};
};
  return (
    <div>
   <form onSubmit={handleSubmit}>
    <h1>Employees</h1>
    <label> Enter Your Name </label>
    <input type="text" name = "Name" placeholder="enter name"
     onChange={handleChange} value={formdata.Name}/>
  <br/>
    <label>Enter Your Mail id. </label>
    <input type="text" name = "Email" placeholder="enter email"
    onChange={handleChange} value={formdata.Email} />
    <br/>
    <label>Enter Your Department</label>
    <input type="text" name = "department" placeholder="enter department" 
    onChange={handleChange} value={formdata.department}/>
<br/>
    <label>Enter your Role</label>
    <input type="text" name="role" placeholder="enter role" 
    onChange={handleChange} value={formdata.role}/><br/><br/>
  <button type="submit" >Submit</button>
  <br/>
   </form>
   <EmployeeTable
   employees={employees}
   deleteEmployee={deleteEmployee} />
</div>
  )
}

export default Management