import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a  draggable='false' href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a draggable='false' href="#">Characters</a></li>
                    /
                    <li><a draggable='false' href="#">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;