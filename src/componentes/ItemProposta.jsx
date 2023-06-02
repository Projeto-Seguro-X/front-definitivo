import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import BuscaCobertura from "../componentes/buscaCobertura";
import http from "../servicos/http.jsx";

function ItemProposta(props) {
  const idCobertura = props.info.cobertura;
  const [coberturas, setCoberturas] = useState([]);
  const [nomeCobertura, setNomeCobertura] = useState("");

  useEffect(() => {
    const getCoberturas = async () => {
      try {
        const { data } = await http.get("coberturas");
        setCoberturas(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCoberturas();
    getNomeCobertura();
  }, []);

  function getNomeCobertura() {
    coberturas.map((item) => {
      return idCobertura === item._id
        ? setNomeCobertura(item.nome)
        : console.error("erro get nome");
    });
  }
  const dataFormat = (data) => {
    let dataObj = new Date(data);
    return `${dataObj.getDate()}/${
      dataObj.getMonth() + 1
    }/${dataObj.getFullYear()}`;
  };

  return (
    <Paper className="item-cotacoes">
      <div className="campoCotacao">
        <p>Número da proposta: </p>
        <p className="valorCotacao"> {props.info.n_proposta} </p>
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

      <BuscaCobertura info={props.info.cobertura} />
    </Paper>
  );
}

export default ItemProposta;
