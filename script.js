let alarms = [];
const ul = document.querySelector('ul');
const selectMenu = document.querySelectorAll('select');

// setting all values in hour, minute and sec option.
for(let i=12;i>=0;i--){
    if(i<10){
        i = '0'+i;
    }
    let Option = `<option value="${i}">${i}</option>`
    selectMenu[0].firstElementChild.insertAdjacentHTML('afterend',Option);
}

for(let i=60;i>=0;i--){
    if(i<10){
        i = '0'+i;
    }
    let Option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML('afterend',Option);
}

for(let i=60;i>=0;i--){
    if(i<10){
        i = '0'+i;
    }
    let Option = `<option value="${i}">${i}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML('afterend',Option);
}

// to display time.
setInterval(function(){
    let time = new Date();
    let h = time.getHours();
    let amOrPm = h<=12 ? 'AM' : 'PM';
    // to convert 24hrs format to 12 hrs
    h = h>12 ? h-12 : h;
    h = checkTime(h);
    let m =time.getMinutes();
    m = checkTime(m);
    let s = time.getSeconds();
    s = checkTime(s);
    let hour = document.getElementById('hour');
    let min = document.getElementById('min');
    let sec = document.getElementById('sec');
    let midDay = document.getElementById('mid-day');
    hour.textContent = h;
    min.textContent = m
    sec.textContent = s;
    midDay.textContent = amOrPm;
    let currentTime = h+':'+m+':'+s+':'+amOrPm;
    currentTime = currentTime.toString();
    for(let i=0;i<alarms.length;i++){
        alarmCheck(alarms[i],currentTime);
    }
},1000);

// to put zero infront of numbers
function checkTime(i){
    if(i<10){
        i='0'+i;
    }
    return i;
}

// function for handling click event on set alarm button.
function setEvent(){
    let hour =  selectMenu[0].value;
    let min =  selectMenu[1].value;
    let sec = selectMenu[2].value
    let ampm =  selectMenu[3].value;
    if(hour!=='0' && min!=='0' && sec!=='0' && ampm!=='0'){
        const alarm = {
            id:Date.now().toString(),
            hour:hour,
            min:min,
            sec:sec,
            ampm:ampm
        }
        addAlarm(alarm);
        selectMenu[0].value = 0;
        selectMenu[1].value = 0;
        selectMenu[2].value = 0;
        selectMenu[3].value = 0;
        return;
    }
    alert("Enter the correct time...!");
}

// function for adding alarm to alarms array
function addAlarm(alarm){
    if(alarm){
        alarms.push(alarm);
        renderList();
        return;
    }
}

// function to add task to dom
function addAlarmToDOM(alarm){
    const li =document.createElement('li');
    li.innerHTML = `
            <span>
                <span>${alarm.hour}</span>
                <span>:</span>
                <span>${alarm.min}</span>
                <span>:</span>
                <span>${alarm.sec}</span>
                <span> </span>
                <span>${alarm.ampm}</span>
            </span>
            <i class="fa-solid fa-trash delete-btn" data-id='${alarm.id}'></i>
    `
    ul.appendChild(li);
}

// function for rendering alarms.
function renderList(){
    ul.innerHTML=``;
    for(let i=0;i<alarms.length;i++){
        addAlarmToDOM(alarms[i]);
    }
}

// for deleting alarm
function deleteAlarm(alarmId){
    const newAlarms = alarms.filter(function(alarm){
        return alarm.id !== alarmId;
    })
    alarms = newAlarms;
    renderList();
}

// event handling on delete btn
ul.addEventListener('click',(e)=>{
    if(e.target.tagName = 'I'){
        const id = e.target.getAttribute('data-id');
        deleteAlarm(id);
    }
})

// function for Alarm Check and Alert.
function alarmCheck(alarm,currentTime){
    const alarmTime = alarm.hour+':'+alarm.min+':'+alarm.sec+':'+ alarm.ampm;
    if(alarmTime == currentTime){
        alert('Alarm Ringing...!');
    }
}