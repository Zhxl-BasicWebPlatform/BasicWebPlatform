/*
*	菜单管理
**/
Ext.define('admin.system.menu.controller.MenuController',{
	extend: 'Ext.app.Controller',

    views: [
        'admin.system.menu.view.MenuTreeView',
        'admin.system.menu.view.AddSubMenuFormWindow'
    ],

    models: [
        'admin.common.model.MenuTreeModel'
    ],

    refs: [{
        ref: 'addSubMenuFormWindow',
        selector: 'addsubmenuformwindow'
    },{
        ref: 'menuTreeView',
        selector: 'menutreeview'
    }],

	init: function(application){
        var self = this;

        self.control({
            'menutreeview': {
                'refreshMenuTreeView': {
                    fn: self.refreshMenuTreeView,
                    scope: self
                },
                'editMenuClick': {
                    fn: self.handleEditMenu,
                    scope: self
                },
                'addSubMenuClick': {
                    fn: self.handleAddSubMenu,
                    scope: self
                },
                'deleteMenuClick': {
                    fn: self.handleDeleteMenu,
                    scope: self
                }
            }
        });
	},

    /**
    *   刷新菜单树视图
    */
    refreshMenuTreeView: function(treepanel){
        var self = this;
        self.loadMask = new Ext.LoadMask(treepanel,{msg:'菜单加载中,请稍后..'});
        self.loadMask.show();

        //加载导航菜单
        Ext.Ajax.request({
            url: PATH_LOAD_MENU,
            method: 'POST',
            params: {
                node: 0
            },
            success: function(response){
                self.loadMask.hide();

                var moduleMenuTreeJSONs = Ext.JSON.decode(response.responseText).datas;
                
                var moduleMenuTreeViews = new Array();
                Ext.Array.each(moduleMenuTreeJSONs,function(item,index,array){
                    var moduleMenuTreeView = Ext.create('Ext.tree.Panel',{
                        title: item.text,
                        icon: item.icon,
                        lines: false,
                        useArrows: true,
                        rootVisible: false,
                        root: {
                            id: item.id,
                            expanded: true,
                            children: item.children
                        }
                    });

                    Ext.Array.push(moduleMenuTreeViews,moduleMenuTreeView);
                });

                self.add(moduleMenuTreeViews);
            },
            failure: function(response){
                self.loadMask.hide();

                var text = response.responseText;
                Ext.Msg.alert('失败',text);
            }
        });
    },

    /**
    *   加载菜单树
    */
    loadMenuTree: function(){

    },

    /**
    *   编辑菜单
    */
    handleEditMenu: function(view, rowIndex, colIndex){
        console.log('编辑菜单');
    },

    /**
    *   添加子菜单
    */
    handleAddSubMenu: function(grid, rowIndex, colIndex){
        var self = this;

        var record = grid.getStore().getAt(rowIndex);

        var addSubMenuFormWindow = self.getAddSubMenuFormWindow();
        if (!addSubMenuFormWindow) {
            addSubMenuFormWindow = Ext.create('admin.system.menu.view.AddSubMenuFormWindow',{
                iconCls: record.get('iconCls'),
                title: record.get('text') + ' >> 添加子菜单',
                listeners: {
                    'handleAddSubMenuOk': {
                        fn: self.handleAddSubMenuOk,
                        scope: self
                    },
                    'handleAddSubMenuCancel': {
                        fn: self.handleAddSubMenuCancel,
                        scope: self
                    }
                } 
            });
        }

        addSubMenuFormWindow.initForm(record);

        addSubMenuFormWindow.show();
    },

    handleAddSubMenuOk: function(window){
        var self = this;

        var addSubMenuForm = window.child('form').getForm();
        if(addSubMenuForm.isValid()){
            addSubMenuForm.submit({
                method:'POST',
                url: PATH_ADD_SUB_MENU,
                success: function(form,action){
                    Ext.Msg.alert('信息','子菜单创建成功',function(){
                        window.close();
                        
                        //构建子菜单节点
                        var subMenuName = addSubMenuForm.findField('menu_name').getValue();
                        console.log(subMenuName);
                        var subMenuNode = {
                            id: action.result.id,
                            text: subMenuName,
                            leaf: true
                        };

                        //获取父菜单节点
                        var parentMenuNodeId = addSubMenuForm.findField('parent_id').getValue();
                        var parentMenuNode = self.getMenuTreeView().getStore().getNodeById(parentMenuNodeId);
                        
                        //将子菜单节点加入
                        parentMenuNode.appendChild(subMenuNode);

                        //改变父节点的相关配置
                        parentMenuNode.set('leaf',false);
                        parentMenuNode.expand();
                    });
                },
                failure: function(form,action){
                    Ext.Msg.alert('信息','子菜单创建失败',function(){
                        window.close();
                    });
                }
            });
        }
    },

    handleAddSubMenuCancel: function(window){
        window.close();
    },

    /**
    *   删除菜单
    */
    handleDeleteMenu: function(view, rowIndex, colIndex){
        console.log('删除菜单');
    },

	/**
     * 实例化界面
     */
    loadView: function(){
    	var self = this;
        var menuTreeView = Ext.widget('menutreeview');
        return menuTreeView;
    }
});