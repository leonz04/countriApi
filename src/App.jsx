import { useEffect, useRef, useState } from 'react'

import './App.css'
import axios from 'axios'
import CountryCard from './components/CountryCard'

function App() {

  //Estados para almacenar datos originales y los filtrados
  const [data, setData] = useState(null)
  const [allData, setAllData]= useState(null)
  const [url, setUrl] = useState('https://restcountries.com/v3.1/all')

  
  //referencia para los inputs
  const inputCountry = useRef()
  const inputRegion = useRef()
  const inputLang = useRef()


  useEffect(() => {



    axios.get(url)
      .then(res=>{
        setData(res.data)
        setAllData(res.data)// Guardamos los datos originales
      })
      .catch(err=>{
        console.log(err)
      })   
  }, [url])

  console.log(data)




  if (!data){
    return <h1>Cargando</h1>
  }

  //funcion filtro pais
  const buscarPais=(event)=>{
    event.preventDefault()

    if(inputCountry.current.value==""){
      setData(allData)
        }else{
          const filteredData = allData.filter(country=>
            country.name.common.toLowerCase().includes(inputCountry.current.value.toLowerCase())
          );
          setData(filteredData)

    }
    console.log(inputCountry.current.value)
  }



  //Función filtrar Region
  const filtrarRegion=(event)=>{
    event.preventDefault()

    const region= inputRegion.current.value;

    if(region){
      const filteredData = allData.filter(country=>country.region.toLowerCase()===region.toLowerCase());
      setData(filteredData)
    }else{
      setData(allData)
    }

   
  }

  //funcion filtrado idioma
  const filtrarLanguage=()=>{

    const language=inputLang.current.value

    if(language){
      axios.get(`https://restcountries.com/v3.1/lang/${language}`)
      .then(res=>{
        setData(res.data)
      })
      .catch(err=>{
        console.log(err)
        alert('Error al obtener los paises para el idioma ingresado')
      })
    }else{
      setData(allData)
    }



  }



  
  

  return (
    <div className='container'>
      
      <div className='filterBar'>   

          {/*filtrado por peticion por nombre pais*/}
          <form onSubmit={buscarPais}>
          <h3>Filtrado por pais</h3>

            <input ref={inputCountry} id="inputCountry" placeholder='Ingresa Pais' type='text'/>
            <button>Search</button>
          </form>

          {/*filtrado por la data*/}
          
          <form onSubmit={filtrarRegion}>
          <h3>Filtrado por Region</h3>
            <input ref={inputRegion} id="inputRegion" placeholder='Ingresa Region' type='text'/>
            <button>Search</button>
          </form>

          {/* filtrar idiomas */}
          <article>
          <h3>Filtrado por Idioma</h3>
          <select style={{ height: '20px' }} onChange={filtrarLanguage} ref={inputLang} id='inputLang'>
            
            <option value="">Seleciona una opcion</option>
            <option value="spanish">Spanish</option>
            <option value="english">English</option>

          </select>
          </article>

      </div>


    {/* Mapear los paises obtenidos */}
    {
      data?.map((item,index)=>(
        
        <CountryCard
        key={index}
        item={item}
        />


      ))
    }
    </div>
  )
}

export default App
