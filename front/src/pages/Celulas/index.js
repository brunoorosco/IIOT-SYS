import React, { useState, useEffect } from "react";
import TabelaCelula from "../../component/tabelaCelula";
import api from '../../services/api'


function Producao() {

  const [atualizar, setUpdate] = useState(false)
  const [state, setState] = useState({
    nome: "",
    minutos: 1,
    quantPessoas: 1,
    tempoPadrao: ""
  })

  useEffect(() => {
    let valor = state.quantPessoas * 60
    console.log(state.quantPessoas, valor)
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
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">

              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="celula" className="bg-white text-gray-600 px-1">Nome da Celula</label>
                </p>
              </div>
              <p>
                <input id="celula" className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                  name='nome' value={state.nome} onChange={handleChange} />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 text-xs">
                <p>
                  <label htmlFor="tempo" className="bg-white text-gray-600 px-1">TEMPO PADRÃO(seg.)</label>
                </p>
              </div>
              <p>
                <input id="tempo" className="py-1 px-1 outline-none block h-full w-full" type='number'
                  name="tempoPadrao" value={state.tempoPadrao} onChange={handleChange} min='1' />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="minutos" className="bg-white text-gray-600 px-1">Minutos Disponível</label>
                </p>
              </div>
              <p>
                <input id="minutos" className="py-1 px-1 outline-none block h-full w-full" disabled
                  name="minutos" value={state.minutos} onChange={handleChange} />
              </p>
            </div>
            <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
              <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                <p>
                  <label htmlFor="pessoas" className="bg-white text-gray-600 px-1">Quant. Pessoas</label>
                </p>
              </div>
              <p>
                <input id="pessoas" name="quantPessoas" tabIndex="0" className="py-1 px-1 outline-none block h-full w-full"
                  type="number" value={state.quantPessoas} onChange={handleChange} min='1' />
              </p>
            </div>
          </div>
          <div className="border-t mt-6 pt-3">
            <button className="rounded text-gray-100 px-3 py-2 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
              onClick={handleSubmit}>Salvar
            </button>
          </div>
        </div>

        <div>

          <TabelaCelula update={atualizar} />
        </div>
      </div>
    </>
  );
}

export default Producao;
