import {useState,useEffect} from 'preact/hooks'
import express from 'express'
import cors from 'cors'
import { databases } from './lib/appwrite'
import {ID} from 'appwrite'
import './app.css'

export function App() {

  const app = express()
  app.use(cors())

  const id_collection = '65bac118125fc9cb609c'
  const id_db = '65bac0ca8c54fd783b76'

  const userId = '65bac55c42cd199eefe6'//se utiliza un usuario ya registrado solo para las pruebas

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [createdIdeas, setCreatedIdeas] = useState([])
  const [changing, setChanging] = useState(false)

  async function createIdea() {
    await databases.createDocument(
      id_db,
      id_collection,
      ID.unique(),
      {
        userId : userId,
        title : title,
        description : description
      }
    )
    setChanging(!changing)
  }
  function getIdeas(){
    databases.listDocuments(
      id_db,
      id_collection
    ).then((data)=>{
      setCreatedIdeas(data.documents)
    }).catch((e)=>console.log(e))
  }

  useEffect(()=>{
    getIdeas()
  },[changing])

  async function getbyid(){
    const ideas = await databases.getDocument(
      id_db,
      id_collection,
      "65bb02ecc9277c708754"
    )
    console.log(ideas)
  }
  function updateIdea(idIdea){
    databases.updateDocument(
      id_db,
      id_collection,
      idIdea,
      {
        userId : userId,
        title : title,
        description : description
      }
    ).then((data)=>{setChanging(!changing); console.log(data)})
    .catch((e)=>console.log(e))
  }
  function deleteIdea(idIdea){
    databases.deleteDocument(
      id_db,
      id_collection,
      idIdea
    ).then((data)=>{setChanging(!changing); console.log(data)})
    .catch((e)=>console.log(e))
  }

  return (
    <>
    <h1>Crea Ideas!</h1>
    <button onClick={()=>alert('Usa los mismos inputs para crear o actualizar ideas')}>Info</button>
    <div style={{display:"flex",flexDirection:"column",gap:".5rem",marginTop:"1rem"}}>
      <input type="text" placeholder='titulo de la idea' value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <input type="text" placeholder='descripcion para la idea' value={description} onChange={(e)=>setDescription(e.target.value)}/>
      <button onClick={createIdea}>Crear</button>
    </div>
    <h2>Ideas Creadas:</h2>
    <ol>
    {
      createdIdeas.map((idea,i)=>(
        <li>
          <div key={i}>
            <p>ID: {idea.$id}</p>
            <h3>titulo: {idea.title}</h3>
            <p>descripcion: {idea.description}</p>
            <button onClick={()=>updateIdea(idea.$id)}>Actualizar</button>
            <button onClick={()=>deleteIdea(idea.$id)}>Eliminar</button>
          </div>
        </li>
      ))
    }
    </ol>
    </>
  )
}
