import {  useEffect, useState } from "react"
import ShowForm from "./ShowForm";
import ShowTable from "./ShowTable";
import { SupabaseClient } from "../../Helper/Supabase";
import { observer } from "mobx-react";
import FormStore from "./formstore";


const Leave = ({userId}:any) => {
  const admin ="edfa774c-cf13-465a-a8d0-7091ef68626c"
  let showAdminPage = false;
  if(userId === admin){
   showAdminPage=true;
  }
  const [datas , setData] = useState<any[]>([]);
  useEffect(
    ()=>{fetchData()},[]
  )
  async function fetchData(){
  const {data, error}= await SupabaseClient.from("Employee").select("*");

  if(error){
    alert("unable to load employee data form the table")
  }else{
    setData(data);
  }
 }
  return (
    <>
  { showAdminPage && !FormStore.formStatus &&<button onClick={()=>FormStore.setFormStatus()}>ADD Leave request</button>  }
  { showAdminPage && FormStore.formStatus &&<ShowForm  showAdminPage ={showAdminPage}/> }
  {showAdminPage && !FormStore.formStatus && <ShowTable datas={datas}/>}
  {!showAdminPage && <ShowForm  showAdminPage ={showAdminPage}/>}
    </>
  )
}

export default observer(Leave)