/**
 * 管理界面顶部
 */
Ext.define('admin.framework.view.FrameworkNorthView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.frameworknorthview',
    border: false,
    items: [{
        xtype: 'toolbar',
        border: false,
        frame: false,
        height: '100%',
        items: [
            '<h1 style="color: #555555;">后台管理系统</h1>',
            '->',
        {   
            id: 'btn-logout',
            text: '退出',
            icon: 'Public/Image/Icons/user_go.png'
        }]
    }],
    
    initComponent:function(){
	   this.callParent(arguments);
    }
});