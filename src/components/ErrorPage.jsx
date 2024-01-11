import { useRouteError } from "react-router-dom";   //importa hook de error

export default function ErrorPage() {   //declara funcion de error

    const error = useRouteError()   //usa el hook de error para recuperar el error
    // console.log(error.message)

    return(
        <div className="space-y-8">
            <h1 className="text-center text-6xl font-extrabold mt-20 text-blue-900">CRM - Clientes</h1>
            <p className="text-center">Hubo un Error</p>
            <p className="text-center">{error.statusText || error.message}</p>  
        </div>

    )
}