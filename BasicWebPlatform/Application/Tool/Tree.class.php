<?php
namespace Tool;

class Tree {
	/*
	*	根据父节点的id,获取所有的子节点，并整理成树形结构
	**/
	public static function listTreeByParentId($nodes,$parentId=0) {
		$tree = array();
		foreach ($nodes as $node) {
			if ($node['parent_id'] == $parentId) {
				$node['children'] = self::listTreeByParentId($nodes,$node['id']);
				$tree[] = $node;
			}
		}
		return $tree;
	}

}


