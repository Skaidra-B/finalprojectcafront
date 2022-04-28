import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import mainContext from "./context/mainContext";
import Toolbar from "./components/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import UploadPage from "./pages/UploadPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import SingleForumPage from "./pages/SingleForumPage";
import http from "./plugins/http";

function App() {

  const [user, setUser] = useState(null)
  const [getForums, setForums] = useState([])
  const [getFavorites, setFavorites] = useState([])
  const [getFavoritesIds, setFavoritesIds] = useState([])

  useEffect( () => {
    if (localStorage.getItem("stayLoggedIn") === "true") {
      http.get("/stayLoggedIn").then(res => {
        if (res.success) {
          setUser(res.user)
        }
      })
    }
  }, [])


  // useEffect(() => {
  //   const value = JSON.parse(localStorage.getItem('favorites'))
  //   if (value) {
  //     setFavoritesIds(JSON.parse(localStorage.getItem('favorites')))
  //   } else {
  //     localStorage.setItem('favorites', JSON.stringify([]));
  //     setFavoritesIds([])
  //   }
  // }, [])



  return (<mainContext.Provider value={{
    user, setUser,
    getFavorites, setFavorites,
    getFavoritesIds, setFavoritesIds,
    getForums, setForums
  }}>
    <Router>
      <Toolbar/>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/upload' element={<UploadPage/>}/>
        {/*<Route path='/forum/:id' element={<ForumPage/>}/>*/}
        <Route path='/forum/:_id' element={<SingleForumPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/favorites' element={<FavoritesPage/>}/>

        {/*<Route path='/aukcionas/:id' element={<SingleProductPage/>}/>*/}
        {/*<Route path='/ikelti-aukciona' element={<CreateAuctionPage/>}/>*/}
        {/*<Route path='/vartotojas/:username' element={<OtherUserPage/>}/>*/}
        {/*<Route path='/stebimi' element={<AuctionsPreviewPage/>}/>*/}
        {/*<Route path='/taisykles' element={<RulesPage/>}/>*/}
        {/*<Route path='/kaiptaiveikia' element={<HowItWorksPage/>}/>*/}
        {/*<Route path='/megstamiausi' element={<FavoritesPage/>}/>*/}
        {/*<Route path='/aukcionai/:category' element={<CategoryPage/>}/>*/}
        {/*<Route path='/aukcionai/:category/:subCategory' element={<SubcategoryPage/>}/>*/}
        {/*<Route path='/elpasto-pranesimai' element={<EmailNotifyPage/>}/>*/}
        {/*<Route path='/paieska/:title' element={<SearchPage/>}/>*/}
      </Routes>
    </Router>
  </mainContext.Provider>);
}

export default App;
