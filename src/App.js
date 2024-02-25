import { useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const [keywords,setKeywords]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [tracks, setTracks] = useState([])
  const getTracks= async()=>{
    setIsLoading(true);
   let data= await fetch(`https://v1.nocodeapi.com/ayush1235/spotify/sfXOgvSBRePoBiIj/search?q=${keywords===''?"trending":keywords}&type=track`);
   let convertedData=await data.json();
   console.log(convertedData.tracks.items);
   setTracks(convertedData.tracks.items);
   setIsLoading(false);
  };
  // useEffect(() =>{
  //   getTracks();
  // },[]);
  return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-info">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      BeatSync
    </a>
   
    <div className="collapse navbar-collapse d-flex justify-content-center" 
    id="navbarSupportedContent">
        <input
        value={keywords}
        onChange={(event)=>{setKeywords(event.target.value)}}
          className="form-control me-2 w-50"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button onClick={getTracks} className="btn btn-outline-danger text-black" >
          Search
        </button>
      
    </div>
  </div>
    </nav>
    <div className="container">
      <div className={`row ${isLoading ?" " : "d-none"}`}>
        <div className='col-12 py-5 text-center'>
        <div
  className="spinner-border"
  style={{ width: "3rem", height: "3rem" }}
  role="status"
>
  <span className="visually-hidden">Loading...</span>
</div>

        </div>
      </div>
      <div className={`row ${keywords===""?" " : "d-none"}`}>
        <div className='col-12 py-5 text-center'>
      <h1>Try searching Something !!! </h1>
      <h4>@BeatSync</h4>
      <h3 className="py-5">Discover music in 30 seconds</h3>
      <div>
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
                href="https://github.com/ROCK1235"
              >
                <i className="bi bi-github mx-2"></i>Github
              </a>
            </div>
        </div>
      </div>
      
      <div className="row">       
        {
          tracks.map((element)=>{
            return(
            <div key={element.id} className='col-lg-4 col-md-6'>
                 <div className="card" >
                    <img src={element.album.images[0].url} className="card-img-top" alt="..." />
                       <div className="card-body">
                          <h5 className="card-title">{element.name}</h5>
                              <p className="card-text ">
                                   Artists: {element.album.artists[0].name}
                                
                               </p>
                               <p className="card-text ">
                                  
                                   Release Date:{element.album.release_date}
                               </p>
                 <audio src={element.preview_url}controls className='w-150'></audio>
                  
               </div>
        </div>

            </div>
            
            );
          })
        }
      </div>
    </div>

    </>
  )
}

export default App;
