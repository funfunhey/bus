// 获取当前位置
var position_option = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 20000
    };
navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, position_option);
youraddress={x:-1,y:-1} ;
function getPositionSuccess( position ){
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        console.log( "您所在的位置： 纬度" + lat + "，经度" + lng );
        if(typeof position.address !== "undefined"){
                var country = position.address.country;
                var province = position.address.region;
                var city = position.address.city;
                alert(' 您位于 ' + country + province + '省' + city +'市');
        }
        youraddress.x=lng;
        youraddress.y = lat;
}



function getPositionError(error) {
    console.log(navigator.geolocation);
    switch (error.code) {
        case error.TIMEOUT:
            alert("连接超时，请重试");
            break;
        case error.PERMISSION_DENIED:
            alert("您拒绝了使用位置共享服务，您可以到［设置]－>[隐私]->[定位服务]->[afari网站］开启");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("获取位置信息失败");
            break;
    }
}
// 获取当前位置end