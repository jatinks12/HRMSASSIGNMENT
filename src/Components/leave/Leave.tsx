import {  useEffect, useState } from "react"
import ShowForm from "./ShowForm";
import ShowTable from "./ShowTable";
import { SupabaseClient } from "../../Helper/Supabase";
import { observer } from "mobx-react";
import FormStore from "./formstore";

const Leave = () => {
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
 console.log(FormStore.formStatus);
  return (
    <>
  {!FormStore.formStatus &&<button onClick={()=>FormStore.setFormStatus()}>ADD Leave request</button>  }
  {FormStore.formStatus &&<ShowForm/> }

  {!FormStore.formStatus && <ShowTable datas={datas}/>}
    </>
  )
}

export default observer(Leave)