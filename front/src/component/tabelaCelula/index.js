import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import './styles.css'

function TabelaCelula({ update }) {

    // console.log(JSON.stringify(update))
    const [celula, setCelula] = useState([])
    const [atualizaTabela, setAtualizaTabela] = useState([])

    useEffect(() => {
        api.get('celulas').then(response => {
            setCelula(response.data)
        })
        setAtualizaTabela(false)
    }, [update, atualizaTabela])

    function handleDelete(id, evt) {
        evt.preventDefault()
        api.delete(`celulas/${id}`).then(response =>
            setAtualizaTabela(true)
        )
    }

    

    return (

        <div className="justify-center mt-5">
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible  ">
                    <table className="table text-gray-400 border-separate space-y-6 w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="p-3">Célula</th>
                                <th className="p-3 text-left">Quant. Pessoas</th>
                                <th className="p-3 text-left">Tempo Padrão</th>
                                <th className="p-3 text-left">Minutos Disponível</th>
                                <th className="p-3 text-left">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                celula.map((cel, index) => (
                                    <tr className="bg-gray-100" key={cel.id}>
                                        <td className="p-3">
                                            <div className="flex align-items-center">
                                                {/* <img className='rounded-full h-12 w-12  object-cover' alt='imageid'
                                                        src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" /> */}

                                                <div className="ml-3">
                                                    {/* <div className="">Appple</div> */}
                                                    <div className="text-gray-700 text-base">{cel.nome}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center p-3">
                                            {cel.quantPessoas}
                                        </td>
                                        <td className="text-center p-3 font-bold">
                                            {cel.tempoPadrao}
                                        </td>
                                        <td className="p-3 text-center">
                                            <span className="bg-green-400 text-gray-50 rounded-md px-2">{cel.minutos}</span>
                                        </td>
                                        <td className="p-3 flex inline-block">
                                            <button className="text-gray-400 hover:text-black mr-2">
                                                <i className="material-icons-outlined text-base"><FaEye /></i>
                                            </button>
                                            <button className="text-gray-400 hover:text-black mx-2">
                                                <i className="material-icons-outlined text-base"><FaEdit /></i>
                                            </button>
                                            <button onClick={handleDelete.bind(this, cel.id)} className="text-gray-400 hover:text-black  ml-2">
                                                <i className="material-icons-round text-base"><FaTrash /></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default TabelaCelula

