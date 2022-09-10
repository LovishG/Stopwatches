let [milliseconds, second, minute] = [0, 0, 0];
let timerRef = document.querySelector(".mainTime");
let int = null;
let lap = 0;
let prevLapTime = 0;
var t = [0, 0, 0, 0, 0, 0, 0, 1];

document.getElementById("start").addEventListener("click", () => {
  if (lap != 0) {
    var ttt = document.getElementById("lap");
    var a = document.createElement("div");
    let currentLapTime = timerRef.innerHTML;
    a.id = "div1";
    a.innerHTML +=
      "<table><tr><td width=65 align=center>" +
      "Lap " +
      lap +
      "</td><td width=116 align=center>" +
      currentLapTime+
      "</td><td width=110 align=center>" +
      difference(lap, currentLapTime) +
      "</td></tr></table>";
    ttt.appendChild(a);
  }


  if (int !== null) {
    clearInterval(int);
  }
  lap++;
  int = setInterval(mainTime, 10);

});


function difference(lap, currentLapTime) {
  if(lap == 1){ 
    prevLapTime = currentLapTime;
    return currentLapTime; }
  else { 
    let cmin= currentLapTime[1] + currentLapTime[2]; 
    let csec = currentLapTime[6] + currentLapTime[7];
    let cmsec = currentLapTime[11] + currentLapTime[12] +currentLapTime[13];

    let pmin= prevLapTime[1] +  prevLapTime[2]; 
    let psec =  prevLapTime[6] +  prevLapTime[7];
    let pmsec =  prevLapTime[11] +  prevLapTime[12] + prevLapTime[13];

    let dmin= cmin - pmin; 
    let dsec =  csec - psec;
    if(dsec<0){
      dmin=dmin-1;
      csec= "1"+csec;
      dsec = csec - psec;
    }
    let dmsec =  cmsec - pmsec;
    if(dmsec<0){
      dsec= dsec-1;
      cmsec = '1' + cmsec;
      dmsec = cmsec - pmsec;
    }
    
    
    return " " + dmin + " : " + dsec + " : " + dmsec ;
  }
}

document.getElementById("stop").addEventListener("click", () => {
  clearInterval(int);
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(int);
  [milliseconds, second, minute, hours] = [0, 0, 0];
  timerRef.innerHTML = "00 : 00 : 00";
  lap = 0;
  prevLapTime = 0;
  const myNode = document.getElementById("lap");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
});

function mainTime() {
  milliseconds += 10;
  if (milliseconds == 1000) {
    milliseconds = 0;
    second++;
    if (second == 60) {
      second = 0;
      minute++;
      if (minute == 60) {
        minute = 0;
      }
    }
  }

  let m = minute < 10 ? "0" + minute : minute;
  let s = second < 10 ? "0" + second : second;
  let ms =
    milliseconds < 10
      ? "00" + milliseconds
      : milliseconds < 100
      ? "0" + milliseconds
      : milliseconds;

  timerRef.innerHTML = ` ${m} : ${s} : ${ms}`;
}
