/* 
* @Author: anchen
* @Date:   2016-06-19 14:34:40
* @Last Modified by:   anchen
* @Last Modified time: 2016-06-19 16:51:32
*/

    // function Drag(id,movefunc,upfunc) {
    //     var _this = this;
    //     var $ = function (flag) {
    //         return document.getElementById(flag);
    //     }
    //     $(id).onmousedown = function (e) {
    //         console.log(e);
    //         var d = document;
    //         var  that=this;
    //         var page = {
    //             event: function (evt) {
    //                 var ev = evt || window.event;
    //                 return ev;
    //             },
    //             pageX: function (evt) {
    //                 var e = this.event(evt);
    //                 return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
    //             },
    //             pageY: function (evt) {
    //                 var e = this.event(evt);
    //                 return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop);
 
    //             },
    //             layerX: function (evt) {
    //                 var e = this.event(evt);
    //                 return e.layerX || e.offsetX;
    //             },
    //             layerY: function (evt) {
    //                 var e = this.event(evt);
    //                 return e.layerY || e.offsetY;
    //             }
    //         }            
    //         var x = page.layerX(e);
    //         var y = page.layerY(e); 
    //         var t = 1;      
    //         if (that.setCapture) {
    //             that.setCapture();
    //         }
    //         else if (window.captureEvents) {
    //             window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    //         }
    //         d.onmousemove = function (e) {                   
    //             var tx = page.pageX(e) - x;
    //             var ty = page.pageY(e) - y;
    //             that.style.position = 'absolute';
    //             that.style.left = tx + "px";
    //             that.style.top = ty + "px";
    //             t = Math.floor(ty/20)+1;
    //             console.log(t);
    //         }
    //         d.onmouseup = function () {
    //             if (that.releaseCapture) {
    //                 that.releaseCapture();
    //             }
    //             else if (window.releaseEvents) {
    //                 window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
    //             }
    //             that.style.display = 'none';
    //             console.log($('move'));
    //             $('move').style.display='block';
    //             $('ul0').insertBefore($('move'),$('li'+t));

    //             d.onmousemove = null;
    //             d.onmouseup = null;
    //         }
    //     }
    // }
    // 
    
        var $= function (flag) {
            return document.getElementById(flag);
        }
        function movefunc(e){//免得没声明undefined
            console.log(e);    
        }
        function upfunc(e){
            console.log(e);
        }
        window.onload = function(){
        for(ind in id){
           
              $(id[ind]).onmousedown = function (e) {
                
                var d = document;
                var  that=this;
                console.log(this);
                var page = {
                    event: function (evt) {
                        var ev = evt || window.event;
                        return ev;
                    },
                    pageX: function (evt) {
                        var e = this.event(evt);
                        return e.pageX || (e.clientX + document.body.scrollLeft - document.body.clientLeft);
                    },
                    pageY: function (evt) {
                        var e = this.event(evt);
                        return e.pageY || (e.clientY + document.body.scrollTop - document.body.clientTop);
     
                    },
                    layerX: function (evt) {
                        var e = this.event(evt);
                        return e.layerX || e.offsetX;
                    },
                    layerY: function (evt) {
                        var e = this.event(evt);
                        return e.layerY || e.offsetY;
                    }
                }            
                var x = page.layerX(e);
                var y = page.layerY(e); 
                var t = 1;      
                if (that.setCapture) {
                    that.setCapture();
                }
                else if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                d.onmousemove = function (e) {                   
                    var tx = page.pageX(e) - x;
                    var ty = page.pageY(e) - y;
                    that.style.position = 'absolute';
                    that.style.left = tx + "px";
                    that.style.top = ty + "px";
                    t = Math.floor(ty/20)+1;
                    that.m(that);
                }
                d.onmouseup = function () {
                    if (that.releaseCapture) {
                        that.releaseCapture();
                    }
                    else if (window.releaseEvents) {
                        window.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                    }
         
                    $('ul0').insertBefore(that,$('li'+t));

                    d.onmousemove = null;
                    d.onmouseup = null;
                    that.u(that);
                }
            }  
            $(id[ind]).m = movefunc;
            $(id[ind]).u = upfunc;        
        }
        }


    