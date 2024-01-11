import { Outlet , Link, useLocation} from "react-router-dom"

const Layout = () => {
    const location  = useLocation()
    // console.log(location)
    
    return (
        //se activa flex para asignar 1/4 a la izq y 3/4 a la derecha
        <div className="md:flex md:min-h-screen"> {/*div principal que contiene dos elementos*/}
            <aside className="md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className="text-4xl font-black text-center text-white">CMR - Cliente</h2>
                <nav className="mt-10">
                    <Link 
                        className= {`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                        to="/" >Clientes</Link>
                    <Link 
                    className= {`${location.pathname === '/clientes/nuevo' ? 'text-blue-300' : 'text-white'} text-2xl block mt-2 hover:text-blue-300`}
                    to="/clientes/nuevo" >Nuevo Cliente</Link>
                </nav>
            </aside>
            <main className="md:w-3/4 p-10 md:h-screen overflow-auto">
                <Outlet/> 
            </main>            
        </div>
    )
}

export default Layout