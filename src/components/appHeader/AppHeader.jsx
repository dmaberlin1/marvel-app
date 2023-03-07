import './appHeader.scss';
import {NavLink} from "react-router-dom";

const AppHeader = () => {
    return (
      <header className="app__header">
          <h1 className="app__title">
              <a draggable='false' href="#">
                  <span>Marvel</span> information portal
              </a>
          </h1>
          <nav className="app__menu">
              <ul>
                  <li>
                      <NavLink end
                               style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}
                               draggable='false' href="#" to={'/'}>
                          Characters
                      </NavLink>
                  </li>
                  /
                  <li>
                      <NavLink end
                               style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}
                               draggable='false' href="#" to={'/'}>
                          Comics</NavLink>
                  </li>
              </ul>
          </nav>
      </header>
    )
}

export default AppHeader;