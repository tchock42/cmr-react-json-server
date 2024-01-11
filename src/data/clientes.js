export async function obtenerClientes(){ //funcion desplegar todos los clientes desde el SERVER

    const respuesta = await fetch(import.meta.env.VITE_API_URL)
    const resultado = await respuesta.json()                        //convierte a objeto de javascript desde JSON
    
    return resultado;
}
export async function obtenerCliente(id){ //funcion para obtener el cliente a editar
    
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`) //busca en el SERVER cliente por id
    const resultado = await respuesta.json()                        //convierte a objeto de javascript desde JSON
    // console.log(resultado)
    return resultado;
}
export async function agregarCliente(datos) {
    
    try {
        // enviar nuevo registro
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',                                         //metodo POST
            body: JSON.stringify(datos),                            //selecciona los datos y convierte a JSON
            headers: {                                              //mas configuraciones
                'Content-Type': 'application/json'                  //tipo de contenido json
            }
        })

        await respuesta.json()                                      //retorna true o false

    } catch (error) {
        console.log(error)
    }

}

export async function actualizarCliente(id, datos){
    try {
        // enviar nuevo registro
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',                                         //metodo POST
            body: JSON.stringify(datos),                            //selecciona los datos y convierte a JSON
            headers: {                                              //mas configuraciones
                'Content-Type': 'application/json'                  //tipo de contenido json
            }
        })

        await respuesta.json()                                      //retorna true o false

    } catch (error) {
        console.log(error)
    }
}

export async function eliminarCliente(id){
    try {
        // enviar nuevo registro
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'                                     //metodo DELETE
        })

        await respuesta.json()                                      //retorna true o false

    } catch (error) {
        console.log(error)
    }
}