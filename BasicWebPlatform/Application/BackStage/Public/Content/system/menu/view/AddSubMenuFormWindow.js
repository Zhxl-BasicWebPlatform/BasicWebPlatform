/**
*	添加子菜单窗口
*/
Ext.define('admin.system.menu.view.AddSubMenuFormWindow',{
	extend: 'Ext.window.Window',

    alias: 'widget.addsubmenuformwindow',

	itemId: 'addsubmenuformwindow',
    width: 500,
    height: 400,
    title: '添加子菜单',
    layout: 'fit',
    closable: true,
	closeAction: 'hide',
    constrain: true,
    modal: true,

    initComponent: function(){
        var self = this;

        Ext.apply(self,{
            items: [{
                xtype: 'form',
                layout: 'anchor',
                bodyStyle: {
                    'padding': '15px'
                },
                defaults: {
                    anchor: '98%',
                    labelWidth: 70,
                    labelAlign: 'right'
                },
                //默认表单域类型
                defaultType: 'textfield',
                items: [{
                    xtype: 'hidden',
                    name: 'parent_id'
                },{
                    fieldLabel: '父级菜单',
                    name: 'parent_menu_name',
                    readOnly: true
                },{
                    fieldLabel: '菜单名称',
                    name: 'menu_name'
                },{
                    fieldLabel: '显示顺序',
                    name: 'display_index'
                },{
                    fieldLabel: '功能地址',
                    name: 'open_path'
                },{
                    anchor: '50%',
                    fieldLabel: '打开方式',
                    xtype: 'combo',
                    store: Ext.create('Ext.data.SimpleStore',{
                        reload: true,
                        fields: ['text','value'],
                        data: [
                            ['选项卡','TAB'],
                            ['其他',0]
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    triggerAction: 'all',
                    mode: 'local',
                    name: 'open_type',
                    hiddenName: 'open_type',
                    editable: false,
                    emptyText: '请选择..',
                    allowBlank: false,
                    blankText: '请选择打开方式'
                },{
                    anchor: '50%',
                    xtype: 'textfield',
                    fieldLabel: '图标样式',
                    name: 'icon_cls'
                },{
                    anchor: '50%',
                    xtype: 'combo',
                    fieldLabel: '启用',
                    store: Ext.create('Ext.data.SimpleStore',{
                        reload: true,
                        fields: ['text','value'],
                        data: [
                            ['启用',1],
                            ['禁用',0]
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'value',
                    triggerAction: 'all',
                    mode: 'local',
                    name: 'available',
                    hiddenName: 'available',
                    editable: false,
                    emptyText: '请选择..',
                    allowBlank: false,
                    blankText: '请设置菜单状态'
                }]
            }],
            buttons: [{
                text: '确定',
                handler: function(){
                    self.fireEvent('handleAddSubMenuOk',self);
                },
                scope: self
            },{
                text: '取消',
                handler: function(){
                    self.fireEvent('handleAddSubMenuCancel',self);
                },
                scope: self
            }]
        });

        self.callParent(arguments);
    },

    /**
    *   初始化表单
    */
    initForm: function(record) {
        var self = this;

        var addSubMenuForm = self.child('form').getForm();
        //显示前，先清空
        addSubMenuForm.reset();
        //初始化表单
        addSubMenuForm.findField('parent_id').setValue(record.get('id'));
        addSubMenuForm.findField('parent_menu_name').setValue(record.get('text'));
        addSubMenuForm.findField('display_index').setValue('0');
    }
});