import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import Formulario from "../components/Formulario";
import Error from "../components/Error"; 

export async function loader({params}){ //este loader se encarga de retornar el cliente leido en el query string
    const cliente = await obtenerCliente(params.clienteId) //identifica
  
    if(Object.values(cliente).length === 0){  //si no se encuentra cliente con ese id
      throw new Response('', {                //configura un mensaje de error.
        status: 404,
        statusText: "El cliente no fue encontrado"
      })
    }
    return cliente;                           //retorna el cliente encontrado
    
}

//funcion para actualizar el cliente
export async function action({request, params}){ //toma request y params para identificar que cliente se requiere
    
  const formData = await request.formData(); //accede al metodo formData de la peticion POST para crear un objeto formData

  const datos = Object.fromEntries(formData) //obtiene los datos del formData
  const email = formData.get('email')   //extrae el campo con name email

  //validacion
  const errores = [];                     //array de errores
  if(Object.values(datos).includes('')){   //
    errores.push('Todos los campos son obligatorios');
  }
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"); 

  if(!regex.test(email)){ //regex devuelve true si es un email valido | "Si no es valido el email"
    errores.push('El correo electrónico no es válido')
  }
  
  if(Object.keys(errores).length){
    return errores                    
  }
  //Actualiza al cliente
  await actualizarCliente(params.clienteId, datos)          //envía el formData a actualizarCliente
  return redirect('/')                                      //redirecciona
}


function EditarCliente() {

  const navigate = useNavigate()      //hook para el navigate del boton volver
  const cliente = useLoaderData()     //hook para cargar el registro de cliente
  const errores = useActionData()     //hook que trae los errores
  // console.log(cliente)

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">A continuación modifica los datos del cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate('/')}
        >Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {/* Toma el error y su indice, agrega el componente de error, usa el indice de arreglo como key pasado como prop, no hay problema en este caso*/ }
        {errores?.length && errores.map( (error, i) => <Error key = {i}>{error}</Error> )} 
        
        <Form 
          method="POST"
          noValidate  
        >  
          <Formulario 
            cliente = {cliente}
          />

          <input 
            type="submit" 
            className="bg-blue-800 p-3 uppercase font-bold text-white text-lg" 
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente
