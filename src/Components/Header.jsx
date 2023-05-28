import logo320 from "../images/svg/logo320.svg";
import logo from "../images/svg/logo.svg";
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import './styles/Header.css';

function Header({isLoggedIn, userData, setIsLoggedIn}) {
	
	const navigate = useNavigate();
	const location = useLocation();
	
	function signOut() {
		localStorage.removeItem('jwt');
		setIsLoggedIn(false);
		navigate('/login');
		
	}
	
	return (
		<header className="header">
			<picture className="logo">
				<source srcSet={logo320} media="(max-width: 375px)"/>
				<img src={logo} alt="Логотип"/>
			</picture>
			<nav className="menu">
				{isLoggedIn ? <NavLink className={'user__link'} to="#">
					<p className={'user__email'}>
						{/*{userData.data.email} */}
					</p></NavLink> : ''}
				{location.pathname === "/register"
					&& <NavLink to="/login"
					            className={({isActive}) => `menu__item ${isActive ? "menu__item_active" : ""}`}> {isLoggedIn ?
						<p onClick={signOut}
						   className={'menu__exit'}>Выйти</p> : 'Войти'}</NavLink>}
				{location.pathname === "/login"
					&& <NavLink to="/register"
					            className={({isActive}) => `menu__item ${isActive ? "menu__item_active" : ""}`}>{isLoggedIn ? '' : 'Регистрация'}</NavLink>}
			</nav>
		</header>
	);
}

export default Header;