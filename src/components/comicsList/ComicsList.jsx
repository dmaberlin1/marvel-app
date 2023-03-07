import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import {Link} from "react-router-dom";
import {useState} from "react";
import useMarvelService from "../../services/MarvelService";

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const{loading,error,getAllComics}=useMarvelService()

    return (
      <div className="comics__list">
          <ul className="comics__grid">
              <li className="comics__item">
                  <Link to={`/comics/${item.id}`}>
                      <img
                        draggable='false' src={uw} alt="ultimate war" className="comics__item-img"/>
                      <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                      <div className="comics__item-price">9.99$</div>
                  </Link>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={xMen} alt="x-men" className="comics__item-img"/>
                      <div className="comics__item-name">X-Men: Days of Future Past</div>
                      <div className="comics__item-price">NOT AVAILABLE</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={uw} alt="ultimate war" className="comics__item-img"/>
                      <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                      <div className="comics__item-price">9.99$</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={xMen} alt="x-men" className="comics__item-img"/>
                      <div className="comics__item-name">X-Men: Days of Future Past</div>
                      <div className="comics__item-price">NOT AVAILABLE</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={uw} alt="ultimate war" className="comics__item-img"/>
                      <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                      <div className="comics__item-price">9.99$</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={xMen} alt="x-men" className="comics__item-img"/>
                      <div className="comics__item-name">X-Men: Days of Future Past</div>
                      <div className="comics__item-price">NOT AVAILABLE</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={uw} alt="ultimate war" className="comics__item-img"/>
                      <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                      <div className="comics__item-price">9.99$</div>
                  </a>
              </li>
              <li className="comics__item">
                  <a href="#">
                      <img draggable='false' src={xMen} alt="x-men" className="comics__item-img"/>
                      <div className="comics__item-name">X-Men: Days of Future Past</div>
                      <div className="comics__item-price">NOT AVAILABLE</div>
                  </a>
              </li>
          </ul>
          <button className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
    )
}

export default ComicsList;