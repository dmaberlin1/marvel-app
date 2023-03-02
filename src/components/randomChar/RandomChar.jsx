import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


//кнопка трай ит- нового персонажа
//картина img not found настроить по центру  -оbject-fit   contain -когда нет картинки у перса
//компонент чар лист реализовать
//сделать запрос на сервер- получить девять персонажей и построить на этих данных интерфейс с уникальными id

class RandomChar extends Component {
    state = {
        char: {},
        loading:true,
        error:false
    }

    marvelService = new MarvelService()


    componentDidMount() {
        this.updateChar()
    }
    componentWillUnmount() {
    }

    onCharLoading=()=>{
        this.setState({
            loading:true
        })
    }
    onCharLoaded = (char) => {
        this.setState({char,loading:false})
        //короткая запись будет {char} - на место char в стейте- приходит чар из промиса
    }

    onError=()=>{
        this.setState({
            loading:false,
            error:true
        })
    }
    updateChar = () => {
        // const id=1011005;
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        this.onCharLoading()
        this.marvelService
          .getCharacter(id).then(this.onCharLoaded).catch(this.onError)
        // .getAllCharacters().then(res=>console.log(res))

    }

    onGetRandomChar=()=>{
        this.updateChar()
    }

    render() {
        const {char,loading,error} = this.state;
        const errorMessage=error? <ErrorMessage></ErrorMessage> :null;
        const spinner=loading ? <Spinner></Spinner> :null;
        const content=!(loading|| error) ? <View char={char}/> :null;

        return (
          <div className="randomchar">
              {errorMessage}
              {spinner}
              {content}
              <div className="randomchar__static">
                  <p className="randomchar__title">
                      Random character for today!<br/>
                      Do you want to get to know him better?
                  </p>
                  <p className="randomchar__title">
                      Or choose another one
                  </p>
                  <button onClick={this.onGetRandomChar} className="button button__main">
                      <div className="inner">try it</div>
                  </button>
                  <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
              </div>
          </div>
        )
    }
}

const View=({char})=>{
    const {name, description, thumbnail, homepage, wiki}=char

   // const  showDescription= (description) => {
   //
   //      if( description.length > 190) return description.slice(0, 189)+'...'
   //      else return description
   //  }


     const showImg=thumbnail.length>66?'randomchar__img randomchar__img-not-avaliable':'randomchar__img'


    return(
      <div className="randomchar__block">
          <img src={thumbnail} alt="Random character" className={showImg}/>
          <div className="randomchar__info">
              <p className="randomchar__name">{name}</p>
              <p className="randomchar__descr">
                  {/*{description*/}
                  {/*  ?   showDescription(description)*/}
                  {/*  : 'There is no description for this amazing hero'}*/}
                  {description}
              </p>
              <div className="randomchar__btns">
                  <a href={homepage} className="button button__main">
                      <div className="inner">homepage</div>
                  </a>
                  <a href={wiki} className="button button__secondary">
                      <div className="inner">Wiki</div>
                  </a>
              </div>
          </div>
      </div>

    )
}

export default RandomChar;