/* 
* @Author: anchen
* @Date:   2016-06-14 17:39:29
* @Last Modified by:   anchen
* @Last Modified time: 2016-06-14 17:39:50
*/

        $('.content').bind('click',function(){
                            var _this = e;
                var openflag =( _this.offsetHeight>350);

                var openit = function(_this){
                    //content的高度
                    var data = {
                        "addtion":3,
                        "shakenum":6,
                        "height":350,//contentdiv的高度
                        "stationdiv":_this.getElementsByClassName("stationdiv"),
                        
                    }
                    var station={
                        "height":0
                    }
                    var stationdiv1 = data.stationdiv[0];
                    var rotate = setInterval(function(){
                        data.addtion = -data.addtion;
                        _this.style.transform="translateZ(-50px)rotateX(" + data.addtion + "deg) ";
                        _this.style.webkitTransform=" rotateZ(" + data.addtion + "deg)";
                        _this.style.OTransform="rotateX(" + data.addtion + "deg)";
                        _this.style.MozTransform="rotateX(" + data.addtion + "deg)";
                        data.height +=80;
                        station.height +=70;
                        _this.style.height =data.height+"px";
                       stationdiv1.style.display = "block";
                       stationdiv1.style.height = station.height+"px";
                        if(data.shakenum==0){
                            clearInterval(rotate);
                            _this.style.transform="";
                            _this.style.webkitTransform="";
                            _this.style.OTransform="";
                            _this.style.MozTransform="";
                        }
                         
                        
                        data.shakenum--;

                     }, 65)

                };
                closeit = function(e){
                    var stationdiv = _this.getElementsByClassName("stationdiv");
                    var stationdiv1 = stationdiv[0];
                    e.style.height ="350px";
                    stationdiv1.style.height = "0";
                }
               if(!openflag){
                   openit(_this);
                  
                   openflag  = true;
                }else{
                    closeit(_this);
                  
                }

        });



///
                $ = function(name){
            var pre = name.substr(0,1);
            var realname = realname = name.substr(1);
            switch(pre){
                case '#':
                    return document.getElementById(realname);
                    break;
                case '.':
                 
                    return document.getElementsByClassName(realname);
                    break;
                default:
                    realname = name.substr(0);
                    return document.getElementsByName(name);
                    break;
            }
            
        }
        Object.prototype.bind = function(ename,func){
 
            var _this = this;
            for (var i = _this.length - 2; i >= 0; i--) {
                var val = _this[i];
               val.addEventListener(ename,func);
            }
        
        }