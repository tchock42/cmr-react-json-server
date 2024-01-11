import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({request}){ //function de tipo export para el action del formulario
  
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
  //Se ha validado el formulario | agregar los datos al JSON SERVER
  await agregarCliente(datos)     //espera hasta que se agrega el cliente

  return redirect('/')

}

//function Nuevo Cliente      //
const NuevoCliente = () => {

  const errores = useActionData()
  const navigate = useNavigate() //redirección del usuario
  // console.log(errores)


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
          <Formulario />

          <input 
            type="submit" 
            className="bg-blue-800 p-3 uppercase font-bold text-white text-lg" 
            value="Registrar Nuevo Cliente"
          />
        </Form>
      </div>
      
    </>
  )
}

export default NuevoCliente
