import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./newsSection.css"
import Cards from './Cards';
import { ThemeContext } from './ThemeProvider';


function NewsSection() {
    let [news, setNews] = useState(null)
    let [initialNews, setInitialNews] = useState(null)
    let [serverError, setServerError] = useState(false)
    let { id } = useParams()

    let { lightTheme } = useContext(ThemeContext)

    
    function newsCollector(searchid) {
        let url = `https://inshorts.deta.dev/news?category=${searchid ? searchid.toLowerCase() : "all" }`
       
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === "error") {
                    setServerError(true)
                }
                else {
                    setInitialNews(data.data)
                    setServerError(false)
                }
            })
            .catch(error => {
                setServerError(true)
                console.log("error" + error)
            })
    }



    // useeffect to search news 
    useEffect(() => {
        setNews(null)
        newsCollector(id)
    }, [id])


    // in mobile device show 10 res only for better experience
    // doesn't work when resize browsen and don't refrest or search again

    // but in mobile device it works from the begining as its intrigrated when data loading
    // can't use on window.eventListner as the data might be still loading and with different king of data error becomes more complicated"
    useEffect(() => {
        if (initialNews) {
            let q = [...initialNews]
            if (window.innerWidth < 701) {
                setNews(q.slice(0, 10))
            } else {
                setNews(q)
            }
        }
    }, [initialNews])


    return (
        <main className={!lightTheme ? "darkTheme" : ""}>
            <h2>{id}</h2>
            <p className='resultCounter'>results: {news ? news.length : 0}</p>
            <section className='cardsSection'>
                {news && !serverError && news.length > 0 && news.map((singleNews, i) => <Cards key={i} data={singleNews}></Cards>)}
                {serverError && <img className='loading' src={require("../asset/serverError.gif")}  alt='img of error'/>}
                {!serverError && !news && <img className='loading' src={require("../asset/loading.gif")} alt="loading gif"></img>}

                {news && news.length === 0 && <img className='loading' src={require("../asset/noResFound.png")} alt='img of no result found'/>}
            </section>
        </main>
    );

}

export default NewsSection;