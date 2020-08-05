import Config from "./Config";


export function getMessageFromId(messageJson, id, message) {
    if(messageJson != undefined && messageJson != null && checkNullAndReturnString(messageJson)){
        let msgJson = messageJson[id];
        if(msgJson != undefined && msgJson != null && checkNullAndReturnString(msgJson)) {
            return msgJson["message"]
        }
    }
    return message
}

export function doGetConnect(subUrl) {
    return fetch(Config.dataUrl + subUrl, {
        method: "GET",
        mode: 'cors',
        redirect: 'follow',
    }).then(
        function (response) {
            return response.json();
        }
    ).then(function (dataresponse) {
        return dataresponse;
    });
}


export function isObject(obj) {
    return obj === Object(obj);
}

export function refilljsonData(json, data, data1)
{
    var screenJson = json;
    if(checkNullAndReturnString(screenJson[data]))
    {
        if(checkNullAndReturnString(screenJson[data][data1]))
        {
            return screenJson[data][data1]
        }
        if(isObject(screenJson[data]))
        {
            return screenJson[data]
        }
        return screenJson[data]
    }
    return null
}

export function refilljsonScreenData(json, index, data, data1)
{
    var screenJson = json;
    if(checkNullAndReturnString(screenJson[index]))
    {
        var indexJson = screenJson[index]
        if(data == "label" || data == "placeholderColor")
        {
            if(checkNullAndReturnString(indexJson[data]))
            {
                return indexJson[data]
            }
        }
        if(data == "style")
        {
            if(checkNullAndReturnString(indexJson[data]))
            {
                return indexJson[data]
            }
            return {}
        }
        if(data == "colors")
        {
            if(checkNullAndReturnString(indexJson[data]))
            {
                if(checkNullAndReturnString(indexJson[data][data1]))
                {
                    return indexJson[data][data1]
                }
            }
            return ""
        }
    }
    return null
}

export function removeValueFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

export function checkNullAndReturnString(str) {
    if(str!=null && str!=undefined && str!="")
    {
        return true
    }
    return false
}

export function getTimeDiff(Current) {

    var CalcTime = new Date().getTime() - Current ; // Current - Initiallized
    var Years = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4 / 12);
    CalcTime -= Years * (1000 * 60 * 60 * 24 * 7 * 4 * 12);
    var Months = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7 / 4);
    CalcTime -= Months * (1000 * 60 * 60 * 24 * 7 * 4);
    var Weeks = Math.floor(CalcTime / 1000 / 60 / 60 / 24 / 7);
    CalcTime -= Weeks * (1000 * 60 * 60 * 24 * 7);
    // The calculation seconds to days works properly & The calculation of weeks to years may be off slightly
    var Days = Math.floor(CalcTime / 1000 / 60 / 60 / 24);
    CalcTime -= Days * (1000 * 60 * 60 * 24);
    var Hours = Math.floor(CalcTime / 1000 / 60 / 60);
    CalcTime -= Hours * (1000 * 60 * 60);
    var Minutes = Math.floor(CalcTime / 1000 / 60);
    CalcTime -= Minutes * (1000 * 60);
    var Seconds = Math.floor(CalcTime / 1000 / 60);
    return (Years != 0 ? Years + ((Years == 1) ? 'year ' : 'years ') : '') + (Months != 0 ? Months + ((Months == 1) ? 'month ' : 'months ') : '') + (Weeks != 0 ? Weeks + ((Weeks == 1) ? 'week ' : 'weeks ') : '') + (Days != 0 ? Days + ((Days == 1) ? 'day ' : 'days ') : '') + (Hours != 0 ? ((Hours <= 9) ? '0' + Hours : Hours) + ((Hours == 1) ? 'hr ' : 'hrs ') : '') + (Minutes != 0 ? ((Minutes <= 9) ?  Minutes : Minutes) + ((Minutes == 1) ? 'min ' : 'mins ') : '') + (Seconds != 0 ? ((Seconds <= 9) ?  Seconds : Seconds) + ((Seconds == 1) ? 'sec ' : 'secs ') : '');

}


export function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}


export async function doConnect(subUrl, method, postJson) {
    return fetch(Config.dataUrl + subUrl, {
        method: method,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify(postJson),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(
        function (response) {
            return response.json();
        }
    ).then(function (dataresponse) {
        return dataresponse;
    });
}


export async function doConnectCasssendra(subUrl, method, postJson) {
    return fetch(Config.cassendraUrl + subUrl, {
        method: method,
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify(postJson),
        headers: new Headers({
            'Content-Type': 'application/json',
        })
    }).then(
        function (response) {
            return response.json();
        }
    ).then(function (dataresponse) {
        return dataresponse;
    });
}


export function timeConverter(ts){
    var date_ob = new Date(parseInt(ts));
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var date = ("0" + date_ob.getDate()).slice(-2);
    var hours = ("0" + date_ob.getHours()).slice(-2);
    var minutes = ("0" + date_ob.getMinutes()).slice(-2);
    var seconds = ("0" + date_ob.getSeconds()).slice(-2);

    return year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
}

export function getMonthAndDate(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + ' ' + date;
    return time;
}


export async function  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
