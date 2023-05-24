import logo320 from "../images/svg/logo320.svg";
import logo from "../images/svg/logo.svg";

function Header() {
	
	return (
		<header className="header">
			<picture className="logo">
				<source srcSet={logo320} media="(max-width: 375px)"/>
				<img src={logo} alt="Логотип"/>
			</picture>
		</header>
	);
}

export default Header;