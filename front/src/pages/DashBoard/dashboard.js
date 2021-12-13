import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import api from '../../services/api'
import 'moment/locale/pt-br'

function Dashboard({ props }) {


    const [tempo, setTempo] = useState(moment().format('LTS'))
    const [data, setData] = useState(moment().format('L'))
    const [total, setTotal] = useState('')
    const [final, setFinal] = useState('')
    const [celula, setCelula] = useState([])
    const [meta, setMeta] = useState([])

    useEffect(() => {
        const timer = setInterval(() => {
            setTempo(moment().format('LTS'))
        }, 1000);
        return () => clearInterval(timer);
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            api.get('qrcode/producao/aberta').then(response => {
                setTotal(response.data.length)
            })

            api.get('qrcode/producao/finalizada').then(response => {
                setFinal(response.data.length)
            })

        }, 10000);
        return () => clearInterval(timer);
    }, [setTotal]);

    useEffect(() => {
        api.get('qrcode/producao/aberta').then(response => {
            setTotal(response.data.length)
        })
        api.get('qrcode/producao/finalizada').then(response => {
            setFinal(response.data.length)

        })
        api.get('celulas/dash').then(response => {
            const { data } = { ...response }
            setCelula(data)
        })
    }, []);


    const history = useHistory();

    return (
        <>
            <div className='grid gap-2 mx-2 lg:text-1xl md:text-xl sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5'>
                {
                    celula.map((cel, index) => (
                        <div className='border border-gray-200 rounded'>
                            <div className='p-3'>
                                <div className='flex'>
                                    <p className='font-semibold'>Célula: </p>
                                    <p className='ml-3'> {celula[index].nome}</p>
                                </div>
                            </div>

                            <div className='p-3'>
                                <div className='bl'>
                                    <span className='font-semibold'>Data:</span>
                                    <span className='ml-3'>
                                        {data}
                                    </span>
                                </div>
                            </div>

                            <div className='p-3'>
                                <div className='flex'>
                                    <div className='flex-1 flex-col'>
                                        <div className='font-semibold'>Peças Dia</div>
                                        <div className='ml-3'>{final}</div>
                                    </div>

                                    <div className='flex-1'>
                                        <div className='font-semibold'>Meta</div>
                                        <div >{celula[index].meta}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='p-3'>
                                <div className='bl'>
                                    <span className='font-semibold'>Eficiência: </span>
                                    <span>
                                        99%
                                    </span>
                                </div>
                            </div>


                            <div >

                                <div className='p-3'>
                                    <div className='bl rg'>
                                        <span className='font-semibold'>Tempo Padrão:</span>
                                        <span> {celula[index].tempoPadrao} seg </span>
                                    </div>
                                </div>

                                <div className='p-3'>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold'>Pedidos em Produção</span>
                                        <span className='subtitle'>
                                            Total: {total}
                                        </span>
                                        <span className='subtitle'>
                                            Minutos: {celula[index].minutos}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>



        </>)

}

export default Dashboard