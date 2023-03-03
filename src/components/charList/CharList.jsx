import './charList.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading:false,
        offset:215,
        charEnded:false
    }

    marvelService = new MarvelService()

    componentDidMount() {
       this.onRequest()
    }
    onRequest=(offset)=>{
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
          .then(this.onCharListLoaded)
          .catch(this.onError)
    }

    onCharListLoading=()=>{
        this.setState({
            newItemLoading:true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended=false;
        if(newCharList.length<9){
            ended=true;
        }

        this.setState(({offset,charList})=>({
            charList:[...charList,...newCharList],
              loading: false,
            newItemLoading:false,
            offset:offset+9,
            charEnded:ended


        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов

        // По возможности, не злоупотребляйте рефами, только в крайних случаях
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
    }


    // Этот метод создан для оптимизации,
    // чтобы не помещать такую конструкцию в метод render
    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }
            return (
              <li
                className={'char__item'}
                ref={this.setRef}
                onClick={()=>this.props.onCharSelected(item.id)}
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

    render() {
        const {charList, loading, error,offset,newItemLoading,charEnded} = this.state
        const items = this.renderItems(charList)

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
                style={{'display':charEnded? 'none':'block'}}
                onClick={()=>this.onRequest(offset)}
                className="button button__main button__long">
                  <div className="inner">load more</div>
              </button>
          </div>
        )
    }
}

export default CharList;