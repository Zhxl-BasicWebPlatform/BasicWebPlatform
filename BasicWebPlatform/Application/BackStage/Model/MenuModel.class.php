<?php
namespace BackStage\Model;

/**
*	菜单模型
*/
class MenuModel extends BaseModel {
	protected $trueTableName = 't_menu';

	//字段声明
	protected $fields = array(
		'id',
		'text',
		'parent_id',
		'display_index',
		'link_path',
		'xpath',
		'available',
		'icon',
		'expanded',
		'type_id',
		'leaf',
		'create_time',
		'create_user_id',
		'open_type',
		'open_path',

		'_pk' => 'id',
	);

	//自动填充
	protected $_auto = array(
		array('create_time','time',self::MODEL_INSERT,'function'),
		array('xpath','calcuXpath',self::MODEL_BOTH,'callback'),
		array('type_id',1,self::MODEL_INSERT,'string'),
		array('leaf',1,self::MODEL_INSERT,'string'),
	);

	protected function calcuXpath(){
		$xpath = '0';

		$parentId = I('POST.parent_id',0,'intval');
		if ($parentId !== 0) {
			$xpath = $this->getFieldById($parentId,'xpath') . '-' . $parentId;
		}

		return $xpath;
	} 
}