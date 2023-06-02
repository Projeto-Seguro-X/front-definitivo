import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import http from '../servicos/http.jsx'
import ItemApolice from '../componentes/ItemApolice.jsx'
import Propostas from "./Propostas.jsx";


function Apolices() {

  const [loading, setLoading] = useState(true)
  const [apolice, setApolice] = useState({})

  let n_apolice = window.location.search.replace('?','')
  
  useEffect(() =>{

    const getProposta = async () => {
      try{
        const {data} = await http.get(`apolices/busca/?n_apolice=${n_apolice}`)
        setApolice(data[0]);
        
        setLoading(false)
      }catch(error){
        console.error(error)
      }
    };  
    getProposta()
    setLoading(false)
    
  },[setApolice, loading])




  if(loading){
    return(
      <Container maxWidth="lg">
        <>

        <Typography component='h1' variant='h5' textAlign='center'>
            Carregando...
        </Typography>
        </>
      </Container>

    )
  }


  return (
    <Container maxWidth="lg">
    

      <Typography component='h1' variant='h5' textAlign='center'>
          Apolice
      </Typography>
      <ItemApolice info={apolice} />
      

    </Container>
  );
  

}

export default Apolices;
