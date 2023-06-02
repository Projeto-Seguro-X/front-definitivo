import React, { useEffect, useState } from "react";
import { Container, Paper, Typography } from "@mui/material";
import http from '../servicos/http.jsx'
import ItemCotacao from "../componentes/ItemCotacao.jsx";

function Cotacoes() {
  const [cotacoes, setCotacoes] = useState([])
  const [loading, setLoading] = useState(true)

  const getData = () =>{
    const getApolices = async () => {
      try{
        const {data} = await http.get('cotacoes/')
        setCotacoes(data);
        setLoading(false)

      }catch(error){
        console.error(error)
      }
    }
    getApolices()
  }

  useEffect(()=>{
    getData()
  },[])

  const itemCotacao = cotacoes.map((item) => <ItemCotacao key={item?.n_cotacao} info={item}/>).reverse()


if(loading){
  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Carregando...
      </Typography>

      </Paper>
    </Container>
  );

}

  return (
    <Container maxWidth="lg">
      <Paper>

      <Typography component='h1' variant='h5' textAlign='center'>
          Lista de Cotações
      </Typography>

      <div className="lista-cotacoes">
        <div className="item-cotacoes">
          {itemCotacao}
       {itemCotacao.length === 0 && <p>Você ainda não tem cotações para exibir</p>}
        </div>
      </div>

      </Paper>
    </Container>
  );
}

export default Cotacoes;
