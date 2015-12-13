//开启提示信息
Ext.QuickTips.init();
            
//开启扩展动态加载
/*
Ext.Loader.setConfig({
    enabled:true,
    paths: {
        'Ext.ux.combo': PUBLIC + '/Js/ExtJS/ux/combo',
        'Ext.ux.window': PUBLIC + '/Js/ExtJS/ux/window'
    }
});
*/

Ext.onReady(function(){
    Ext.application({
        requires: ['Ext.container.Viewport'],
        name: 'admin',
        appFolder: PUBLIC + '/Content',
        launch: function(){
            Ext.create('Ext.container.Viewport',{
                layout: 'fit',
                items: [{
                    xtype: 'frameworkview'
                }]
            });
        },
        controllers: [
            'admin.framework.controller.FrameworkController'
        ]
    });
	
});