import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import backgroundImage from "../../img/image.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	return (
		<nav className="navbar navbar-light mb-3" style={{backgroundImage: `url(${backgroundImage})`}}>
			<div className="container"></div>
			<Link to="/" className="nav-link">
				<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Star_Wars_Logo..png/640px-Star_Wars_Logo..png" style={{ height: "90px", width: "auto", objectFit: "contain" }}></img>
			</Link>
			
			{/* Botón favoritos */}
			<div className="btn-group">
				<button type="button" className="btn btn-warning dropdown-toggle mx-5" 
				data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "1.25rem" }}>
					<strong>Favorites</strong>
					<span className="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul className="dropdown-menu">
					{store.favorites.length > 0 ? (
						store.favorites.map((item, index) => (
							<li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
								<Link to={`/single/${item.type}/${item.uid}`} className="dropdown-item">
									{item.name}
								</Link>
								<button className="btn btn-sm btn-danger ms-2" onClick={() => actions.toggleFavorite(item)}>
									X
								</button>
							</li>
						))
					) : (
						<li className="dropdown-item"> No favorites added</li>
					)}
					{store.favorites.length > 0 && <li><hr className="dropdown-divider" /></li>}
					{store.favorites.length > 0 && (
						<li>
							<a className="dropdown-item" style={{ color: "red" }} onClick={() => actions.removeAllFavorites()} href="#">
								<strong>Remove all</strong>
							</a>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};
