/*
* @Author: anchen
* @Date:   2016-06-09 15:51:52
* @Last Modified by:   anchen
* @Last Modified time: 2016-06-23 16:26:00
*/


if(window.localStorage){
// alert('This browser supports localStorage');
}else{
 alert('This browser does NOT support localStorage');
}
//过滤空格
String.prototype.Trim = function() 
{ 
return this.replace(/\s/, ""); 
} 

//数组操作
Swap = function(arr,first,next){
    var len = arr.length;
    if(first>=0&&first<len&&next>=0&&next<len){
        var tmpfirst = arr[first];
        var tmpnext = arr[next];
        arr[first] = tmpnext;
        arr[next] = tmpfirst;
    }
    
    return arr;

}
del_one_arr = function(id,arr){//id存储那些删除的id
    if(typeof(id) == 'object'){
        for (ind in id) {
            delete(arr[id[ind]]);
        }
    }else{
        delete(arr[id]);
    }
    var newarr = [];
    for (i in arr) {
        if(typeof(arr[i])!='undefined'){
            newarr.push(arr[i]);
        }
    }
    return newarr;
}
function stopBubble(e){
    if(e){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
    }
}
 function setstorge(key,content){
    var data;
    if(arguments[2]){
        data = getstorge(key)||{};
        var arg2 =arguments[2];
        data[arg2] = content;

    }
    content = data||content;
    window.localStorage.setItem(key,JSON.stringify(content));
}

