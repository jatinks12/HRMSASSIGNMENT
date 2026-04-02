import {  useEffect, useState } from "react"
import ShowForm from "./ShowForm";
import ShowTable from "./ShowTable";
import { SupabaseClient } from "../../Helper/Supabase";
import { observer } from "mobx-react";
import FormStore from "./formstore";


const Leave = ({userId}:any) => {
  const admin ="4b1ce711-a68a-4571-bf4e-07c2e798cb57"
  let showAdminPage = false;
  if(userId === admin){
   showAdminPage=true;
  }
  const [datas , setData] = useState<any[]>([]);
  useEffect(
    ()=>{fetchData()},[datas]
  )
  async function fetchData(){
  const {data, error}= await SupabaseClient.from("Employee").select("*").eq("Status",true).eq("Pending",true);

  if(error){
    alert("unable to load employee data form the table")
  }else{
    setData(data);
  }
 }
  return (
    <>
  {/* { showAdminPage && !FormStore.formStatus &&<button onClick={()=>FormStore.setFormStatus()}>ADD Leave request</button>  } */}
  {/* { showAdminPage && FormStore.formStatus &&<ShowForm  showAdminPage ={showAdminPage}/> } */}
  {showAdminPage && !FormStore.formStatus && <ShowTable datas={datas}/>}
  {!showAdminPage && <ShowForm  showAdminPage ={showAdminPage}/>}
    </>
  )
}

export default observer(Leave)