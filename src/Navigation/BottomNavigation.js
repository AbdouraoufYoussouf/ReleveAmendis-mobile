import React, { useState } from "react";
import { useSelector } from "react-redux";

import  {AdminNavigationBottom}  from "../Screens/Admin/AdminNavigationbottom";
import { ErrorScreen } from "../Screens/ErrorScreen";
import { FacturateurNavigationBottom } from "../Screens/Facturateur/FacturateurNavigationbottom";
import { ReleveurNavigationBottom } from "../Screens/Releveur/ReleveurNavigationbottom";

export const BottomNavigation = () => {
  const user = useSelector((state) => state.user.value);
    //const [role, setRole] = useState("Admin")
      const [role, setRole] = useState(user.role)
    
    return (
        <>
        {
          role ==='Admin' ?  <AdminNavigationBottom/> :
          role==='Facturateur' ? <FacturateurNavigationBottom/>:
          role ==='Releveur' ? <ReleveurNavigationBottom/> :  <ErrorScreen/>
        }
        </>
    )
}
