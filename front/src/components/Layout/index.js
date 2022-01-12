import React from 'react'
import Sidebar from '../Sidebar'
import Rotas from '../../routes'

function Layout() {
    return (
        <div>
            <div className='min-h-screen relative md:flex'>

                <Sidebar />

                <div className="flex-1 bg-gray-50 p-10">
                    <Rotas />
                </div>
            </div>
        </div>
    )
}

export default Layout

