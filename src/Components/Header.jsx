import logo320 from "../images/svg/logo320.svg";
import logo from "../images/svg/logo.svg";
import {NavLink} from 'react-router-dom';
import './styles/Header.css';

function Header() {
	
	return (
		<header className="header">
			<picture className="logo">
				<source srcSet={logo320} media="(max-width: 375px)"/>
				<img src={logo} alt="Логотип"/>
			</picture>
			<nav className="menu">
				<NavLink to="/login"
				         className={({isActive}) => `menu__item ${isActive ? "menu__item_active" : ""}`}>Войти</NavLink>
				<NavLink to="/register"
				         className={({isActive}) => `menu__item ${isActive ? "menu__item_active" : ""}`}>Регистрация</NavLink>
			</nav>
		</header>
	);
}

export default Header;