import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {MainPage, ComicsPage,Page404} from '../pages'

const App = () => {


    return (
      <Routes>
          <div className="app">
              <AppHeader/>
              <main>
                  <Routes>
                      <Route  path={'/'} element={<MainPage></MainPage>}></Route>
                      <Route  path={'/comics'} element={<ComicsPage></ComicsPage>}></Route>
                      <Route path={'*'} element={<Page404/>}>

                      </Route>
                  </Routes>
              </main>


          </div>

      </Routes>)

}

export default App;