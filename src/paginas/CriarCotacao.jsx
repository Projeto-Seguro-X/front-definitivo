import { Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import http from "../servicos/http.jsx";

function CriarCotacao() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [coberturas, setCoberturas] = useState([]);
  const [contador, setContador] = useState([]);
  const [minMaxVigencia, setMinMaxVigencia] = useState({});
  const [temCpf, setTemCpf] = useState(false);
  const [permiteEnvio, setPermiteEnvio] = useState(false);

  const [cotacao, setCotacao] = useState({
    n_cotacao: undefined,
    nome: "",
    cpf: "",
    inicioVigencia: "",
    terminoVigencia: "",
    valorRisco: null,
    cobertura: "",
    nomeCobertura: "",
  });

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

  useEffect(() => {
    function dataVigencia() {
      var novaData = new Date();
      var nextDay = new Date(novaData);
      nextDay.setDate(novaData.getDate() + 1);

      const date = nextDay.getDate();
      const month = nextDay.getMonth();
      const year = nextDay.getFullYear();
      return `${date}/${month}/${year}`;
    }
    const getNumCotacao = async () => {
      try {
        const { data } = await http.get("contadores");
        setContador(data[0].n_cotacao);

        setCotacao({
          ...cotacao,
          n_cotacao: data[0].n_cotacao,
          inicioVigencia: dataVigencia(),
        });
      } catch (error) {
        console.log(error);
      }
    };
    getNumCotacao();
  }, []);

  useEffect(() => {
    function dataVigencia() {
      var now = new Date();
      const min = new Date(
        now.getFullYear() + 5,
        now.getMonth(),
        now.getDate() + 1
      );
      const max = new Date(
        now.getFullYear() + 10,
        now.getMonth(),
        now.getDate() + 1
      );
      const minDate = `${min.getFullYear()}-${String(min.getMonth()).padStart(
        2,
        "0"
      )}-${String(min.getDate()).padStart(2, "0")}`;
      const maxDate = `${max.getFullYear()}-${String(max.getMonth()).padStart(
        2,
        "0"
      )}-${String(max.getDate()).padStart(2, "0")}`;
      setMinMaxVigencia({
        min: minDate,
        max: maxDate,
      });
    }
    dataVigencia();
  }, []);

  useEffect(() => {
    validateForm();
    existeCPF();
  }, [cotacao.cobertura, cotacao.cpf]);

  useEffect(() => {
    validateForm();
  }, [cotacao, temCpf]);

  function editCotacao() {
    const novoContador = contador + 1;
    http.put(`/contadores/630671a2b3dfa66834b7a2f2/`, {
      n_cotacao: novoContador,
    });
  }

  function existeCPF() {
    const getCpf = async () => {
      try {
        const { data } = await http.get(`apolices/cpf/?cpf=${cotacao.cpf}`);
        if (data.length !== 0) {
          setTemCpf(true);
        } else {
          setTemCpf(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getCpf();
    validateForm();
  }

  function validateForm() {
    if (
      cotacao.nome !== "" &&
      temCpf === false &&
      cotacao.cpf.length === 11 &&
      cotacao.inicioVigencia !== "" &&
      cotacao.terminoVigencia !== "" &&
      cotacao.valorRisco !== "" &&
      cotacao.cobertura !== ""
    ) {
      setPermiteEnvio(true);
    } else {
      setPermiteEnvio(false);
    }
  }

  const coberturaMap = coberturas.map((item) => {
    return (
      <option key={item._id} value={item._id}>
        {" "}
        {item.nome}
      </option>
    );
  });

  function setIDCobertura(evento) {
    const coberturaID = evento;
    coberturas.map((item) =>
      coberturaID === item._id
        ? setCotacao({
            ...cotacao,
            nomeCobertura: item.nome,
            cobertura: coberturaID,
          })
        : ""
    );
  }

  function descricaoCobertura(id) {
    const coberturaID = id;
    let desc = "";
    coberturas.map((item) =>
      coberturaID === item._id ? (desc = item.descricao) : ""
    );
    return desc;
  }

  function postCotacao() {
    http
      .post("/cotacoes/", {
        nome: cotacao.nome,
        n_cotacao: cotacao.n_cotacao,
        cpf: cotacao.cpf,
        terminoVigencia: cotacao.terminoVigencia,
        valorRisco: cotacao.valorRisco,
        cobertura: cotacao.cobertura,
      })
      .then(() => navigate(`/propostas/?${cotacao.n_cotacao}`));
  }

  function setCpf(event) {
    const somenteNumeros = event.target.value.replace(/[^0-9]/g, "");
    setCotacao({
      ...cotacao,
      cpf: somenteNumeros,
    });
  }
  function saveLocalStorage() {
    localStorage.setItem("n_cotacao", JSON.stringify(cotacao.n_cotacao));
  }

  function enviarForm(event) {
    event.preventDefault();
    existeCPF();
    saveLocalStorage();
    editCotacao();
    postCotacao();
  }

  if (loading) {
    return (
      <Container maxWidth="lg">
        <>
          <Typography component="h1" variant="h5" textAlign="center">
            Loading
          </Typography>
        </>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg">
      <>
        <Typography component="h1" variant="h5" textAlign="center">
          Formulario de Cotação
        </Typography>

        <form className="form" onSubmit={enviarForm}>
          <fieldset id="cotacao-fieldset" className="cotacao-fieldset">
            <legend>Dados para cotação</legend>

            <div className="flex flex-centro">
              <p className="m10"> Número da cotação:</p>
              <span className="num-cotacao"> {cotacao.n_cotacao} </span>
            </div>

            <label htmlFor="nome" className="labelTexto">
              Nome
            </label>
            <input
              type="text"
              name="nome"
              className="campoTexto w100"
              placeholder="ex.: José Santos Silva"
              value={cotacao.nome}
              onChange={(event) =>
                setCotacao({ ...cotacao, nome: event.target.value })
              }
              required
            />

            <label htmlFor="cpf" className="labelTexto">
              CPF
            </label>

            <input
              type="text"
              minLength={11}
              maxLength={11}
              onChange={(evento) => setCpf(evento)}
              className="campoTexto w30"
              placeholder="ex.: 123.456.789-99"
              required
            />
            {temCpf && (
              <span className="avisoCpf">Este CPF já possui cadastro</span>
            )}

            <label htmlFor="inicioVigencia" className="labelTexto">
              Início da Vigência
            </label>
            <p className="campoTexto w30">{cotacao.inicioVigencia}</p>

            <label htmlFor="terminoVigencia" className="labelTexto">
              Termino da Vigência
            </label>
            <input
              type="date"
              className="campoTexto w30"
              value={cotacao.terminoVigencia}
              onChange={(event) =>
                setCotacao({ ...cotacao, terminoVigencia: event.target.value })
              }
              min={minMaxVigencia.min}
              max={minMaxVigencia.max}
              required
            />

            <label htmlFor="valorRisco" className="labelTexto">
              Valor em risco
            </label>
            <input
              type="number"
              name="valorRisco"
              value={cotacao.valorRisco == null ? "" : cotacao.valorRisco}
              onChange={(event) =>
                setCotacao({ ...cotacao, valorRisco: event.target.value })
              }
              className="campoTexto w30"
              min="5000.00"
              max="1000000.00"
              step="1"
              placeholder="ex.: R$10.000,00"
              required
            />

            <label htmlFor="cobertura" className="labelTexto">
              Tipo da cobertura
            </label>
            <select
              className="campoTexto w70"
              value={cotacao.cobertura}
              onChange={(e) => setIDCobertura(e.target.value)}
              required
            >
              <option hidden>Selecione a cobertura</option>
              {coberturaMap}
            </select>
            <p className="descCobertura">
              {descricaoCobertura(cotacao.cobertura)}
            </p>

            <div className="container-btn">
              {permiteEnvio ? (
                <button
                  className="btn-elaborar"
                  id="bnt-elaborar"
                  type="submit"
                >
                  Elaborar proposta
                </button>
              ) : (
                <button className="btn-elaborar" id="bnt-elaborar" disabled>
                  Elaborar proposta
                </button>
              )}
            </div>
          </fieldset>
        </form>
      </>
    </Container>
  );
}

export default CriarCotacao;
