/**
 * 管理主界面
 */
Ext.define('admin.framework.controller.FrameworkController',{
	requires: [
		'admin.common.controller.BaseController'
	],
    extend: 'admin.common.controller.BaseController',

    views: [
        'admin.framework.view.FrameworkView',
        'admin.framework.view.FrameworkNorthView',
        'admin.framework.view.FrameworkWestView',
        'admin.framework.view.FrameworkCenterView'/*,
        
        //系统设置
        'admin.framework.view.menu.SystemSetMenuTreeView',
        //课程管理
        'admin.framework.view.menu.CourseManageMenuTreeView'
        */
    ],

    models: [
        'admin.common.model.MenuTreeModel'
    ],

    refs: [{
        ref: 'frameworkCenterView',
        selector: 'frameworkcenterview'
    }],

    init: function(application){
        var self = this;
        self.control({
            'frameworkwestview treepanel': {
                'itemclick': self.onWestViewTreePanelItemClicked
            }
        });
    },
    
    onWestViewTreePanelItemClicked: function(view,record,item,index){
        var self = this;

        var moduleMenu = record.raw;

        var openPath = moduleMenu.open_path; //--功能地址
        var openType = moduleMenu.open_type; //--打开方式
        if (!Ext.Object.isEmpty(openPath) && !Ext.Object.isEmpty(openType)) {
             if (openType == "TAB") {
                //--选项卡方式打开，先判断当前功能是否已经打开，如果已打开，则无需新建，直接将该功能设为活动选项卡就行了。
                var frameworkCenterView = self.getFrameworkCenterView();
                var tabPanel = frameworkCenterView.getComponent(record.get('xpath') + '-' + record.get('id'));
                if (!tabPanel) {
                    tabPanel = Ext.create('Ext.panel.Panel', {
                        title: moduleMenu.text,
                        itemId: moduleMenu.xpath + '-' + moduleMenu.id,
                        layout: 'fit',
                        border: 0,
                        closeAction: 'hide',
                        closable: true,
                        icon: moduleMenu.icon,
                        listeners: {
                            'afterrender': function(panel,eOpts){
                                panel.loadMask = new Ext.LoadMask(this, { msg: '请稍后,页面加载中...' });
                                panel.loadMask.show();

                                Ext.require(openPath,function(){
                                    var tabPanelViewController = this.application.getController(openPath);
                                    panel.add(tabPanelViewController.loadView());
                                    panel.loadMask.hide();
                                },self);
                            }
                        }
                    });

                    frameworkCenterView.add(tabPanel);
                }

                //--设为活动选项卡
                frameworkCenterView.setActiveTab(tabPanel);
            }

            /*
                if (openType == "window") {
                    var win_id = 'syswin_' + rec.get("id");
                    var win = Ext.WindowManager.get(win_id);
                    if (win) {
                        Ext.WindowManager.bringToFront(win);
                    }
                    else {
                        win = Ext.create(path, {
                            title: rec.get("text"),
                            iconCls: rec.get("iconCls"),
                            id: win_id
                        });
                        win.show();
                    }
            }
            else
            */
        }
    }
});