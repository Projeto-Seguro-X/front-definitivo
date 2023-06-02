import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuscaCobertura from "../componentes/buscaCobertura";
import http from "../servicos/http.jsx";

function ItemApolice(props) {
  const [coberturas, setCoberturas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCoberturas = async () => {
      try {
        const { data } = await http.get("coberturas");
        setCoberturas(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCoberturas();
  }, []);

  function calcValorParcela() {
    const valor = props.info.valorPago / props.info.qtParcelas;
    return valor.toFixed(2);
  }

  const dataFormat = (data) => {
    let dataObj = new Date(data);
    return `${dataObj.getDate()}/${
      dataObj.getMonth() + 1
    }/${dataObj.getFullYear()}`;
  };

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
    <Paper className="item-cotacoes">
      <div className="campoCotacao">
        <p>Número da cotação: </p>
        <p className="valorCotacao"> {props.info.n_apolice} </p>
      </div>
      <div className="campoCotacao">
        <p>Código da apólice: </p>
        <p className="valorCotacao"> {props.info.hash} </p>
      </div>
      <div className="campoCotacao">
        <p>Nome: </p>
        <p className="valorCotacao"> {props.info.nome} </p>
      </div>
      <div className="campoCotacao">
        <p>CPF:</p>
        <p className="valorCotacao"> {props.info.cpf} </p>
      </div>
      <div className="campoCotacao">
        <p>Início de vigência do seguro:</p>
        <p className="valorCotacao">
          {" "}
          {dataFormat(props.info.inicioVigencia)}{" "}
        </p>
      </div>
      <div className="campoCotacao">
        <p>Término de vigência do seguro:</p>
        <p className="valorCotacao">
          {" "}
          {dataFormat(props.info.terminoVigencia)}{" "}
        </p>
      </div>
      <div className="campoCotacao">
        <p>Valor de risco:</p>
        <p className="valorCotacao"> R${props.info.valorRisco} </p>
      </div>
      <div className="campoCotacao">
        <p>Valor a ser pago:</p>
        <p className="valorCotacao"> R${props.info.valorPago} </p>
      </div>
      <div className="campoCotacao">
        <p>Forma de pagamento:</p>
        {props.info.qtParcelas === 0 ? (
          <p className="valorCotacao"> À vista </p>
        ) : (
          <p className="valorCotacao">
            {" "}
            {props.info.qtParcelas} parcelas de R${calcValorParcela()}{" "}
          </p>
        )}
      </div>

      <BuscaCobertura info={props.info.cobertura} />
    </Paper>
  );
}

export default ItemApolice;