//收藏全家桶
collect_func =function(){
    var collectmap={};
    //常用element；
    this.elements = {};
    var _this = this;
    _this.collectname = '';
    this.favit  =  function(map,tmpscope,http){

         stopBubble(map.e);
        //弹出选项框 //
        collectmap = map;
        createroll();
        $('#roll').removeClass('hide');
        $('#station_'+map.lineid+'_'+map.siteid).addClass('fontyellow');
        makelidom();
        //默认首选是黑色
        lidom[1].css({'font-size':'15px','color':'black'});
        var midchoose = 1;//被选中的
        lidom[midchoose+1].css({
            'font-size':'13px',
            'color':'gray'
        });
        lidom[midchoose+2].css({
            'font-size':'13px',
            'color':'gray'
        });
        _this.collectname = lidom[midchoose].text();
        tmpscope.collect = {
            linename:map.linename,
            lineid:map.lineid,
            siteid:map.siteid,
            sitename:map.sitename,
            key:map.key
        }
        collect = tmpscope.collect;
        tmpscope.click = true;
        scope = tmpscope;
        return tmpscope;
    }

    makelidom = function(){
        if(lidom.length==0){
            var carfavlen = storge.carfav.length;
            for(i=0;i<carfavlen+3;i++){
                lidom.push($('#li'+i));
            }
        }
    }


    //收藏夹的滚轮
    function createroll(){

        if($('#roll').length ==0){
            var dom  = document.createElement('div');
            var cardata = storge.cardata;
            var count = 1,li='';//只有一个
            for (ind in cardata) {
                li +='<li ng-repeat="(cfk,cfv) in  carfav" id="li'+count+'">'+ind+'</li>';
                count++;
            }

            dom.setAttribute('id', 'roll');
            dom.setAttribute('class', "roll hide");

            dom.innerHTML ='<div class="rollstate">\
                <span style="left: 50px;"  class="stateline" id="cancelfav" ">取消</span>\
                <span class="favname" >'+collectmap.linename+'-'+collectmap.sitename+'</span>\
                <span style="right: 50px;" class="stateline" id="confirmcollect">确定</span>\
                </div>\
                <div class="topcover"></div>\
                <ul  id="favroll">\
                    <li id="li0">&nbsp;</li>\
                    '+li+'<li id="li'+count+'">&nbsp;</li>\
                    <li id="li'+(count+1)+'">&nbsp;</li>\
                </ul>\
            ';
            
            document.body.appendChild(dom);
        }
        var favroll = $('#favroll');
        //添加滚动功能；
        favroll.bind('scroll',function(event){
           
           var sfunc =  _this.scrollfunc(favroll[0]);

           console.log(_this.collectname);
        });
        //创建好html，找出ul；
        _this.elements.uls = $('#roll ul');
        _this.elements.ul = _this.elements.uls[0];
        console.log(_this.elements.ul);
        
    }
    this.cancelfav = function(){

        _this.elements.uls[0].scrollTop = 0;
        $('#roll').addClass('hide');
        $('#station_'+collectmap.lineid+'_'+collectmap.siteid).removeClass('fontyellow');
    }
    this.confirmcollect = function(e){
        console.log(_this.collectname+'confirmcollect');
        newcarlist = e.data.newcarlist;
       // uls.scrollTop/
        var thiscardata = storge.cardata[_this.collectname];
        console.log(thiscardata);
        var pushflag = false;//是否已经修改了内容
        var cardata_data = {};

       /* if(scope.linelist[key]['StartEndSites'][0]['Seq'] == 1){
            cardata_data['startname'] = scope.linelist[key]['StartEndSites'][0]['SiteName'];
            cardata_data['endname'] = scope.linelist[key]['StartEndSites'][1]['SiteName'];

        }else{
            cardata_data['startname'] = scope.linelist[key]['StartEndSites'][1]['SiteName'];
            cardata_data['endname'] = scope.linelist[key]['StartEndSites'][0]['SiteName'];
        }
        if($scope.updown==1){
            cardata_data['starttime'] = scope.linelist[key]['UpStartTime'];
            cardata_data['endtime'] = scope.linelist[key]['UpEndTime'];
        }else{
            cardata_data['starttime'] = scope.linelist[key]['DownStartTime'];
            cardata_data['endtime'] = scope.linelist[key]['DownEndTime'];
        }
        cardata_data['favseq'] = scope.linelist[key]['Seq'];*/
        newcarlist['linename'] = collectmap.linename;
        newcarlist['lineId'] = collectmap.lineid;
        newcarlist['siteId'] = collectmap.siteid;
        newcarlist['favname'] = collectmap.sitename;
        for(ind in thiscardata){//判断是否已经存在这个路线了
            if(thiscardata[ind]['lineId'] == collectmap.lineid){

               // newcarlist['linename'] = collectmap.linename;

            //     storge.cardata[collectmap.collectname][ind] = {
            //    "linename":collectmap.linename,
            //     "lineId":collectmap.lineid,
            //     "upDown":$scope.updown,
            //     "siteId":collectmap.siteid,
            //     'startname':cardata_data['startname'],
            //     "starttime":cardata_data['starttime'],
            //     "endname":cardata_data['endname'],
            //     "endtime":cardata_data['endtime'],
            //     'favname':collectmap.sitename,
            //     'favseq':cardata_data['favseq']
            // };

                storge.cardata[_this.collectname][ind] = newcarlist;
                pushflag = true;
                break;
            }
        }
        if(!pushflag&&_this.collectname){
            storge.cardata[_this.collectname].push(newcarlist);
            pushflag = true;
               // {"linename":collectmap.linename,"lineId":collectmap.lineid,"upDown":$scope.updown,"siteId":collectmap.siteid,'startname':cardata_data['startname'],"starttime":cardata_data['starttime'],"endname":cardata_data['endname'],"endtime":cardata_data['endtime'],'favname':collectmap.sitename,'favseq':cardata_data['favseq']});
        }
        console.log(storge.cardata);
        if(pushflag){
            setstorge('cardata',storge.cardata);
            popalert('已经将'+collectmap.linename+'-'+collectmap.sitename+'加入['+_this.collectname+']中了',1,'好','');
            $('#roll').addClass('hide');
        }else{
            popalert('<p>添加收藏失败</p>',-1,'好','');
            $('#roll').addClass('hide');
        }
        
    }

    this.scrollfunc = function(e){
        console.log(e);
         var lastpos = e.scrollTop;
        var move = 50;
        var midpos=1;
        var timefunc = setTimeout(function(){
            if(lastpos == e.scrollTop){//停止了滚动
                midpos = Math.round((lastpos/move))+1;//选中的项目
                e.scrollTop=Math.round((midpos-1)*move);
                 for (var i = 1; i <storge.carfavlen+1; i++) {
                        lidom[i].css({'font-size':'13px','color':'gray'});
                    }
                    lidom[midpos-1].css({'font-size':'13px','color':'gray'});
                    lidom[midpos+1].css({'font-size':'13px','color':'gray'});

                    lidom[midpos].css({'font-size':'15px','color':'black'}); 
                    _this.collectname =   lidom[midpos].text();   
                    console.log(_this.collectname+'---collectname');     
            }else{
                timefunc;
            }
        }, 100);
    }



}





