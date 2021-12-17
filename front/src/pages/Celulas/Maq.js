import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import api from '../../services/api';
import TabelaCelMaq from '../../component/tabelaCelMaq'
import ModalMaq from '../../component/ModalMaq';
import Input from '../../component/Form/Input';
import { Form } from '@unform/web';

function Maq() {
    const params = useParams()
    const [isModalVisible, setisModalVisible] = useState(false)

    const [celula, setCelula] = useState({
        id:"",
        nome: "",
        minutos: 1,
        quantPessoas: 1,
        tempoPadrao: ""
    })

    const [maq, setMaq] = useState({
        nome: "",
        tipo: ""
    })


    useEffect(() => {
        api.get(`celulas/${params.id}`).then(response => {
            setCelula(response.data)
        })
    }, [])


    function handleChange(evt) {
        evt.preventDefault()
        const { name, value } = evt.target;
        setCelula({
            ...celula,
            [name]: value
        });
    }


    function handleSubmit(e) {

    }

    return (
        <>
            <div className='mx-auto lg:w-full md:w-full sm:w-full'>
                <ModalMaq />
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

                        <div class="inline-flex rounded shadow-sm border relative p-1" role="group">
                            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                <p>
                                    <label htmlFor="tipoMaq" className="bg-white text-gray-600 px-1">Tipo de Máquina</label>
                                </p>
                            </div>
                            <select id="tipoMaq" name="tipoMaquina" className="py-1 px-1 outline-none block h-full w-full text-black"
                                value={celula.quantPessoas} onChange={handleChange} >
                                <option>Teste</option>
                                <option>Teste1234</option>
                            </select>

                            <button type="button" data-modal-toggle="authentication-modal"
                                className="px-4 py-2 text-sm font-medium text-gray-900 bg-white hover:bg-gray-100 hover:text-gray-700 focus:z-10 focus:ring-1 
                        focus:ring-gray-500 focus:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 
                        dark:focus:ring-blue-500 dark:focus:text-white">
                                <FaPlus />
                            </button>
                        </div>

                        <Form>
                            <div className="border focus-within:border-blue-500 focus-within:text-gray-800 transition-all duration-500 relative rounded p-1">
                                <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
                                    <p>
                                        <label htmlFor="nomeMaq" className="bg-white text-gray-600 px-1">Nome da Máquina</label>
                                    </p>
                                </div>

                                <Input id="nomeMaq" name="nomeMaq" className="py-1 px-1 outline-none block h-full w-full" value={maq.nome} />

                            </div>
                        </Form>

                    </div>
                    <TabelaCelMaq id={celula.id} update='1' />

                    <div className="border-t mt-6 pt-3">
                        <button className="rounded text-gray-100 px-3 py-2 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300"
                            onClick={handleSubmit}>Salvar
                        </button>

                        <button type="button" onClick={() => setisModalVisible(true)}> Salvar </button>
                        <ModalMaq onClose={() => { setisModalVisible(false) }} />
                    </div>
                </div>


            </div>
        </>
    )
}

export default Maq
