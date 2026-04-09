const Admin1 ="f418d67a-0782-41a0-b28c-8e8d864ab858";

const Admin2 = "e27b7ccd-999e-4769-a84e-eaa58ce5a37e";
const Admin3 = "b09ecf30-7635-4b7a-803a-0555a34db13e";

interface props{
  userId:string
  setCheckDashboard: React.Dispatch<React.SetStateAction<boolean>>
  setCheckleave: React.Dispatch<React.SetStateAction<boolean>>
  setCheckmanagement: React.Dispatch<React.SetStateAction<boolean>>
  setUserId: React.Dispatch<React.SetStateAction<string>>
}

export function applyRolePermissions({userId , setCheckDashboard , setCheckleave , setCheckmanagement , setUserId}:props ){
  setUserId(userId);
  if (userId === Admin1) {
    setCheckDashboard(true); setCheckleave(true); setCheckmanagement(true);
  } else if (userId === Admin2) {
    setCheckDashboard(false); setCheckleave(false); setCheckmanagement(true);
  } else if (userId === Admin3) {
    setCheckDashboard(true); setCheckleave(false); setCheckmanagement(false);
  } else {
    setCheckDashboard(false); setCheckleave(true); setCheckmanagement(false);
  }
}

