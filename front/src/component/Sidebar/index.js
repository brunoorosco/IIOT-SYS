import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const navBar = () => {
        document.getElementById("sidebar").classList.toggle("-translate-x-full");
    };

    return (
        <>
            {/* <!-- mobile menu bar --> */}
            <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">

                {/* <!-- logo --> */}
                <Link to="#" className="block p-4 text-white font-bold">IST SENAI 1.07</Link>

                {/* <!-- mobile menu button --> */}
                <button class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700" onClick={navBar}>
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>


            <div className='sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 
                            absolute inset-y-0 left-0 transform -translate-x-full 
                            md:relative md:translate-x-0 transition duration-200 ease-in-out text-2xl'
                            id='sidebar'>
                <nav>
                    <Link to="/qrcode" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                        Qr Code's
                    </Link>
                    <Link to="/dash" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                        Dashboard
                    </Link>
                    <Link to="/celula" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                        Produção
                    </Link>
                    <Link to="/op" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                        Pedidos
                    </Link>
                </nav>
            </div>

        </>

    )
}