/*
*	菜单管理界面
**/
Ext.define('admin.system.menu.view.MenuTreeView',{
	extend: 'Ext.tree.Panel',

	alias: 'widget.menutreeview',

	useArrows: true,
    rootVisible: true,
    multiSelect: false,
    singleExpand: false,
    split: true,

    columns: [{
        header: 'ID',
        dataIndex: 'id',
        flex: 1
    },{
        xtype: 'treecolumn',
        header: '名称',
        dataIndex: 'text',
        flex: 4
    },{
        header: '打开方式',
        dataIndex: 'open_type',
        flex: 2
    },{
        header: '功能地址',
        dataIndex: 'open_path',
        flex: 3
    },{
        header: '图标样式',
        dataIndex: 'iconCls',
        flex: 1/*,
        renderer: function(value, p, record){
            return "<img class='" + value + "' style='width: 16px; height: 20px;'>";
        }
        */
    },{
        header: '排序',
        dataIndex: 'display_index',
        flex: 1
    },{
        header: '状态',
        dataIndex: 'available',
        renderer: function(value, p, record){
            if(value == 0){
                return "<span style='color:red;font-weight:bold;'>停用</span>"
            }else if(value == 1){
                return "<span style='color:green;font-weight:bold;'>正常</span>";
            }
        },
        flex: 1
    },{
        header: '操作',
        xtype: 'actioncolumn',
        align: 'center',
        items: [{
            icon: 'Public/Image/Icons/application_edit.png',
            tooltip: '编辑菜单',
            handler: function (grid, rowIndex, colIndex) {   
                //rowIndex，colIndex均从0开始 
                this.up('menutreeview').fireEvent('editMenuClick',grid,rowIndex,colIndex);
            }
        },'-',{
            icon: 'Public/Image/Icons/application_add.png',
            tooltip: '添加子菜单',
            handler: function(grid, rowIndex, colIndex) {
                this.up('menutreeview').fireEvent('addSubMenuClick',grid,rowIndex,colIndex);
            }
        },'-',{
            icon: 'Public/Image/Icons/application_delete.png',
            tooltip: '删除菜单',
            handler: function(grid, rowIndex, colIndex) {
                this.up('menutreeview').fireEvent('deleteMenuClick',grid,rowIndex,colIndex);
            }
        }]
    }],

    listeners: {
        'afterrender': function(treepanel, eOpts){
            var self = this;
            self.fireEvent('refreshMenuTreeView',treepanel);
        }
    },

    initComponent: function(){
    	var self = this;

        Ext.apply(self,{
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                layout: {
                    pack: 'left'
                },
                items: [{
                    text: '刷新',
                    iconCls: 'Tablerefresh',
                    handler: function() {
                        self.getStore().load();
                    },
                    scope: self
                }]
            }]
        });

    	self.callParent(arguments);
    }
});