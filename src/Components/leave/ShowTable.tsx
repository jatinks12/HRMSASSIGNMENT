
interface props{
 datas: any[]
}
const ShowTable = ({datas}:props) => {
  
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
        {datas.map((data)=>(
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


export default ShowTable