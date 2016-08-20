<?php
/*
'183.232.33.171/IntelligentBusService.asmx/GetStationLicense?lineId=150819093028190&upDown=1&siteId=141127042208126';
'183.232.33.171/IntelligentBusService.asmx/GetLines?lineName=32';*/


//处理...
/**
*
*/
class Bus
{

    function __construct($preurl,$type,$tailurl,$post)
    {
         $this->valid_type =array('GetStationLicense','GetLines','GetLineById','GetSiteLines','location/ip','GetDistance','GetSites');
         $this->type = $type;
         //$this->data = $data;
         $this->preurl = $preurl;
         $this->tailurl = $tailurl;
         $this->post = $post;
         $result = array();

         //检查是否正确
         // if($this->check_url()){
   
            $result['data'] = $this->post_way($this->tailurl,$this->get_total_url());
            $result['state'] = 1;
         // }else{
         //    $result['tips'] = "访问的url不存在！";
         //    $result['state'] = 0;
         // }

         echo json_encode($result);
    }

    // post方法
    function post_way($post_data,$url){
     // '183.232.33.171/IntelligentBusService.asmx/GetLines?lineName=32';*/
      // $url = '183.232.33.171/IntelligentBusService.asmx/GetLines';
      // $post_data= 'lineName=2';
      // $post_data['lineName'] = 2;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_HEADER, 1);
        // curl_setopt($ch,CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
        // curl_setopt($ch,CURLOPT_REFERER,"file://");
        curl_setopt($ch,CURLOPT_USERAGENT,"Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 Html5Plus/1.0");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);// post数据
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);//post的变量
        // curl_setopt($ch, CURLOPT_TIMEOUT, 1000);
        // curl_setopt($ch, CURLOPT_HEADER, 1);

        $output = curl_exec($ch);
        $info = curl_getinfo($ch);
        // var_dump($info);
        curl_close($ch);
        // var_dump($output);
        // var_dump($info);
       // $data = file_get_contents($url);//目的页面内容获取

        return $output;
    }
    /*function post_way($url){

        $data = file_get_contents($url);//目的页面内容获取

        return $data;
    }*/



    function get_total_url(){
        return ($this->preurl)."/".($this->type)."?".($this->tailurl);
    }



    // function check_url(){
    //     if(in_array($this->type, $this->valid_type)){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }


}

//$url = $_POST['url'];
$pre_url = "http://183.232.33.171/IntelligentBusService.asmx";


$type = $tail_url ='';
$post_data = array();
switch($_GET['type']){
    case 1://细节，查看某点某路的站点公车状况
        $type = "GetStationLicense";
        $tail_url = "lineId=".filter($_GET['lineId'],'char')."&upDown=".filter($_GET['upDown'],'num')."&siteId=".filter($_GET['siteId'],'num');
   
        break;
    case 2://获取类似1路的所有路线
        $type = "GetLines";
        $tail_url = "lineName=".filter($_GET['lineName'],'char');
        break;
    case 3://由一路id查出基本信息
        $type = "GetLineById";
        $tail_url = "lineId=".$_GET['lineId'];
        break;
    case 4://由站点查出所有经过的路线
        $type = "GetSiteLines";
        $tail_url = "siteId=".$_GET['siteId'];
        break;
    case 5://获取当前的位置,http://api.map.baidu.com/location/ip?ak=7IZ6fgGEGohCrRKUE9Rj4TSQ&ip=183.234.99.156&coor=bd09ll
        $pre_url = "http://api.map.baidu.com";
        $type = "location/ip";

        $remoteip = $_SERVER['REMOTE_ADDR'];
        $remoteip = '183.234.99.156';
        $remoteip = '219.128.159.158';
        // var_dump($remoteip);
        $tail_url = "ak=7IZ6fgGEGohCrRKUE9Rj4TSQ&ip=".$remoteip."&coor=bd09ll";
        break;
    case 6://附近站点
        $type = "GetDistance";
        $tail_url = "lng=".$_GET['latx']."&lat=".$_GET['laty'];
        break;
    case 7:
        //http://183.232.33.171/IntelligentBusService.asmx/GetSites?siteName=%E9%87%91，获取金字的所有站点
        $type = 'GetSites';
        $tail_url = 'siteName='.$_GET['siteName'];
        break;

    default:
        break;
}
function filter($data,$type='char'){
  switch ($type) {
    case 'num':
      return intval($data);
      break;
    case 'char':
        if (is_array($data)) {
            array_walk($data,'filter');
        }else{
          xss_clean_str($data);
        }
        return $data;
        break;

    default:
      if (is_array($data)) {
          array_walk($data,'filter');
      }else{
        xss_clean_str($data);
      }
      return $data;
      break;
  }
}
function xss_clean_str($str) {
    $str = preg_replace('#(alert|cmd|passthru|eval|exec|expression|system|fopen|fsockopen|file|file_get_contents|readfile|unlink)(\s*)\((.*?)\)#si', "\\1\\2&#40;\\3&#41;", $str);
    if (get_magic_quotes_gpc()) {
        return $str;
    } else {
        return addslashes($str);
    }
}

if($type &&$tail_url)
    $bus = new Bus($pre_url,$type,$tail_url,$post_data);

?>
