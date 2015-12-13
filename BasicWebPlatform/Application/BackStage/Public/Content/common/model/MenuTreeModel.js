/**
	左边导航菜单模型
**/
Ext.define('admin.common.model.MenuTreeModel',{
	extend: 'Ext.data.TreeModel',
	
	fields: [{
        name: 'id',
        type: 'string'
    },{
        name: 'text',
        type: 'string',
        mapping: 'name'
    },{
        name: 'xpath',
        type: 'string'
    },{
        name: 'leaf',
        type: 'bool'
    },{
    	name: 'parent_id',
    	type: 'string'
    },{
        name: 'iconCls',
        type: 'string',
        mapping: 'icon_cls'
    },{
        name: 'linkPath',
        type: 'string',
        mapping: 'link_path'
    },{
        name: 'open_type',
        type: 'string',
    },{
        name: 'open_path',
        type: 'string'
    },{
        name: 'display_index',
        type: 'string'
    },{
        name: 'available',
        type: 'int',
        defaultValue: 1
    },{
        name: 'expanded',
        type: 'bool',
        defaultValue: true
    }]
});