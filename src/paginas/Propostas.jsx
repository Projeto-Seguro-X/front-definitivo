import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import http from '../servicos/http.jsx'
import { useNavigate } from "react-router-dom";
import ItemProposta from '../componentes/ItemProposta'


function Propostas() {

  
  const navigate = useNavigate()
  
  let n_cotacao = window.location.search.replace('?','')
  const [proposta, setProposta] = useState({})
  const [loading, setLoading] = useState(true)
  
  let btnElaborar = document.getElementById("bnt-elaborar")

  useEffect(() =>{
    const getProposta = async () => {
      try{
        const {data} = await http.get(`propostas/busca/?n_proposta=${n_cotacao}`)
        setProposta(data[0]);
      }catch(error){
        console.error(error)
      }
    };  
    getProposta()
    setLoading(false)

  },[setProposta, loading])

  useEffect(()=>{
    validateForm()
  },[proposta.qtParcelas])

  function setPagamento(evento){
    const parcelas = evento.target.value
    setProposta({...proposta, qtParcelas: parcelas})
    validateForm()
  }

  function validateForm(){
    return proposta.qtParcelas >= 0 ? btnElaborar.removeAttribute('disabled') : ''

  }

  function postProposta(){
    http
    .post('/propostas/', {
      n_proposta:proposta.n_proposta,
      nome:proposta.nome,
      cpf:proposta.cpf,
      inicioVigencia:proposta.inicioVigencia,
      terminoVigencia:proposta.terminoVigencia,
      valorRisco:proposta.valorRisco,
      valorPago:proposta.valorPago,
      qtParcelas:proposta.qtParcelas ,
      cobertura:proposta.cobertura
    })
    .then(() => navigate(`/apolices/?${proposta.n_proposta}`));
  }

  function enviarProposta(event){
    event.preventDefault()
    postProposta()

  }


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

  if(!loading){

    function calcParcelas(valorRisco, qtParcelas){
      const valor = valorRisco / qtParcelas
      return valor.toFixed(2)
  
    }

    return (
      <Container maxWidth="lg">
      

        <Typography component='h1' variant='h5' textAlign='center'>
            Propostas
        </Typography>
        <ItemProposta info={proposta} />
        {/* Pagamento */}

        <div>
          <form className="form" onSubmit={enviarProposta} >
            <fieldset id="pagamento-fieldset" className="cotacao-fieldset" >
            <legend>Forma de pagamento</legend>
            <p>Valor a ser pago: <strong>R${proposta.valorPago}</strong> </p>
            <p>Valor parcelado:</p>
              <select 
                className="campoTexto w50" 
                value={proposta.qtParcelas}
                onChange={(evento) => setPagamento(evento) }
              >
                <option value="default" hidden >Selecione a forma de pagamento</option>
                <option value="0" > A vista: R$ {proposta.valorPago} </option>
                <option value="1" > Parcelado 1x: R$ {calcParcelas(proposta.valorPago,1)} </option>
                <option value="2" > Parcelado 2x: R$ {calcParcelas(proposta.valorPago,2)} </option>
                <option value="3" > Parcelado 3x: R$ {calcParcelas(proposta.valorPago,3)} </option>
                <option value="4" > Parcelado 4x: R$ {calcParcelas(proposta.valorPago,4)} </option>
                <option value="5" > Parcelado 5x: R$ {calcParcelas(proposta.valorPago,5)} </option>
                <option value="6" > Parcelado 6x: R$ {calcParcelas(proposta.valorPago,6)} </option>
                <option value="7" > Parcelado 7x: R$ {calcParcelas(proposta.valorPago,7)} </option>
                <option value="8" > Parcelado 8x: R$ {calcParcelas(proposta.valorPago,8)} </option>
                <option value="9" > Parcelado 9x: R$ {calcParcelas(proposta.valorPago,9)} </option>
                <option value="10" > Parcelado 10x: R$ {calcParcelas(proposta.valorPago,10)} </option>
                <option value="11" > Parcelado 11x: R$ {calcParcelas(proposta.valorPago,11)} </option>
                <option value="12" > Parcelado 12x: R$ {calcParcelas(proposta.valorPago,12)} </option>
              </select>
            </fieldset>
            <button className="btn-elaborar" id="bnt-elaborar" disabled type="submit" >Elaborar apolice</button>

          </form>
        </div>
      </Container>
    );
  }
 
}

export default Propostas;
