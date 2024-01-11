import { useLoaderData } from "react-router-dom" //importa el hook useLoaderData
import Cliente from "../components/Cliente";
import { obtenerClientes } from "../data/clientes";

export function loader(){ //funcion que exporta el loader y retorna los datos

  // console.log(import.meta.env) //carga el .env con las variables de entorno
  const clientes = obtenerClientes() //ejecuta la funcion asincrona cargando el .env
  return clientes;
}

const Index = () => {     //funcion del componente <Index>

  const clientes = useLoaderData() //carga los datos importados a datos con el loader
  // console.log(clientes)

  return (                      //renderiza la vista <Index>
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus Clientes</p>

      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Cliente</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map( cliente => ( //por cada cliente se crea un renglon tr
            <Cliente
              cliente={cliente}
              key={cliente.id}
            />
          ))}
        </tbody>
        
      </table>
      ) : (
        <p className="text-center mt-10">No hay Clientes aún</p>
      )}

    </>
  )
}

export default Index
