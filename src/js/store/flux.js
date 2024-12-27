const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: JSON.parse(localStorage.getItem("characters")) ||[],
			planets: JSON.parse(localStorage.getItem("planets")) || [],
			starships: JSON.parse(localStorage.getItem("starships")) || [],
			loading: false,
			favorites: JSON.parse(localStorage.getItem("favorites")) || [],
		},
		actions: {
			getCharacters: async () => {
				try {
				  const response = await fetch("https://www.swapi.tech/api/people/");
				  const data = await response.json();
				  const charactersWithUid = data.results.map((character) => ({
					...character,
					uid: character.url.split("/")[5], // Extrae el ID de la URL
				  }));
				  setStore({ characters: charactersWithUid });
				  localStorage.setItem("characters", JSON.stringify(charactersWithUid));
				} catch (error) {
				  console.error("Error fetching characters:", error);
				}
			},

			getPlanets: async () => {
				try {
				  const response = await fetch("https://www.swapi.tech/api/planets/");
				  const data = await response.json();
				  const planetsWithUid = data.results.map((planet) => ({
					...planet,
					uid: planet.url.split("/")[5], // Extrae el ID de la URL
				  }));
				  setStore({ planets: planetsWithUid });
				  localStorage.setItem("planets", JSON.stringify(planetsWithUid));
				} catch (error) {
				  console.error("Error fetching planets:", error);
				}
			},

			getStarships: async () => {
				try {
				  const response = await fetch("https://www.swapi.tech/api/starships/");
				  const data = await response.json();
				  const starshipsWithUid = data.results.map((ship) => ({
					...ship,
					uid: ship.url.split("/")[5], // Extrae el ID de la URL
				  }));
				  setStore({ starships: starshipsWithUid });
				  localStorage.setItem("starships", JSON.stringify(starshipsWithUid));
				} catch (error) {
				  console.error("Error fetching starships:", error);
				}
			},

			fetchData: async () => {
				await getActions().getCharacters();  // Obtener personajes
				await getActions().getPlanets();     // Obtener planetas
				await getActions().getStarships();   // Obtener naves espaciales
			},

			toggleFavorite: (item) => {
				const store = getStore();
				const isFavorite = store.favorites.some(
				  (fav) => fav.uid === item.uid && fav.type === item.type
				);
		
				if (isFavorite) {
				  const updatedFavorites = store.favorites.filter(
					(fav) => !(fav.uid === item.uid && fav.type === item.type)
				  );
				  setStore({ favorites: updatedFavorites });
				  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
				} else {
					const updatedFavorites = [...store.favorites, item];
				  	setStore({ favorites: updatedFavorites });
					localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
				}
			},

			removeAllFavorites: () => {
				setStore({ favorites: [] });
				localStorage.removeItem("favorites");
			},
		}
	};
};

export default getState;
