import { useContext } from 'react';
import styles from './Header.module.scss';
import { NavLink } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';

function Header() {
  const { user, signout } = useContext(AuthContext)
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <div className="flex-fill">
        <NavLink to="/">
          <strong>JWT</strong>
        </NavLink>
      </div>
      { user ? (
        <ul className={styles.headerList}>
          <NavLink to="profile" className="mr-15">Profil</NavLink>
          <NavLink onClick={()=>signout()} className="mr-15">Déconnexion</NavLink>
        </ul>
      ) : (
        <ul className={styles.headerList}>
          <NavLink to="signup" className="mr-15">Inscription</NavLink>
          <NavLink to="signin" className="mr-15">Connexion</NavLink>
        </ul>
      ) }
    </header>
  );
}

export default Header;