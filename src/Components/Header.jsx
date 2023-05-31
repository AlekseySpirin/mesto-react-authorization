import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo320 from '../images/svg/logo320.svg';
import logo from '../images/svg/logo.svg';
import './styles/Header.css';

function Header({ isLoggedIn, userData, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  function signOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <header className='header'>
      <picture className='logo'>
        <source srcSet={logo320} media='(max-width: 375px)' />
        <img src={logo} alt='Логотип' />
      </picture>
      <nav className='menu'>
        {isLoggedIn ? (
          <NavLink className={'user__link'} to='#'>
            <p className={'user__email'}>{userData?.data.email}</p>
          </NavLink>
        ) : (
          ''
        )}
        {location.pathname === '/register' && (
          <NavLink to='/login' className={'menu__item'}>
            {isLoggedIn ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <p onClick={signOut} className={'menu__exit'}>
                Выйти
              </p>
            ) : (
              'Войти'
            )}
          </NavLink>
        )}
        {location.pathname === '/login' && (
          <NavLink to='/register' className={'menu__item'}>
            Регистрация
          </NavLink>
        )}
        {isLoggedIn ? (
          <NavLink to='/login' className={'menu__item'}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <p onClick={signOut} className={'menu__exit'}>
              Выйти
            </p>
          </NavLink>
        ) : (
          ''
        )}
        {/* [div] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment> */}
        {/* <Routes> */}
        {/*	<Route exact path="/"> */}
        {/*		*/}
        {/*		<div className="header__wrapper"> */}
        {/*			<p className="header__user">{userData.data.email}</p> */}
        {/*			<button className="header__logout" onClick={signOut}> */}
        {/*				Выйти */}
        {/*			</button> */}
        {/*		</div> */}
        {/*		*/}
        {/*	</Route> */}
        {/*	<Route path="/signup"> */}
        {/*		<Link className="header__auth-link" to="signin"> */}
        {/*			Войти */}
        {/*		</Link> */}
        {/*	</Route> */}
        {/*	<Route path="/signin"> */}
        {/*		<Link className="header__auth-link" to="signup"> */}
        {/*			Регистрация */}
        {/*		</Link> */}
        {/*	</Route> */}
        {/* </Routes> */}
      </nav>
    </header>
  );
}

export default Header;
