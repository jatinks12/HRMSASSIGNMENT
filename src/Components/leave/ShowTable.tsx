import toast from "react-hot-toast";
import { SupabaseClient } from "../../Helper/Supabase";

interface props {
  datas: any[];
}
const ShowTable = ({ datas }: props) => {


  async function handleAproveLeave(id: string) {
    const { error } = await SupabaseClient.from("Employee")
      .update([{ Status: false, Pending: false }])
      .eq("id", id);
      if(error){
        toast.success("unable to ApproveLeave");
      }else{
        toast.success("Leave approved");
      }
  }

  async function handleDeniedLeave(id:string){
    const { error } = await SupabaseClient.from("Employee")
      .update([{ Status: true, Pending: false }])
      .eq("id", id);
     if(error){
        toast.success("unable to ApproveLeave");
      }else{
        toast.success("Leave Denied");
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
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {datas.map((data) => (
          <tr key={data.id}>
            <td>{data.Name}</td>
            <td>{data.Email}</td>
            <td>
              {new Date(data.startDate).toLocaleDateString()}{" "}
              {new Date(data.startDate).toLocaleTimeString()}
            </td>
            <td>
              {new Date(data.EndDate).toLocaleDateString()}{" "}
              {new Date(data.EndDate).toLocaleTimeString()}
            </td>
            <td>{data.Reason}</td>
            <td>
              <button
                onClick={() => {
                  handleAproveLeave(data.id);
                }}
              >
                Approve leave
              </button>{" "}
              <button
                onClick={() => {
                  handleDeniedLeave(data.id);
                }}
              >
                Denied leave
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShowTable;
