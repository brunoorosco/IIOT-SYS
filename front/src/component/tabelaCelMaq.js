import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


function TabelaCelMaq({ update, id }) {

    const [maquina, setMaquina] = useState([])
    const [atualizaTabela, setAtualizaTabela] = useState([])

 
    useEffect(() => {
        api.get(`celulas/maquinas/${id}`).then(response => {
            setMaquina(response.data.maquina)
        })
        setAtualizaTabela(false)
    }, [update, atualizaTabela])


  
    function handleDelete(id, evt) {
        evt.preventDefault()
        api.delete(`celulas/maquinas/${id}`).then(response =>
            setAtualizaTabela(true)
        )
    }

    return (
        <div className="justify-center mt-5">
          
            <div className="col-span-12">
                <div className="overflow-auto lg:overflow-visible ">
                    <table className="table text-gray-400 border-separate space-y-6 w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="p-3">Máquina</th>
                                <th className="p-3 text-left">Tipo</th>
                                <th className="p-3 text-left">Nome</th>
                                <th className="p-3 text-left">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                               !maquina ? "" :
                                maquina.map((maq, index) => (
                                    <tr className="bg-gray-100" key={maq.id}>
                                        <td className="p-3">
                                            <div className="flex align-items-center">
                                                {/* <img className='rounded-full h-12 w-12  object-cover' alt='imageid'
                                                    src="https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" /> */}

                                                <div className="ml-3">
                                                    {/* <div className="">Appple</div> */}
                                                    <div className="text-gray-700 text-base">{maq.nome}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center p-3">
                                            {maq.tipo}
                                        </td>

                                        <td className="p-3 text-center">
                                            <span className="bg-green-400 text-gray-50 rounded-md px-2"></span>
                                        </td>
                                        <td className="p-3 flex inline-block">
                                            <button className="text-gray-400 hover:text-black mr-2">
                                                <i className="material-icons-outlined text-base"><FaEye /></i>
                                            </button>
                                            {/* <Link to={`/maquina/${maq.id}`} className="text-gray-400 hover:text-black mx-2">
                                                <i className="material-icons-outlined text-base"><FaEdit /></i>
                                            </Link> */}
                                            {/* <button onClick={handleDelete.bind(this, maq.id)} className="text-gray-400 hover:text-black  ml-2">
                                                <i className="material-icons-round text-base"><FaTrash /></i>
                                            </button> */}
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

export default TabelaCelMaq