// getstorge = function(key){
//     var data = window.localStorage.getItem(key)||'{}';
//     return JSON.parse(data)||{} ;

// }
getstorge = function(key){
    var data = window.localStorage.getItem(key);
    return JSON.parse(data) ;

}
delstorge = function(key,name){
    var data= getstorge(key);
    delete(data[name]);
    setstorge(key,data);
}

function popalert(msg,state,left,right){
    if (right==''){
        var opt =  '<span class="opt1" onclick="hidepop(0)" >'+left+'</span>';
    }else{
        var opt =  '<span class="opt2" onclick="hidepop(0)"  style="border-right: 1px solid #aaa">'+left+'</span><span class="opt2" >'+right+'</span>';
    }
    var statehtml = '';
    var div = '';
    switch(state){
        case 1://成功时候
            statehtml = '<span class="twig-24 "style="color:green;padding-right: 30px;">&#xe807;</span>';
            div = '<p>'+statehtml+msg+opt+'</p>';
            break;
        case -1://失败时候
            statehtml = '<span class="twig-24 "style="color:gray;padding-right: 30px;">&#xe831;</span>';
            div = '<p>'+statehtml+msg+opt+'</p>';
            break;
        default:
            div = statehtml+msg+opt;
            break;

    }
    if(document.getElementById('popbox')){
        var dom = document.getElementById('popbox');
        dom.style.display = 'block';
    }else{
        var dom = document.createElement('div');
            dom.className= 'cover';
            dom.setAttribute('id', 'popbox');
    }
    
    var html = '<div class="popbox">\
            '+div+'</div>';
    dom.innerHTML=html;
    document.body.appendChild(dom);

}

var hidepop =function(state){//state是1那么就可能有附加函数要调用
    var popbox = document.getElementById('popbox');
        popbox.style.display = 'none';
    return 1;
}


//展开和关闭某一路的所有站点内容
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







var elements = {
    toinput:$('.toinput'),
    inputdiv:$('#inputdiv'),
    cover:$('#cover'),
    coverout:$('#coverout'),
    total_fav:$('#total_fav'),
    cancel_search:$('#cancel_search'),
    cover_div:$('.cover-div'),
    searchbox:$('#searchbox')
}

elements.toinput.click(function () {
    $(this).addClass('left_up_move');
    elements.inputdiv.fadeIn('slow').addClass('text_rmove');
    elements.coverout.css({display:'block'});
    elements.cover.addClass('cover').css({display:'block'});

    elements.total_fav.addClass('divfilter');

    //elements.cancel_search.fadeIn(3000);
    setTimeout(function () {
        elements.cover_div.fadeIn('slow');
        elements.cancel_search.css({display:'inline-block'});
    }, 1500);
    //
});
elements.cancel_search.click(function () {
    elements.searchbox.val('');
    
    getrecent();
    elements.toinput.removeClass('left_up_move');
    elements.inputdiv.fadeOut('slow').removeClass('text_rmove');
    elements.coverout.hide();
    elements.cover.removeClass('cover').css({display:'none'});
    elements.total_fav.removeClass('divfilter');
    elements.cancel_search.css({display:'none'});
    //elements.cancel_search.fadeOut(3000);
    elements.cover_div.hide();

});
//常用的对象
storge = {
    cardata:getstorge('cardata'),
    carfav:getstorge('carfav'),
    recent:getstorge('recentSearch')
}
//收藏dom
lidom =[];
