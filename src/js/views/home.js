import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import Card from "../component/card";


export const Home = () => {
	const { store } = useContext(Context);
	const renderLoadingSpinner = () => (
	  <div className="spinner-container d-flex justify-content-center align-items-center">
		<div className="spinner-grow text-warning" role="status">
		  <span className="visually-hidden">Loading...</span>
		</div>
	  </div>
	);
	return (
		<div className="container mt-5 text-light">
			<h2 className="audiowide-regular">Characters</h2>
			<div className="overflow-x-auto horizontal-scroll">
			{store.characters && store.characters.length > 0
				? store.characters.map((character) => (
					<Card key={character.uid} data={character} type="people" />
				))
				: renderLoadingSpinner()}
			</div>

			<hr/>
	
			<h2 className="audiowide-regular pt-4">Planets</h2>
			<div className="d-flex overflow-x-scroll horizontal-scroll">
			{store.planets && store.planets.length > 0
				? store.planets.map((planet) => (
					<Card key={planet.uid} data={planet} type="planets" />
				))
				: renderLoadingSpinner()}
			</div>

			<hr/>
	
			<h2 className="audiowide-regular pt-4">Starships</h2>
			<div className="d-flex overflow-x-scroll horizontal-scroll">
			{store.starships && store.starships.length > 0
				? store.starships.map((starship) => (
					<Card key={starship.uid} data={starship} type="starships" />
				))
				: renderLoadingSpinner()}
			</div>

			<br/>
		</div>
	);
  };
