import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


const More_info = () => {
  const { id } = useParams(); // Obtienes el ID desde la URL
  const { store } = useContext(Context);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const type = location.pathname.split('/')[2];

  useEffect(() => {
    let url = "";
    if (type === "people") {
      url = `https://www.swapi.tech/api/people/${id}`;
    } else if (type === "planets") {
      url = `https://www.swapi.tech/api/planets/${id}`;
    } else if (type === "starships") {
      url = `https://www.swapi.tech/api/starships/${id}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.result && data.result.properties) {
          setItem(data.result.properties);
        }        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      });
  }, [id, type]);

  const handleGoBack = () => { navigate("/"); };

  if (loading) return (
    <div className="spinner-container d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
	  </div>
  );

  // Ajuste para la URL de la imagen
  const imageType = type === "people" ? "characters" : type;

  return (
    <div className="container pb-4" style={{paddingTop: "24px", paddingLeft: "24px", paddingRight: "24px"}}>
      <div className="row">
          {/* Imagen principal */}
          <div className="col-md-4 p-1" style={{marginRight: "15px"}}>
            <img src={`https://starwars-visualguide.com/assets/img/${imageType}/${id}.jpg`}
            className="img-fluid"
            alt={item.name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }} />
          </div>

        {/* info */}
        <div className="col-md-7 p-1 text-light">
          <h2 className='audiowide-regular'>{item.name}</h2>
          {type === "people" && ( 
            <>
              <p><strong>Gender:</strong> {item.gender}</p>
              <p><strong>Height:</strong> {item.height}m</p>
              <p><strong>Birth year:</strong> {item.birth_year}</p>
              <p><strong>Eye color:</strong> {item.eye_color}</p>
              <p><strong>Hair color:</strong> {item.hair_color}</p>
            </>
          )}
          {type === "planets" && ( 
            <>
              <p><strong>Climate:</strong> {item.climate}</p>
              <p><strong>Diameter:</strong> {item.diameter}</p>
              <p><strong>Gravity:</strong> {item.gravity}</p>
              <p><strong>Population:</strong> {item.population}</p>
              <p><strong>Terrain:</strong> {item.terrain}</p>
            </>
          )}
          {type === "starships" && (
            <>
              <p><strong>Model:</strong> {item.model}</p>
              <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
              <p><strong>Cost in Credits:</strong> {item.cost_in_credits}</p>
              <p><strong>Length:</strong> {item.length}</p>
              <p><strong>Crew:</strong> {item.crew}</p>
              <p><strong>Passengers:</strong> {item.passengers}</p>
            </>
          )}
          <hr/>
          <button type="button" className="btn btn-warning" onClick={handleGoBack} aria-expanded="false" style={{ fontSize: "1.25rem" }}>
            <strong>Go back</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default More_info