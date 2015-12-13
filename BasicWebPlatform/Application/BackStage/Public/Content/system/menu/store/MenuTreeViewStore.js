/*
*	菜单管理界面
**/
Ext.define('admin.system.menu.store.MenuTreeViewStore',{
	extend: 'Ext.data.TreeStore',

	model: 'admin.common.model.MenuTreeModel',

	proxy: {
        type: 'ajax',
        url: PATH_LOAD_MENU,
        method: 'POST',
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'msg',
            root: 'datas'
        }
    },

    root: {
        id: 0,
        text: '系统菜单管理',
        expanded: true
    }
});