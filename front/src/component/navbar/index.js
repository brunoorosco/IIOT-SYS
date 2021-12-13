import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function Navbar() {

    function openMenu() {
        const menu = document.querySelector(".mobile-menu");
        menu.classList.toggle("hidden");
    }


    return (
        <header >
            <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>
                            
                                <Link to='#' className="flex items-center py-4 px-2">
                                    <img src="" alt="Logo" className="h-8 w-8 mr-2" />
                                    <span className="font-semibold text-gray-500 text-lg">Navigation</span>
                                </Link>
                            </div>
                        
                            <div className="hidden md:flex items-center space-x-1">
                                <Link to='/' className="py-4 px-2 text-red-500 border-b-4 border-red-500 font-semibold ">Home</Link>
                                <Link to='/qrcode' className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300">Qr Codes</Link>
                                <Link to='/dash' className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300">Dashboard</Link>
                                <Link to='/celula' className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300">Produção</Link>
                                <Link to='/op' className="py-4 px-2 text-gray-500 font-semibold hover:text-red-500 transition duration-300">Pedidos</Link>
                            </div>
                        </div>
                        {/* <!-- Secondary Navbar items --> */}
                        <div className="hidden md:flex items-center space-x-3 ">
                            <Link className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">Log In</Link >
                            <Link className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Sign Up</Link>
                        </div>
                     
                        <div className="md:hidden flex items-center">
                            <button className="outline-none mobile-menu-button" onClick={openMenu}>
                                <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                                    x-show="!showMenu"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* <!-- mobile menu --> */}
                <div className="hidden mobile-menu">
                    <ul className="">
                        <li className="active"><Link to="/" className="block text-sm px-2 py-4 text-white bg-red-500 font-semibold">Home</Link></li>
                        <li><Link to="/dash" className="block text-sm px-2 py-4 hover:bg-red-500 transition duration-300">Dashboard</Link></li>
                        <li><Link to="/op" className="block text-sm px-2 py-4 hover:bg-red-500 transition duration-300">Pedidos</Link></li>
                        <li><Link to="/celula" className="block text-sm px-2 py-4 hover:bg-red-500 transition duration-300">Produção</Link></li>
                        <li><Link to="/qrcode" className="block text-sm px-2 py-4 hover:bg-red-500 transition duration-300">Qr Code's</Link></li>
                    </ul>
                </div>

            </nav>
        </header>
    )
}

export default Navbar