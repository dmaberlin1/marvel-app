import decoration from '../../resources/img/vision.png';
import React, {useState} from 'react';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);
    const onCharSelected = (id) => {
        setSelectedChar(selectedChar(id))
        window.scroll(0, 50)
    }

    return (
      <>
          <ErrorBoundary>
              <RandomChar/>
          </ErrorBoundary>
          <div className="char__content">
              <ErrorBoundary>
                  <CharList onCharSelected={onCharSelected}/>
              </ErrorBoundary>

              <ErrorBoundary>
                  <CharInfo charId={selectedChar}/>
              </ErrorBoundary>
          </div>
          <img draggable='false' className="bg-decoration" src={decoration} alt="vision"/>
      </>
    );
};

export default MainPage;
