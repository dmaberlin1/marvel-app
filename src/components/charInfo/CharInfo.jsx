import './charInfo.scss';
import {Component} from "react";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import PropTypes from "prop-types";

class CharInfo extends Component {

    state = {
        char: null,
        error: false,
        loading: false,
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

      componentDidUpdate(prevProps) {
        if(this.props.charId !==prevProps.charId){
            this.updateChar()
        }
      }

      componentDidCatch(error, errorInfo) {
        console.log(error,errorInfo);

      }

    updateChar = () => {
        const {charId} = this.props;
        if (!charId) return

        this.onCharLoading()
        this.marvelService.getCharacter(charId)
          .then(this.onCharLoaded)
          .catch(this.onError)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        const {char,loading,error} = this.state;

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


}

const View = ({char}) => {
    const {thumbnail, name, homepage, wiki, description,comics} = char


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
              {/* ???????????????????????????? ???????????? ?? ???????????? ?? ????????????????????*/}
              {comics.length>0 ? comics.map((item,i)=>{
              if (i>12) return;
              //?????????? ???????????? ???????????????? ???????? ?? ?????? ???????? ??????????????????, ???????????? ?????? ???????? ?????? ?????????? ?????????? ??????????????
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