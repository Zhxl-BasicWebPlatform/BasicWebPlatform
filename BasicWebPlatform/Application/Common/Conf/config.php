<?php
return array(
	
	/**
     * 打开页面调试工具
     */
    'SHOW_PAGE_TRACE' => FASLE,

    /*************
     *  URL模式
    **************/
	'URL_MODEL' => '1',

    /**
     * 伪静态后缀
     */
    'URL_HTML_SUFFIX' => '',

   	/**
	 * 默认参数过滤方法，用于I函数
	 */
	'DEFAULT_FILTER' => 'htmlspecialchars',

    /**
     * 模板文件后缀
     */
    'TMPL_TEMPLATE_SUFFIX' => '.html',

    /*************
     *  操作后缀
     **************/
    'ACTION_SUFFIX' => 'Action',

    /**
     * 模板引擎表达式开始标签和结束标签
     */
    'TMPL_L_DELIM' => '<{',
    'TMPL_R_DELIM' => '}>',

    /************
     * 	两层次控制器
     *************/
    //'CONTROLLER_LEVEL' => 2,

    /*************
	 *  数据库配置
	**************/
    'DB_TYPE' => 'mysql',
    'DB_HOST' => 'localhost',
    'DB_PORT' => '3306',
    'DB_NAME' => 'db_basicwebplatform',
    'DB_USER' => 'root',
    'DB_PWD' => 'root',
    'DB_PREFIX' => 't_',
    'DB_CHARSET' => 'utf8',

    /*************
     *  自动加载命名空间类
    **************/
    'AUTOLOAD_NAMESPACE' => array(
        'Tool' => APP_PATH . 'Tool'
    ),
    
);