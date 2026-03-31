import "./Dashboard.css"
const Dashboard = () => {
  return (
    <div className="dashboard">

      

      {/* Cards Section */}
      <div className="cards-container">
        
        <div className="card">
          <h3 >Total Employees</h3>
         
        </div>

        <div className="card">
          <h3>Leaves</h3>
         
        </div>

        <div className="card">
          <h3>Pending Requests</h3>
          
        </div>

      </div>

    </div>
  );
};

export default Dashboard;