import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom'
import QrCodeGerador from '../../services/geradorQrCode';
import api from '../../services/api'
import './styles.css'

export default function QrCode() {

    const [state, setState] = useState({
        qrcode: "",
        qrEntrada: "",
        qrSaida: ""
    })
    const [mes, setMessage] = useState({
        message: "",
        alert: ""
    })
    const [hidden, setHidden] = useState(true)
    const history = useHistory();

    async function handleSubmit(e) {

        e.preventDefault();
        const data = state
        //console.log(data);

        try {
            await api.post('/qrcode', data, {
                headers: {
                    //       Authorization: ongId,
                }
            })
            setState({ ...state, qrcode: "" })
            alert('cadastro realizado com sucesso!!!')
        }
        catch (error) {
            alert(`Erro ao cadastrar ${error}`)

        }
    }
    async function handleSubmitUpdate(e) {
        e.preventDefault();
        const data = state
        const link = e.target.id
        //console.log(link)

        try {
            await api.put(`/qrcode/${link}`, data, {
                headers: {
                    //       Authorization: ongId,
                }
            }).then(function (response) {

                setState({
                    ...state,
                    qrEntrada: "",
                    qrSaida: ""
                })
                setMessage({
                    message: response.data.message,
                    alert: response.data.alert
                })
                setHidden(false)
                setTimeout(function () {
                    setHidden(true)
                }, 5000)

                console.log(`QrCode ${response.data.message}`)

            }).catch(function (error) {
                console.log(error);
            })
        }
        catch (error) {
            alert(`Erro ao cadastrar ${error}`)
        }
    }

    function handleChange(evt) {
        evt.preventDefault()
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
    }

    return (
        <>
            <div className={`bg-${mes.alert}-100 border border-${mes.alert}-400 text-${mes.alert}-700 px-4 py-3 rounded relative mx-1 my-2`} hidden={hidden} role="alert">
                <strong className="font-bold">Hey! </strong>
                <span className="block sm:inline">{mes.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Close</title>
                    </svg>
                </span>
            </div>
        <div className="mx-1 gap-2 grid lg:grid-cols-2 md:grid-cols-1  lg:text-3xl md:text-xl">
            {/* <div className={`notification msg ${mes.alert}`} hidden={hidden}>{mes.message}</div> */}



            <div className="p-3 border border-black border-opacity-75 rounded mb-2 ">
                <div className="text-center font-semibold">
                    <label>Registro</label>
                </div>
                <div className="grid block mx-7">
                    <input className='md:w-full border rounded-lg my-4 mx-auto p-3'
                        name="qrcode" value={state.qrcode} onChange={handleChange} placeholder='Nº da OP p/ registrar' />
                    <QrCodeGerador text={state.qrcode} />
                    <button className='btn btn-blue'
                        onClick={handleSubmit}>Salvar</button>
                </div>
            </div>

            <div className='md:grid md:gap-2 grid-cols-2'>
                <div className="p-3 border border-black border-opacity-75 rounded mb-2">
                    <div className="text-center font-semibold">
                        <label className="titulo-qr">ENTRADA</label>
                    </div>
                    <div className='grid block mx-7'>
                        <input className='md:w-full border rounded-lg my-4 mx-auto p-3'
                            name="qrEntrada" value={state.qrEntrada} onChange={handleChange} placeholder='Nº OP - Entrada na produção' />
                        <button className='btn btn-blue'
                            onClick={handleSubmitUpdate} id="entrada">Salvar</button>
                    </div>
                </div>

                <div className="p-3 border border-black border-opacity-75 rounded mb-2 ">
                    <div className="text-center font-semibold">
                        <label className="titulo-qr">SAÍDA</label>
                    </div>
                    <div className='grid block mx-7'>
                        <input className='md:w-full border rounded-lg my-4 mx-auto p-3'
                            name="qrSaida" value={state.qrSaida} onChange={handleChange} placeholder='Nº OP - Saída Produção' />

                        <button className='btn btn-blue'
                            onClick={handleSubmitUpdate} id="saida">Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );

}