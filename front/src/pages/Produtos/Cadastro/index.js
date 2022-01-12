import React, { useState, useEffect } from 'react'
import { Link, useHistory, } from 'react-router-dom'
import DatePicker from "react-datepicker";
import moment from 'moment'
// import Select from 'react-select';


import "react-datepicker/dist/react-datepicker.css";

import api from '../../../services/api'

import './styles.css';
import stock from './../../../assets/stock.svg'

export default function Saida() {

    const history = useHistory();
    const [schools, setSchools] = useState([]);

    const [state, setState] = useState({
        quantidade: "",
        code: "",
        name: "",
        school_id: ""
    })

    useEffect(() => {
        api.get('school').then(response => {
            setSchools(response.data)
        })
    }, [setSchools])

    async function handleSubmit(e) {

        e.preventDefault();
        const data = state
        console.log(data);

        try {
            await api.post('saida', data, {
                headers: {
                    //       Authorization: ongId,
                }
            }

            )
            history.push('/dashboard')
        } catch (error) {
            alert(`Erro ao cadastrar ${error}`)

        }

    }
    function handleChange(evt) {
        evt.preventDefault();

        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
        console.log(value)
    }

    return (
        <>
           
            <div className="container-saida">
                <div className="content">
                    <header>
                        <p>Cadastro de Produto</p>
                        <img src={stock} width={125} alt="" />
                    </header>
                    <form onSubmit={handleSubmit}>
                        {/* <Select
                           // value={schools}
                            onChange={handleChange}
                            options={schools}
                        /> */}

                        <input type="text"
                            placeholder="Código"
                            name="code"
                            value={state.code}
                            onChange={handleChange} />
                        <input type="text"
                            placeholder="Descrição"
                            maxLength="100"
                            name="description"
                            value={state.description}
                            onChange={handleChange} />
                        <div className="line">
                            <input type="text"
                                placeholder="Peso ou metros"
                                name="tecido"
                                value={state.name}
                                onChange={handleChange} />
                            <select name="tecido" defaultValue="malha" onChange={handleChange} autosize={true}>
                                <option value="malha" >Kg</option>
                                <option value="plano" >m</option>
                            </select>
                        </div>
                       
                        <select name="color" defaultValue="color" onChange={handleChange} autosize={true}>
                            <option value="color" disabled>Cor</option>
                            {
                                schools.map(school => (
                                    <option value={school.id} key={school.id} className="text">{school.name}</option>

                                ))}
                        </select>


                        <button className="button" type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    )
}