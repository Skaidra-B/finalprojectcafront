import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import mainContext from "./context/mainContext";
import Toolbar from "./components/toolbar/Toolbar";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import IndexPage from "./pages/IndexPage";
import UploadPage from "./pages/UploadPage";
import ForumPage from "./pages/ForumPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (<mainContext.Provider value={{

  }}>
    <Router>
      <Toolbar/>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/upload' element={<UploadPage/>}/>
        <Route path='/forum/:id' element={<ForumPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>

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
