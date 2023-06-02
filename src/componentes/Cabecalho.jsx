import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./../componentes/Button";
import useAuth from "./../hooks/useAuth";
import { AuthProvider } from "../contexts/auth";
import { useContext, useEffect } from "react";
import {AuthContext} from "../contexts/auth";



const Cabecalho = () => {
  const {user} = useContext (AuthContext);  
  const { signout } = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user) navigate("/signin")
  },[]) 

//function Cabecalho() {
  return (
    <header>
      <nav>
        <ul className="flex flex-centro cor cabecalho">
          <li> <Link className="item__cabecalho"  to="/">Criar Cotação</Link> </li>
          <li> <Link className="item__cabecalho" to="/cotacoes">Lista de Cotações</Link> </li>
          <li> <Link className="item__cabecalho" to="/apolices-lista">Lista de Apolices</Link> </li>
          <li> <Button Text="Sair" onClick={() => [signout(), navigate("/signin")]}> Sair </Button> </li>
        </ul>
      </nav>
    </header>
  );
}

export default Cabecalho;
