
<?php
class request
{
    public  function __construct()
    {
        if(!get_magic_quotes_gpc())
        {
            if(!empty($_POST))
            {
                foreach ($_POST as $k => &$v)
                {
                    if(is_array($v))
                    {
                        @array_walk($v, 'urldecode');
                        @array_walk($v, 'addslashes');
                    }
                    else
                    {
                        $v = addslashes(urldecode($v));
                    }
                    $p[$k] = $v;
                }
                $_POST = $p;
                unset($p);
            }
            if(!empty($_GET))
            {
                foreach ($_GET as $k => &$v)
                {
                    if(is_array($v))
                    {
                        @array_walk($v, 'urldecode');
                        @array_walk($v, 'addslashes');
                    }
                    else
                    {
                        $v = addslashes(urldecode($v));
                    }
                    $g[$k] = $v;
                }
                $_GET = $g;
                unset($g);
            }
        }
    }
    public static function getQuery( $key )
    {
        if( isset( $_GET[$key]) )
        {
            return self::xss_clean($_GET[$key]);
        }
        else
        {
            return false;
        }
    }

    public static function getPost( $key )
    {
        if( isset( $_POST[$key]) )
        {
            return self::xss_clean($_POST[$key]);
        }
        else
        {
            return false;
        }
    }
    public static function getServer($key)
    {
        $key = strtoupper($key);
        if(isset($_SERVER[$key]))
        {
            return self::xss_clean($_SERVER[$key]);
        }
        return false;
    }

    public static function  getSession( $key )
    {
        if( isset( $_SESSION[$key]) )
        {
            return self::xss_clean($_SESSION[$key]);
        }
        else
        {
            return false;
        }
    }
    public static function getCookie( $key )
    {
        if( isset( $_COOKIE[$key]) )
        {
            return $_COOKIE[$key];
        }
        else
        {
            return false;
        }
    }
        /**
     * 过滤非法字符（分发）
     */
    private static function xss_clean($str) {
        if (is_array($str) && !empty($str)) {
            $str = self::xss_clean_arr($str);
        } else {
            $str = self::xss_clean_str($str);
        }
        return $str;
    }   /**
     * 过滤非法字符(数组)
     */
    private static function xss_clean_arr($str) {
        foreach ($str as $key => $val) {
            if (is_array($val)) {
                $val = self::xss_clean_arr($val);
            } else {
                $val = self::xss_clean_str($val);
            }
            $arr[$key] = $val;
        }
        return $arr;
    }

    /**
     * 过滤非法字符(字符串)
     */
    private static function xss_clean_str($str) {
        $str = preg_replace('#(alert|cmd|passthru|eval|exec|expression|system|fopen|fsockopen|file|file_get_contents|readfile|unlink)(\s*)\((.*?)\)#si', "\\1\\2&#40;\\3&#41;", $str);
        if (get_magic_quotes_gpc()) {
            return $str;
        } else {
            return addslashes($str);
        }
    }
}
