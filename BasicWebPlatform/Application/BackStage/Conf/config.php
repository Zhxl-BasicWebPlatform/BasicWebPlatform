<?php
return array(
    /**
    *   关闭调试功能
    */
    'SHOW_PAGE_TRACE' => FALSE,

    /**
     * 模板变量路径
     */
    'TMPL_PARSE_STRING' => array(
        '__PUBLIC__' => __ROOT__ . '/' . 'Application' . '/' . MODULE_NAME . '/Public',
    ),

    /**
    *  后台管理入口
    */
    'DEFAULT_CONTROLLER' => 'Index',
    'DEFAULT_ACTION' => 'index',
    
);