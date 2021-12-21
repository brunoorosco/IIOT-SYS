import React, { useState, useEffect } from 'react'
import moment from 'moment'
import api from '../../services/api'
import 'moment/locale/pt-br';
//import './styles.css'


export default function QrcodeList() {

    // State é onde 'guardamos' as variáveis, os dados da nossa aplicação que sofrerão alterações. É onde basicamente declaramos todas as variáveis do nosso componente
    const [qrcode, setQrcode] = useState([])

    useEffect(() => {
        api.get('qrcode').then(response => {
            setQrcode(response.data)
            //  console.log(response.data[0])
        })
    }, [setQrcode])


    async function handleDeleteMaterial(id) {
        try {
            await api.delete(`qrcode/${id}`, {
                headers: {
                    // Authorization: ongId
                }
            })
            setQrcode(qrcode.filter(material => material.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    return (
        <>
            <div className="items-center justify-center shadow lg:w-2/3 mx-auto">
                {/* <div className="max-w-3xl rounded shadow overflow-x-auto"> */}
                <div className='text-center mb-5'>
                    <p className='text-2xl font-semibold'>Qr Code's</p>
                </div>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr className='uppercase border-b-2'>
                                <th>Código</th>
                                <th>Entrada</th>
                                <th>Saída</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                            {  qrcode.length > 0 &&
                                qrcode.map((material, index) => (
                                    <tr className="border-b border-gray-200 dark:border-gray-900"
                                        key={material.qrcode}>
                                        <td className="py-4 sm:pl-6 pl-4">{material.qrcode}</td>

                                        <td className="py-4 sm:pl-6 pl-4">
                                            <p className="text-base font-semibold leading-none text-gray-800 dark:text-gray-100">Prevista</p>
                                            <p className="text-xg leading-3 text-gray-500 dark:text-gray-400 pt-2">Real: {material.entrada ? moment(material.entrada).format('DD/MM/YYYY |  HH:mm:ss') : ""}</p>
                                        </td>
                                        <td className="py-4 sm:pl-6 pl-4">
                                            <p className="text-base font-semibold leading-none text-gray-800 dark:text-gray-100">Prevista: 12/12/2021</p>
                                            <p className="text-xg leading-3 text-gray-500 dark:text-gray-400 pt-2">Real: {material.saida ? moment(material.saida).format('DD/MM/YYYY |  hh:mm:ss') : ""}</p>
                                        </td>
                                        <td className="py-4 sm:pl-6 pl-4">
                                            {material.finalizado === 'F' ? <p className="font-medium text-gray-400" disable>Finalizado</p> :
                                                material.finalizado === 'A' ? <p className="text-blue-400 font-medium">Em Produção</p> :
                                                    <p className="text-yellow-400 font-medium">Aguardando Fila</p>}
                                            <p className="text-xg leading-3 text-gray-500 dark:text-gray-400 pt-2">Setor: </p>
                                        </td>

                                        {/* <td className="text-center">
                                    <Link
                                        className='icon'
                                        to={`/material/${material.id}`}
                                    >
                                        <FiEdit size={15} color={'#0202B2'} />
                                    </Link>
                                    <Link
                                        className="icon" to='#'
                                        onClick={() => handleDeleteMaterial(material.id)}
                                    >
                                        <FiTrash size={15} color={'#b20202'} />
                                   </Link>
                                </td> */}
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* </div> */}
                </div>
            </div>

        </>
    )
}