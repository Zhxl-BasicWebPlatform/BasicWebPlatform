/**
 * 主机面，左侧菜单栏
 */
Ext.define('admin.framework.view.FrameworkWestView',{
    extend: 'Ext.panel.Panel',
    // requires: [
    //     'admin.framework.view.SystemSetMenuTreeView'
    // ],

    alias: 'widget.frameworkwestview',
    layout: 'accordion',

    title: '主菜单',

    listeners: {
        //在左侧菜单栏渲染出来之后，加载子视图
        'afterrender': function(component,eOpts){
            var self = this;
            self.loadModuleMenuTreeViews();
        }

    },


    // items: [{
    //     xtype: 'systemsetmenutreeview'
    // },{
    //     xtype: 'coursemanagemenutreeView'
    // }],

    /**
    *   加载模块菜单
    */
    loadModuleMenuTreeViews: function(){
        var self = this;
        self.loadMask = new Ext.LoadMask(self,{msg:'菜单加载中,请稍后..'});
        self.loadMask.show();

        //加载导航菜单
        Ext.Ajax.request({
            url: PATH_LOAD_MODULE_MENU,
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
    
    initComponent:function(){

    	this.callParent(arguments);
    }
});