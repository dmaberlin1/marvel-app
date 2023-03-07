import './charInfo.scss';
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

const CharInfo=(props)=> {
    const [char, setChar] = useState(null);
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);



    const {loading,error,getCharacter}=useMarvelService()

    useEffect(() => {
       updateChar()
    }, [props.charId]);




    const updateChar = () => {
        const {charId} = this.props;
        if (!charId) return

        onCharLoading()
       getCharacter(charId)
          .then(onCharLoaded)
          .catch(onError)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

    // const onCharLoading = () => {
    //     setLoading(loading=>true)
    //
    // }
    // const onError = () => {
    //     setError(false)
    //     setLoading(false)
    // }


        const skeleton=char || loading||error? null : <Skeleton></Skeleton>
        const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
        const spinner = loading ? <Spinner></Spinner> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null


        return (
          <div className="char__info">
              {skeleton}
              {errorMessage}
              {spinner}
              {content}
          </div>
        )



}

const View = ({char}) => {
    const {thumbnail, name, homepage, wiki, description,comics} = char


    // let imgStyle = {'objectFit' : 'cover'};
    // if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    //     imgStyle = {'objectFit' : 'contain'};
    // }

    return (
      <>
          <div className="char__basics">
              <img draggable='false' src={thumbnail} alt={name}/>
              <div>
                  <div className="char__info-name">{name}</div>
                  <div className="char__btns">
                      <a draggable={'false'} href={homepage} className="button button__main">
                          <div className="inner">homepage</div>
                      </a>
                      <a draggable={'false'} href={wiki} className="button button__secondary">
                          <div className="inner">Wiki</div>
                      </a>
                  </div>
              </div>
          </div>
          <div className="char__descr">
              {description}
          </div>
          <div className="char__comics">Comics:</div>
          <ul className="char__comics-list">
              {/*{comics.length>0 ?null:'There is no comics with this character'}*/}
              {/* альтернативный способ я сделал в компоненте*/}
              {comics.length>0 ? comics.map((item,i)=>{
              if (i>12) return;
              //такой способ подходит если у нас мало элементов, потому что цикл всё равно будет крутить
              return(
              <li key={i}
              className="char__comics-item">
          {item.name}
              </li>
              )
          }) : <li>Stealthy hero didn't tell us which comics to find him in</li>}

          </ul>
      </>
    )
}
CharInfo.propTypes={
    charId:PropTypes.number
}
export default CharInfo;