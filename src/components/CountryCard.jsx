import "./styles/CountryCard.css"
const CountryCard = ({item}) => {

  if (!item.languages){
    return "error"
  }



 
  return (
    <div className='card_country'>
        <img className="card_countryImg" src={item.flags.png} alt='' />
        <h2 className="card_countryName">Nombre Pais: {item.name.common}</h2>
        <h4 className="card_countryCapital">Capital: {item.capital?.[0]}</h4>
        <h4 className="card_countryArea">Area <br></br><span className="spanArea">{item.area} Mts<sup>2</sup> </span></h4>
        <h4 className="card_countryPopulation">Pulation <br></br><span className="spanArea">{item.population} </span></h4>
        <h5 className="card_countryLanguages">
          <details>
            <summary>Idiomas</summary>
            <ul>{Object.entries(item.languages).map((language,index)=>
          <li className="language" key={index}>{language[1]}</li>
        )}
        </ul>
          </details>
          </h5>
    </div>
  )
}

export default CountryCard