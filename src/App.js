import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [Day, setDay] = useState(null);
  const [Curr, setCurr] = useState(null);
  const [CurrTime, setCurrTime] = useState(null);
  const [Temp, setTemp] = useState([]);
  const [pic,setPic] = useState([]);
  const [city,setCity] = useState("")

  const getTime = () => {
    let curr = new Date();

    if (curr.getDay() === 0) {
      setDay("Sunday");
    } else if (curr.getDay() === 1) {
      setDay("Monday");
    } else if (curr.getDay() === 2) {
      setDay("Tuesday");
    } else if (curr.getDay() === 3) {
      setDay("Wednesday");
    } else if (curr.getDay() === 4) {
      setDay("Thurday");
    } else if (curr.getDay() === 5) {
      setDay("Friday");
    } else if (curr.getDay() === 6) {
      setDay("Saturday");
    }

    let dd = curr.getDate();
    let mm = curr.getMonth() + 1;
    let yy = curr.getFullYear();

    let hi = dd + "/" + mm + "/" + yy;
    setCurr(hi);

    let hh = curr.getHours();
    let min = curr.getMinutes();

    if (hh >= 12) {
      hh = hh % 12;
      if (hh === 0) {
        hh = 12;
      }
      let tTime = hh + ":" + min + " PM";
      setCurrTime(tTime);
    }
    else{
      let aTime = hh + ":" + min + " AM";
      setCurrTime(aTime);
    }
  };

  const getDataNow = async () => {
    setCity(document.getElementById('inp').value)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${document.getElementById('inp').value}&appid=ee8c83b0a59f2c9461fb405980b43c30`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTemp((parsedData.main.temp-273).toFixed(1));
    setPic(parsedData.weather[0].main)
  };

  useEffect(() => {
    getTime();

  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row w-4/5 sm:w-2/3 xl:w-1/3">
      <input type="text" placeholder="Enter your city" id='inp' className="p-1 bg-slate-100 w-11/12"></input>
      <div onClick={getDataNow}>
      <img  className="xl:w-10 xl:h-10 sm:h-16 sm:w-16 wq:w-16 cursor-pointer wq:h-16 w-10 h-10" src={"https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814052__340.png"} alt=""></img>
      </div>
      </div>
      <div
        className={`pb-2 pt-2 pl-2 pr-2 mb-3 sm:w-2/3 w-4/5 border-2 ml-3 xl:w-1/3 mr-3 mt-3 justify-center items-center`}
      > 
      <div className="">      
        <img
          src={
          `${ pic ==="Clear" ? "https://cdn.pixabay.com/photo/2014/08/27/15/05/clouds-429228__340.jpg"
           : (pic === "Rain" ? "https://cdn.pixabay.com/photo/2016/01/23/20/43/lightning-1158027__340.jpg" : 
           (pic === "Dust" ? "https://cdn.pixabay.com/photo/2020/11/22/07/39/sandstorm-5765818__340.jpg"
            : ( pic === "Thunderstorm"? "https://cdn.pixabay.com/photo/2021/05/28/18/31/sea-6291665__340.jpg" 
            : (pic === "Clouds" ? "https://cdn.pixabay.com/photo/2022/03/06/05/30/clouds-7050884__340.jpg" 
            :(pic === "Snow" ?"https://cdn.pixabay.com/photo/2019/12/30/20/34/road-4730553__340.jpg"
             :(pic === "Drizzle" ? "https://cdn.pixabay.com/photo/2020/11/15/11/21/pond-5745323__340.jpg" : 
             "https://cdn.pixabay.com/photo/2015/03/30/17/37/sky-699697__340.jpg")))))) }`
          }
          className="h-64 w-full"
          alt="..."
        />
        </div>
        <div className={`pt-2 bg-dark`}>
          <div
            className={`pr-2 pt-3 pb-2 wq:text-2xl text-lg font-medium leading-5 flex justify-center`}
          >
            Your City : {city}
          </div>
          <div
            className={`pr-2 font-normal wq:text-lg pt-4 pb-1 leading-5 flex justify-center`}
          >
            {Day} | {Curr} | {CurrTime}
          </div>
          <hr className="mt-4" />
          <div className={`flex bg-slate-100 justify-center mt-1`}>
            <div className={`wq:text-lg p-5 flex justify-center`}>{pic}</div>
            <div className={`wq:text-lg p-5 flex justify-center`}>Temperature : {Temp}°C</div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?q=Jaipur&appid=ee8c83b0a59f2c9461fb405980b43c30
