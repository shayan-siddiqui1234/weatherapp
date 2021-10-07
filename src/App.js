import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import pic1 from './assets/jackson-hendry-eodA_8CTOFo-unsplash.jpg'
import pic2 from './assets/chuttersnap-TSgwbumanuE-unsplash.jpg';

function App() {
    const [weather, setWeather] = useState(null);
    const [city,setcity] = useState(null);
    let lat = JSON.parse(localStorage.getItem('lat'))
    let long = JSON.parse(localStorage.getItem('long'))
    // const [isBright, setIsDark] =useState(true);
    // const [isB, setIsD] =useState(true);
  //   const display = document.querySelector('body');
  // display.className = isBright ? "Bright" : "Dark";

  // const display = document.querySelector('body');
  // display.className = isBright ? "Bright" : "Dark";
  // const theme = () => {
  //   const display = document.querySelector('body');
  // display.className = isBright ? "Bright" : "Dark";
   
  // var main=document.getElementById("main")
    useEffect(()=>{
      let date = new Date();
      let time = date.getHours();
 
      // let display2=document.querySelector('body');
      //    display2.className = isB ? "Darkmain" : "Brightmain";
        // if(time>=19 || time<6){
        //   // document.querySelector('.Darkmain');
        //   const display = document.querySelector('body');
        //   display.className = isBright ? "Bright" : "Dark";
        //     setIsDark(!isBright);
            

          
          // setIsD(!isB)
          // setIsDark(!isBright)
          // setIsDark(!isBright)
          
          
        // }
        // else{
        //   theme()
        //   setIsD(true)
          // document.querySelector('#Brightmain');
          // setIsD(isB)
          // if(time<19 || time>6){
          // main.innerHTML=`<img src=${pic2} alt="asd" width="200px" height="200px"/>`
          // console.log("data")
          
          
        
    if(city != null){
              axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=0c702b3dffad340f5e1890bd9eeb5d0f&units=metric`)
              .then((res) => {
                  const newWeather = res.data;
                  setWeather(newWeather);
              }).catch((err)=>{alert("invalid city name")})
            }
            else 
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
              function showPosition(position) {
                localStorage.setItem('lat', position.coords.latitude)
                localStorage.setItem('long', position.coords.longitude)
                axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&appid=0c702b3dffad340f5e1890bd9eeb5d0f&units=metric`)
                .then((res) => {
                    const newWeather = res.data;
                    setWeather(newWeather);
                }).catch((err)=>{alert("location is turned off")})
                }
            } else { 
              alert("please turn on your location")
            }
          }
          ,[city])
    
        return (<div>
          {/* <img src={pic1} alt="Moon" id="Darkmain"/>  */}
          {/* <img src={pic2} alt="Moon" id="brightmain"/>  */}
          {
          
        (weather !== null) ?
          <>
          <label class="switch">
        <input type="checkbox"></input>
  
      </label>
          <input class="searchBar" placeholder="Check Weather OF any Country" id="city"/>
            <button class="searchBtn" onClick={()=>{
                setcity(document.getElementById('city').value);
             
                }}>Search</button>
                
            <h1 id="wName">{weather.name}</h1>
            <h2 id="wDescription">{weather?.weather[0].description}</h2>
            <h1 id="wTemp">{weather?.main?.temp} <span id="degree">°C</span></h1>
            <div class="humwind">
            <h3 id="Humidity">Humidity: {weather?.main?.humidity} g/kg &nbsp;&nbsp;&nbsp;&nbsp; </h3>
            <h3 id="wWindspeed">  Wind Speed: {weather?.wind.speed} m/s</h3>
            </div>
        <br></br>
        <div id="dtl">
            <div class="detail">
            <h6>Min Temperature : {weather.main.temp_min}°C</h6>
            <h6>Max Temperature : {weather.main.temp_max}°C</h6>
            </div>
            <div class="detail">
            <h6>Latitude: {weather.coord.lat}</h6>
            <h6>Longitude: {weather.coord.lon}</h6>
            </div>
            <div class="detail">
            <h6>Country : {weather.sys.country}</h6>
            <h6>Feels Like : {weather.main.feels_like}°C</h6>
            </div>
            <div class="detail">
            <h6>Pressure : {weather.main.pressure} Pa</h6>
            <h6>Wind Direction : {weather.wind.deg} °</h6>
            </div>
           
            </div> 
            <br></br> 
            <br></br>
                 
          </>
          :
          <div class="loader"></div>

         
      }
     
      
        </div>)
}
    
export default App;


