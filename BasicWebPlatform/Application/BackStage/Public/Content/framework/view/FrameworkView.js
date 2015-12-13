Ext.define('admin.framework.view.FrameworkView',{
    extend: 'Ext.panel.Panel',
    alias: 'widget.frameworkview',
    border: false,
    layout: 'border',
    items: [{
        region: 'north',
        xtype: 'frameworknorthview',
        height: 50,
        frame: true,
        border: false
    },{
        region: 'west',
        xtype: 'frameworkwestview',
        width: 200,
        collapsible: true
    },{
        region: 'center',
        xtype: 'frameworkcenterview',
        border: false,
        style: {
            marginLeft: '4px'
        }
    }],
    
    initComponent:function(){
    	this.callParent(arguments);
    }
});