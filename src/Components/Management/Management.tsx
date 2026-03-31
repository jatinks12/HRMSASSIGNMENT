import React, { useState } from "react"
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
      if (data){
        console.log("success", data)
      }if(error){
        console.log("error occured", error)
      }
      console.log(formdata);
      setFormdata({
        Name:"",
        Email:"",
        role:"",
        department:""
      })
    }
  return (
   <form onSubmit={handleSubmit}>
    <label> Enter Your Name </label>
    <input type="text" name = "Name" placeholder="enter name"
     onChange={handleChange} value={formdata.Name}/>

    <label>Enter Your Mail id. </label>
    <input type="text" name = "Email" placeholder="enter email"
    onChange={handleChange} value={formdata.Email} />
    
    <label>Enter Your Department</label>
    <input type="text" name = "department" placeholder="enter department" 
    onChange={handleChange} value={formdata.department}/>

    <label>Enter your Role</label>
    <input type="text" name="role" placeholder="enter role" 
    onChange={handleChange} value={formdata.role}/>
  <button type="submit" >Submit</button>
   </form>
   
  )
}

export default Management