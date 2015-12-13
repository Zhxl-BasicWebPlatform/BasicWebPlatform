Ext.define('Ext.ux.window.FormWindow', {
	extend : 'Ext.window.Window',
	
	/**
	 * 确定按钮文字
	 */
	confirmButtonText: '确定',
	
	/**
	 * 初始化表单
	 */
	initFormFields: Ext.emptyFn,
	
	/**
	 * 构造函数，注册事件
	 */
	constructor : function(config) {
  		Ext.ux.window.FormWindow.superclass.constructor.call(this, config);
  		this.addEvents('confirm','reset');
	},
	
	initComponent : function() {
		var self = this;
		
		Ext.apply(this, {
			resizable: false,
			autoScroll: true,
			modal: true,
			closable: true,
			closeAction: 'hide',
			layout: 'fit',
			buttons: [
				Ext.create('Ext.button.Button', {
					text : self.confirmButtonText? self.confirmButtonText : '确定',
					handler : self.confirmHandler,
					scope : self
				}), 
				Ext.create('Ext.button.Button', {
					text : '取消',
					handler : self.cancelHandler,
					scope : self
				})
			],
			
			/**
			 * 监听
			 */
			listeners: {
				'hide': function(window,opts){
					window.child('form').getForm().reset();
					window.fireEvent('reset',window.child('form'));
				}
			},
			
			/**
			 * 表单
			 */
			items : [{
				xtype : 'form',
				frame: true,
				border: false,
				layout : 'anchor',
				bodyStyle : {
					'padding' : '5px'
				},
				defaults : {
					anchor : '100%',
					labelWidth : 70,
					labelAlign : 'right'
				},
				//默认表单域类型
				defaultType : 'textfield'/*,
				items : self.initFormFields*/
			}]
		});
			
		Ext.ux.window.FormWindow.superclass.initComponent.call(this);
	},
		
	/**
	 * 点击确认事件,提交表单
	 */
	confirmHandler : function(button, event) {
		this.fireEvent('confirm');
		this.hide();
	},
	
	/**
	 * 点击取消
	 */
	cancelHandler : function() {
		this.hide();
	}
});