import { useEffect, useState } from "react";
import { SupabaseClient } from "../../Helper/Supabase";

interface props{
 datas: any[]
}
const ShowTable = () => {
  
  useEffect(()=>{
    fetchData();
  },[])
  const [datas , setdatas]=useState<any[]>([]);
  
  async function fetchData() {
    let {data : datas} = await SupabaseClient.from("Employee").select("*");
   
    if(datas){
      setdatas(datas);
    }
  }
  
 return (

    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>startDate</th>
          <th>EndDate</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        { datas.map((data)=>(
          <tr key={data.id}>
            <td>{data.Name}</td>
            <td>{data.Email}</td>
            <td>{data.StartDate}</td>
            <td>{data.EndData}</td>
            <td>{data.Reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowTable;