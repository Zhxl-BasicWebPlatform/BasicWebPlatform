/**
 * 管理主界面 中间部分
 */
Ext.define('admin.framework.view.FrameworkCenterView',{
    extend: 'Ext.tab.Panel',
    alias: 'widget.frameworkcenterview',
    border: false,
    activeTab: 0,
    items: [{
        title: '欢迎',
        icon: 'Public/Image/Icons/world.png',
        html: '<h1>欢迎主界面</h1>'
    }],
    
    initComponent:function(){
    	this.callParent(arguments);
    }
});