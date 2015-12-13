<?php
namespace BackStage\Controller;

use Tool\Tree;

/**
*	管理后台主界面
*/
class IndexController extends BaseController {

    public function indexAction(){
        $this->display();
    }

    /*
    *   加载模块菜单
    **/
    public function loadModuleMenuAction() {
        $moduleMenu = M('Menu')->field(array('id','name','parent_id'))->select();
        
        $moduleMenuTree = Tree::listTreeByParentId($moduleMenu);
        
        $this->ajaxReturn($moduleMenuTree,'JSON');
    } 
    
    public function loadMenuAction($node = 0){
    	$result = array(
    		array(
    			'title' => '系统设置',
    			'id' => $node
    		),
    		array(
    			'title' => '菜单管理',
    			'id' => $node
    		),
    	);

    	$this->ajaxReturn($result,'JSON');
    }
}