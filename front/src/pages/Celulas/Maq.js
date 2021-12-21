import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import TabelaCelMaq from '../../component/tabelaCelMaq'
import Input from '../../component/Form/Input';
import { Form } from '@unform/web';
import api from '../../services/api';

function Maq() {

    const params = useParams()
    const history = useHistory()
    const [isModalVisible, setisModalVisible] = useState(false)
    const [update, setUpdate] = useState(false)

    const [celula, setCelula] = useState({
        id: "",
        nome: "",
        minutos: 1,
        quantPessoas: 1,
        tempoPadrao: ""
    })
    const [maq, setMaq] = useState({
        nome: "",
        tipo: ""
    })
    const [maquina, setMaquina] = useState(1)


    useEffect(() => {
        api.get(`celulas/${params.id}`).then(response => {
            setCelula(response.data)
        }).catch(e => console.log('erro', e))

        api.get(`maquinas`).then(response => {
            setMaq(response.data)
        }).catch(e => console.log('falha ao carregar as maquinas', e))
    }, [])


    function handleChange(evt) {
        evt.preventDefault()
        const { value } = evt.target;
        setMaquina(value)
    }

    function handleReturn() {
        history.goBack()
    }

    async function handleInsertMaq(e) {
        const data = e
        data.idMaquina = maquina
        data.idCelula = params.id

        try {
            await api.post(`celulas/${params.id}/maquina`, data, {
                headers: {
                    //       Authorization: ongId,
                }
            })
            //  setState({ ...state, qrcode: "" })
            alert('cadastro realizado com sucesso!!!')
            setUpdate(true)
        }
        catch (error) {
            alert(`Erro ao cadastrar ${error}`)
        }
    }

    function handleSubmit(e) {

    }

    return (
        <>
            <div className='mx-auto lg:w-full md:w-full sm:w-full'>

                <div className="bg-white shadow rounded-lg p-6 xl:w-1/2  mx-auto mt-5">

                    <div className="grid lg:grid-cols-2 gap-6">
                        <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">

                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="celula" className="bg-white text-gray-600 px-1">Nome da Celula</label>
                                </p>
                            </div>
                            <Form>
                                <Input id="celula" className="py-1 px-1 text-gray-900 outline-none block h-full w-full"
                                    name='nome' defaultValue={celula.nome} disabled />
                            </Form>
                        </div>
                        <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 text-xs">
                                <p>
                                    <label htmlFor="tempo" className="bg-white text-gray-600 px-1">TEMPO PADRÃO(seg.)</label>
                                </p>
                            </div>
                            <Form>
                                <Input id="tempo" className="py-1 px-1 outline-none block h-full w-full" type='number'
                                    name="tempoPadrao" defaultValue={celula.tempoPadrao} disabled />
                            </Form>
                        </div>
                        <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="minutos" className="bg-white text-gray-600 px-1">Minutos Disponível</label>
                                </p>
                            </div>
                            <Form>
                                <Input id="minutos" className="py-1 px-1 outline-none block h-full w-full"
                                    name="minutos" defaultValue={celula.minutos} disabled />
                            </Form>
                        </div>
                        <div className="border focus-within:border-blue-500 focus-within:text-blue-500 transition-all duration-500 relative rounded p-1">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="pessoas" className="bg-white text-gray-600 px-1">Quant. Pessoas</label>
                                </p>
                            </div>
                            <Form>
                                <Input id="pessoas" name="quantPessoas" className="py-1 px-1 outline-none block h-full w-full"
                                    type="number" defaultValue={celula.quantPessoas} min='1' disabled />
                            </Form>
                        </div>
                    </div>

                    <div className='border-red-200 border-b mt-5 mb-5'>
                        Inserir Máquina
                    </div>
                    <div className='grid lg:grid-cols-2 gap-6'>

                        <div className="rounded shadow-sm relative p-1 border " >
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="tipoMaq" className="bg-white text-gray-600 px-1">Tipo de Máquina</label>
                                </p>
                            </div>

                            <select id="tipoMaq" name="tipoMaquina" className="py-1 px-1 outline-none block h-full w-full text-black" onChange={handleChange}>
                                {maq.length > 0 && maq.map((item) => (
                                    <option value={item.id}>
                                        {item.tipo}
                                    </option>
                                ))}

                            </select>

                        </div>


                        <Form onSubmit={handleInsertMaq}>
                            <div className="relative text-gray-700 border focus-within:border-blue-500 focus-within:text-gray-800 transition-all duration-500 p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="nomeMaq" className="bg-white text-gray-600 px-1">Nome da Máquina</label>
                                    </p>
                                </div>

                                <Input id="nomeMaq" name="nomeMaq" className=" py-1 px-1 outline-none block h-full w-full" />

                                <button className="absolute inset-y-0 right-0 flex items-center px-4 font-bold text-white bg-green-600 rounded-r hover:bg-green-500 
                            focus:bg-green-700 focus:outline-none" type="Submit">
                                    <FaPlus />
                                </button>
                            </div>
                        </Form>
                    </div>

                    <TabelaCelMaq id={celula.id} update={update} />

                    <div className="border-t mt-6 pt-3 w-full flex">
                        <button className="w-full rounded text-gray-100 px-3 py-2 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
                            onClick={handleSubmit}>Salvar
                        </button>
                        <button className="w-full rounded px-3 py-2 bg-gray-200 hover:shadow-inner hover:bg-gray-300 transition-all duration-300 ml-2"
                            onClick={handleReturn}>Voltar
                        </button>

                        {/* <button type="button" onClick={() => setisModalVisible(true)}> Salvar </button>
                        <ModalMaq onClose={() => { setisModalVisible(false) }} /> */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Maq
