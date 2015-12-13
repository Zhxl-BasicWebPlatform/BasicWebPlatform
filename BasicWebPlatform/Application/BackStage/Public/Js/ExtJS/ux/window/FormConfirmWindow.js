/*
*	抽象带确认按钮的表单窗口
**/
Ext.define('Ext.ux.window.FormConfirmWindow'{
	extend : 'Ext.window.Window',

	resizable: false,
	autoScroll: true,
	modal: true,
	closable: true,
	closeAction: 'hide',
	layout: 'fit',


	/**
	 * 构造函数，注册事件
	 */
	constructor : function(config) {
  		Ext.ux.window.FormConfirmWindow.superclass.constructor.call(this, config);
  		this.addEvents('confirm','cancel');
	},

	/**
	 * 监听
	 */
	listeners: {
		'hide': function(window,opts){
			window.child('form').getForm().reset();
			window.fireEvent('cancel',window.child('form').getForm());
		}
	},

	/**
	 * 确定按钮文字
	 */
	confirmButtonText: '确定',

	initComponent : function() {
		var self = this;
		Ext.apply(self,{
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
				defaultType : 'textfield',
				items : self.initFormFields
			}]
		});

		self.callParent(arguments);
	},

	/**
	 * 点击确认事件,提交表单
	 */
	confirmHandler : function(button, event) {
		this.fireEvent('confirm',this.child('form').getForm());
		this.hide();
	},
	
	/**
	 * 点击取消
	 */
	cancelHandler : function() {
		this.hide();
	}
});