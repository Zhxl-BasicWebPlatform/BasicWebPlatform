/**
 * Controller基类
 */
Ext.define('admin.common.controller.BaseController',{
	extend: 'Ext.app.Controller',
	
	/**
     * 为各个组件创建检查器和设置器
     */
    refs: [{
        ref: 'frameworkNorthView',
        selector: 'frameworknorthview'
    },{
        ref: 'frameworkWestView',
        selector: 'frameworkwestView'
    },{
        ref: 'frameworkCenterView',
        selector: 'frameworkcenterView'
    }],
	
	/**
	 * 初始化refs
	 */
	initRefs: Ext.emptyFn,
	
	/**
	 * 初始化事件
	 */
	init: Ext.emptyFn,
    
  constructor: function(config){
  		var self = this;
  	
  	//初始化refs
  		var refs = self.initRefs();
  		if(refs && refs.length > 0){
  			self.refs = self.refs.concat(refs);
  		}
  		
  		admin.common.controller.BaseController.superclass.constructor.call(this,config);
  }
  
});