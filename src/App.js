import './App.css';
import Head from './componenets/Head';
import Navigation from './componenets/Navigation';
import NewsSection from './componenets/NewsSection';
import Footer from './componenets/Foot';
import { Routes, Route} from 'react-router-dom';
import FourZero from './componenets/fourzero';
import {ThemeContext} from './componenets/ThemeProvider';
import { useEffect, useState } from 'react';

function App() {

  useEffect(()=>{
    console.log("I appreciate your effort, Thank you..")
  },[])

  let [lightTheme, setLightTheme] = useState(false)

  return (
    <ThemeContext.Provider value={{lightTheme, setLightTheme}}>
      <div className={`App ${!lightTheme ? "darkTheme" : ""}`}>
        <Head></Head>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<NewsSection></NewsSection>}></Route>
          <Route path="/:id" element={<NewsSection></NewsSection>}></Route>
          <Route path="*" element={<FourZero></FourZero>} />
        </Routes>
        <Footer></Footer>
      </div>
    </ThemeContext.Provider >
  );
}

export default App;
