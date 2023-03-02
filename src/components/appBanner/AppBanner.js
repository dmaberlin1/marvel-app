import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={avengers}
                 draggable='false' alt="Avengers"/>
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img
              draggable='false'
              src={avengersLogo} alt="Avengers logo"/>
        </div>
    )
}

export default AppBanner;