import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import http from "../servicos/http.jsx";

function ItemApolice(props) {
  const idCobertura = props.info;

  const [coberturas, setCoberturas] = useState([]);
  const [nomeCobertura, setNomeCobertura] = useState("");
  const [descricaoCobertura, setDescricaoCobertura] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoberturas = async () => {
      try {
        const { data } = await http.get("coberturas");
        setCoberturas(data);
        getNomeCobertura();
        getDescricaoCobertura();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCoberturas();
  }, [loading]);

  function getNomeCobertura() {
    coberturas.map((item) => {
      return idCobertura === item._id ? setNomeCobertura(item.nome) : "";
    });
  }

  function getDescricaoCobertura() {
    coberturas.map((item) => {
      return idCobertura === item._id
        ? setDescricaoCobertura(item.descricao)
        : "";
    });
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <>
          <Typography component="h1" variant="h5" textAlign="center">
            Carregando...
          </Typography>
        </>
      </Container>
    );
  }

  return (
    <>
      <div className="campoCotacao">
        <p>Tipo da cobertura:</p>
        <p className="valorCotacao"> {nomeCobertura} </p>
      </div>
      <p> {descricaoCobertura} </p>
    </>
  );
}

export default ItemApolice;
