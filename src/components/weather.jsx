import React, {useState} from "react";
import S from './weather.module.css'
import axios from "axios";

const Weather = () => {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=671ff21aaea673c9eebe072adab95a06`
   const searchLocation=(event)=>{
        if(event.key ==='Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.log(response.data)
            })
            setLocation('')
        }
   }
    return (
        <div className={S.wrapper}>

            <div className={S.container}>
                <div className={S.Search}>
                    <input
                        value={location}
                        onChange={event => setLocation(event.target.value)}
                        onKeyPress={searchLocation}
                        placeholder='Enter Location'
                        type="text"
                    />
                </div>
                <div className={S.top}>
                    <div className={S.Location}>
                        <p>{data.name}</p>
                    </div>
                    <div className={S.Temp}>
                        {data.main?<h1>{data.main.temp.toFixed()}°С</h1>:null}
                    </div>
                    <div className={S.description}>
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                {data.name != undefined &&
                    <div className={S.bottom}>
                        <div className={S.feels}>
                            {data.main? <p className={S.bold}>{data.main.feels_like.toFixed()}</p> : null}
                            <p>Feels Like</p>
                        </div>
                        <div className={S.humidity}>
                            {data.main? <p className={S.bold}>{data.main.humidity}%</p> : null}
                            <p>Humidity</p>
                        </div>
                        <div className={S.wind}>
                            {data.wind? <p className={S.bold}>{data.wind.speed} MPH</p> : null}
                            <p>Wind Speed</p>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
export default Weather;