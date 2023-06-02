import { Outlet } from "react-router-dom";
import Cabecalho from "../../componentes/Cabecalho.jsx";

const Dashbord = props => {

    return (
    <>
        <Cabecalho/>
        <Outlet/>
    </>
    )
}

export default Dashbord;