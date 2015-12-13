<?php
namespace BackStage\Controller;

use Tool\Tree;

/**
*	菜单管理
*/
class MenuController extends BaseController {
	
	/*
	*	菜单管理主界面
	**/
	public function indexAction($node = 0){
		$moduleMenu = D('Menu')->order(array('display_index' => 'ASC'))->select();

		$result['datas'] = Tree::listTreeByParentId($moduleMenu,$node);
        $result['success'] = TRUE;

        $this->ajaxReturn($result,'JSON');
	}

	/**
	*	加载模块菜单
	*/
	public function loadModuleMenuAction($node = 0){
		$where['type_id'] = array('IN',array('1','2'));
		$where['available'] = 1;

		$moduleMenu = D('Menu')->where($where)->order(array('display_index'=>'ASC'))->select();

		$result['datas'] = Tree::listTreeByParentId($moduleMenu,$node);
        $result['success'] = TRUE;

        $this->ajaxReturn($result,'JSON');
	}

	/*
	*	加载系统设置菜单
	**/
	public function loadSystemSetMenuAction($node = 1){
		$where['type_id'] = array('IN',array('1','2'));

		$moduleMenu = M('Menu')->where($where)->select();

        $result['datas'] = Tree::listTreeByParentId($moduleMenu,$node);
        $result['success'] = TRUE;

        $this->ajaxReturn($result,'JSON');

	}

	/*
	*	加载课程管理菜单
	**/
	public function loadCourseManageMenuAction($node = 2){
		$where['type_id'] = array('IN',array('1','2'));

		$moduleMenu = M('Menu')->where($where)->select();

        $result['datas'] = Tree::listTreeByParentId($moduleMenu,$node);
        $result['success'] = TRUE;

        $this->ajaxReturn($result,'JSON');
	}

	/**
	*	添加子菜单
	*/
	public function addSubMenuAction(){
		$result = array('success' => FALSE);
		
		$menuModel = D('Menu');
		//从表单读取数据
		if($menuModel->create()){
			$menuModel->name = I('POST.menu_name');
			$menuModel->parent_id = I('POST.parent_id');
			$menuModel->display_index = I('POST.display_index');
			$menuModel->available = I('POST.available');
			$menuModel->icon_cls = I('POST.icon_cls');
			$menuModel->open_type = I('POST.open_type');
			$menuModel->open_path = I('POST.open_path');

			//插入数据库
			$success = $menuModel->add();
			if ($success){
				$where['id'] = I('POST.parent_id');;
				$menuModel->where($where)->setField('leaf',0);

				$result['id'] = $success;
				$result['success'] = TRUE;
			}
		}
		
		$this->ajaxReturn($result);
	}
}

	