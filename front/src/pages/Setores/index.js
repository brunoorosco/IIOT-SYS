import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import TabelaCelula from "../../components/tabelaCelula";
import api from '../../services/api'


function Setor() {

  const [atualizar, setUpdate] = useState(false)
  const [state, setState] = useState({
    nome: "",
    minutos: 1,
    quantPessoas: 1,
    tempoPadrao: ""
  })

  useEffect(() => {
    let valor = state.quantPessoas * 60
    setState({ ...state, minutos: valor })
  }, [state.quantPessoas])


  function handleChange(evt) {
    evt.preventDefault()
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();
    const data = state

    try {
      await api.post('/celulas', data, {
        headers: {
          //       Authorization: ongId,
        }
      })
      setState({
        nome: "",
        minutos: "",
        quantPessoas: 1,
        tempoPadrao: ""
      })
      alert('cadastro realizado com sucesso!!!')
      setUpdate(true)

    }
    catch (error) {
      alert(`Erro ao cadastrar ${error}`)

    }
  }

  return (
    <>
      <div className='mx-auto lg:w-2/3 md:w-full sm:w-full'>
        <div className="bg-white shadow rounded-lg p-6 xl:w-1/2  mx-auto mt-5">
          <div className="grid lg:grid-cols-2 gap-6">

            <Input id="celula" labelText="Nome da Celula"
              clInput="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              clLabel="bg-white text-gray-600 px-1 uppercase"
              name='nome' value={state.nome}
              onChange={handleChange} />

            <Input id="tempo" labelText="TEMPO PADRÃO(seg.)"
              clInput="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              clLabel="bg-white text-gray-600 px-1"
              name='tempoPadrao' type='number' value={state.tempoPadrao}
              min='1' onChange={handleChange} />

            <Input id="minutos" labelText="Minutos Disponível"
              clInput="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              clLabel="bg-white text-gray-600 px-1 uppercase" disabled
              name='minutos' type='number' min='1' value={state.minutos}
              onChange={handleChange} />

            <Input id="pessoas" labelText="Quant. Pessoas"
              clInput="py-1 px-1 text-gray-900 outline-none block h-full w-full"
              clLabel="bg-white text-gray-600 px-1 uppercase"
              name='quantPessoas' type='number' min='1' value={state.quantPessoas}
              onChange={handleChange} />
          </div>
          <div className="border-t mt-6 pt-3 ">
            <button className="w-full rounded text-gray-100 px-3 py-2 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
              onClick={handleSubmit}>Salvar
            </button>
          </div>
        </div>


        <TabelaCelula update={atualizar} />

      </div>
    </>
  );
}

export default Setor;
