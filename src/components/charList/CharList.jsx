import './charList.scss';
import {Component, useEffect, useRef, useState} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(215);
    const [charEnded, setCharEnded] = useState(false);


    const marvelService = new MarvelService()

    useEffect(() => {
        onRequest()
    }, []);


    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
          .then(this.onCharListLoaded)
          .catch(this.onError)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)

    }

    const onError = () => {
        setError(true)
        setLoading(false)
    }


    const itemRefs = useRef([]);


    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }


    // Этот метод создан для оптимизации,
    // чтобы не помещать такую конструкцию в метод render
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }
            return (
              <li
                className={'char__item'}
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    props.onCharSelected(item.id)
                    focusOnItem(i)
                }}
                key={item.id}>
                  <img draggable='false' src={item.thumbnail} alt={item.name} style={imgStyle}/>
                  <div className={'char__name'}>{item.name}</div>
              </li>
            )
        });

        return (
          <ul className={'char__grid'}>
              {items}
          </ul>
        )

    }


    const items = renderItems(charList)

    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
    const spinner = loading ? <Spinner></Spinner> : null;
    const content = !(loading || error) ? items : null


    return (
      <div className="char__list">
          {errorMessage}
          {spinner}
          {content}

          <button
            disabled={newItemLoading}
            style={{'display': charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
            className="button button__main button__long">
              <div className="inner">load more</div>
          </button>
      </div>
    )

}

export default CharList;