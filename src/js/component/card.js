import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Card = ({ data, type }) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Efecto para cargar los datos del tipo correspondiente cuando el componente se monta
  useEffect(() => {
    if (type === "people" && store.characters.length === 0) {
      actions.getCharacters();
    } else if (type === "planets" && store.planets.length === 0) {
      actions.getPlanets();
    } else if (type === "starships" && store.starships.length === 0) {
      actions.getStarships();
    }
  }, [type, actions, store.characters.length, store.planets.length, store.starships.length]);

  // Función para manejar la navegación al detalle
  const handleNavigate = () => {
    navigate(`/single/${type}/${data.uid}`);
  };

  // Función para manejar los favoritos
  const handleFavorite = () => {
    actions.toggleFavorite({ uid: data.uid, name: data.name, type });
  };

  // Determinar el nombre y la imagen según el tipo de dato
  let name = "";
  let imageUrl = "https://starwars-visualguide.com/assets/img/placeholder.jpg"; // default de la api

  if (type === "people") {
    name = data.name;
    imageUrl = `https://starwars-visualguide.com/assets/img/characters/${data.uid}.jpg`
  } else if (type === "planets") {
    name = data.name;
    imageUrl = `https://starwars-visualguide.com/assets/img/planets/${data.uid}.jpg`
  } else if (type === "starships") {
    name = data.name;
    imageUrl = `https://starwars-visualguide.com/assets/img/starships/${data.uid}.jpg`
  }

    return (
      <div className="card m-2 rounded-3 overflow-hidden bg-black" style={{display: "inline-block"}}>
        <img
          className="card-img-top mt-2"
          src={imageUrl} //la default o la que me traiga de la api
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
          }}
        />
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <h5 className="card-title text-light">{name}</h5>
          <div className="mt-2">
            <button
              onClick={handleNavigate}
              className="btn btn-outline-primary btn-sm mb-2"
              style={{ width: "100%" }}
            >
              Learn more!
            </button>
            <button
              onClick={handleFavorite}
              className="btn btn-outline-warning btn-sm"
              style={{ width: "100%", marginTop: "5px" }}
            > Add to favorites
            </button>
          </div>
        </div>
      </div>
    )
};

export default Card;