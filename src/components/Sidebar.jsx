import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators } from "../redux/actions";
import { useSelector } from "react-redux";
import tweetLogo from "../img/twitter-tweet-icon-28.jpg";

export default function Sidebar({ toggle }) {
	const username = useSelector((state) => state.userData.user.username);

	const dispatch = useDispatch();
	const history = useHistory();

	function handleClick() {
		dispatch(actionCreators.logOut());
		history.push("/login");
	}

	return (
		<div className="sidebar d-flex flex-column justify-content-between text-center text-md-left">
			<div className="row">
				<div className="col">
					<h3>
						<i className="fab fa-twitter pl-3 mb-4 pt-3"></i>
					</h3>
					<h4>
						<Link to="/">
							<i className="fas fa-home pl-3 pr-2 mb-4"></i>
							<span className="d-none d-md-inline-block">Home</span>
						</Link>
					</h4>
					<h4>
						<i className="fas fa-hashtag pl-3 pr-3 mb-4"></i>
						<span className="d-none d-md-inline-block">Explorar</span>
					</h4>
					<h4>
						<i className="fas fa-bell pl-3 pr-3 mb-4"></i>
						<span className="d-none d-md-inline-block">Notificaciones</span>
					</h4>
					<h4>
						<i className="fas fa-inbox pl-3 pr-2 mb-4"></i>
						<span className="d-none d-md-inline-block">Mensajes</span>
					</h4>
					<h4>
						<i className="fas fa-bookmark pl-3 pr-3 mb-4"></i>
						<span className="d-none d-md-inline-block">Guardados</span>
					</h4>
					<h4>
						<i className="fas fa-list-alt pl-3 pr-3 mb-4"></i>
						<span className="d-none d-md-inline-block">Listas</span>
					</h4>
					<h4>
						<Link to={`/profile/${username}`}>
							<i className="fas fa-user pl-3 pr-3 mb-4"></i>
							<span className="d-none d-md-inline-block">Perfil</span>
						</Link>
					</h4>
					<button
						onClick={toggle}
						className="btn btn-twitter btn-block rounded-pill mt-5 d-none d-md-block"
					>
						Twittear
					</button>
					<img src={tweetLogo} alt="Foto" className="avatar-small d-md-none" />
				</div>
			</div>

			<div className="row">
				<div className="col">
					<div onClick={handleClick} className="mb-3">
						<button className="btn btn-block btn-outline-twitter rounded-pill mt-5 d-none d-md-block">
							Logout
						</button>
						<i className="fas fa-sign-out-alt d-md-none"></i>
					</div>
				</div>
			</div>
		</div>
	);
}
