import React from "react";
import "./assets/base.css";
import {  BrowserRouter, Router, Route, Routes } from "react-router-dom";
import CriarCotacao from "./paginas/CriarCotacao.jsx";
import Cotacoes from "./paginas/CotacoesLista";
import Propostas from "./paginas/Propostas";
import Apolices from "./paginas/Apolices";
import ApolicesLista from "./paginas/ApolicesLista";
import Cabecalho from "./componentes/Cabecalho.jsx";
import { Container } from "@mui/system";
import { Fragment } from "react";
import Signin from "./paginas/Signin";
import Signup from "./paginas/Signup";
import useAuth from "./hooks/useAuth.jsx";
import Dashbord from "./layout/Dashbord";
import { AuthProvider } from "./contexts/auth";

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed > 0 ? <Item /> : <Signin />;
};

// const App = () => {
//   return (
//     <BrowserRouter>
//       {/* <Fragment> */}
//         <Routes>
//           {/* <Route exact path="/cabecalho" element={<Private Item={Cabecalho} />}/> */}
//            <Route path="/" element={<Signin />} />
//           {/* <Route exact path="/signup" element={<Signup />} />
//           <Route path="*" element={<Signin />} />
//           <Route path="/criarcotacao" element={<CriarCotacao />} />
//           <Route path="cotacoes" element={<Cotacoes />} />
//           <Route path="propostas/" element={<Propostas />} />
//           <Route path="apolices/" element={<Apolices />} />
//           <Route path="apolices-lista/" element={<ApolicesLista />} /> */}
//         </Routes>
//       {/* </Fragment> */}
//     </BrowserRouter>
//   );
// };

// export default App;

function App() {
	return (
    <>

			<AuthProvider>
   <Container maxWidth="lg" sx={{marginTop: "80px"}}>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/' element={<Dashbord/>}> 
          <Route path='/' element={<CriarCotacao/>} />
          <Route path='cotacoes' element={<Cotacoes/>} />
          <Route path='propostas/' element={<Propostas/>} />
          <Route path='apolices/' element={<Apolices/>} />
          <Route path='apolices-lista/' element={<ApolicesLista/>} />
        </Route>
      </Routes>
    </Container>
      </AuthProvider>
    </>
	);
}

export default App;
