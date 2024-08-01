import { Outlet } from "react-router-dom";
import { Header } from "./Header";


  
export const Admin = ()=>{
    return (
        <>
            <Header/>
            <Outlet></Outlet>
        </>
    )
}