/**
	远程grid
**/
Ext.define('Ext.ux.grid.RemoteGridView',{
	requires: [
		'Ext.ux.grid.BaseGridView'
	],
	
	extend: 'Ext.ux.grid.BaseGridView',
	
  	pluginArray : null,
  	
  	expander : false,

  	summary : false,

  	columnArray : [],

  	/**
  	 * 可配置属性
  	 */
  	//分页
  	paging: false,
  	//视图配置
  	viewConfig: null,
  	//store url
  	url: null,
  	//store model
  	model: null,
  	//分页
  	pageSize: 20,
  	
	loadMask : {
  		msg : '数据加载中...'
  	},
	  
  	initComponent : function() {
  		var self = this;
  		
	  	this.store = this.createStore();
	  	
	  	/**
	  	 * 分页
	  	 */
	  	if (this.paging) {
	  		this.bbar = this.pagingBar = this.createPagingBar();
	  	}
		
	  	/**
	  	 * 分组
	  	 */
	  	if (this.grouping === true) {
	  		this.view = new Ext.grid.GroupingView({
	    		groupByText : "按此列分组",
	    		showGroupsText : "按分组显示",
		    	emptyGroupText : ''
		    });
		
		    /**
		     * 视图配置
		     */
	  		if (this.viewConfig) {
		  		Ext.apply(this.view, this.viewConfig);
		  	}
		  	
	  	}
	  	
	  	this.createPluginsArray();
	  	this.plugins = this.pluginArray;
	  	
	  	Ext.ux.grid.RemoteGridView.superclass.initComponent.call(this);
	  	
	  	if (this.columnArray.length > 0) {
		  	this.selModel.on('selectionchange', this.summaryTotal, this);
		  	this.store.on('load', this.summaryTotal, this);
	  	}
  	},
	  
  	createPluginsArray: function() {
		this.pluginArray = [];
		if (this.ExportToExcel) {
			this.pluginArray.push(new Ext.pg.ExportToExcel());
		}
		if (this.dataDropExcel) {
			this.pluginArray.push(Ext.ux.grid.DataDrop);
		}
		if (this.expander) {
			this.pluginArray.push(this.createRowExpander());
		}
		if (this.summary) {
			this.pluginArray.push(new Ext.ux.grid.GridSummary());
		}
	},
	
  	createRowExpander : Ext.emptyFn,
	  
  	createStore : function() {
	  	if (this.grouping === true) {
			return new Ext.data.GroupingStore({
				proxy : new Ext.data.HttpProxy({
							url : this.url,
							method : 'POST'
						}),
				reader : new Ext.data.JsonReader({
					root : 'list',
					totalProperty : 'totalSize',
					idProperty : this.autoId == true? false : 'id'
				}, this.fields),
				
				remoteSort : this.localSort == true ? false : true,
				groupField : this.groupField || false,
				groupOnSort : true,
				sortInfo : {
					field : this.groupField,
					direction : 'ASC'
				}
			});
		} else {
			return new Ext.data.JsonStore({
				url : this.url,
				method: 'POST',
				model: this.model,
				totalProperty : 'total',
				successProperty: 'success',
            	messageProperty: 'msg'
			});
		}
	},
	  // 建立分页工具栏
	createPagingBar : function() {
		return new Ext.PagingToolbar({
			pageSize : this.pageSize || 20,
			store : this.store,
			displayInfo : this.displayInfo == false ? false : true,
			beforePageText : this.beforePageText || '当前第',
			afterPageText : this.afterPageText || '共{0}页',
			displayMsg : this.displayMsg || '当前记录：{0} 至 {1} 合计：{2}',
			emptyMsg : this.emptyMsg || "没有符合条件的查询"
		});
	},
	 
	/**
	 * 查询数据
	 * @param {} extralParams
	 */
	queryData : function(extralParams) {
		this.loadParam = {
			start : 0,
			limit : this.pagingBar ? this.pagingBar.pageSize : 0
		};
		if (extralParams) {
			Ext.apply(this.loadParam, extralParams);
		}
		this.getStore().baseParams = this.loadParam;
		this.getStore().load({
			callback : this.storeLoadback,
			scope : this
		});
	},
	
	/**
	 * 刷新数据
	 */
  	refreshData : function() {
		if (this.paging) {
			this.getStore().baseParams['start'] = this.pagingBar.cursor;
		}
		this.getStore().load({
			callback : this.storeLoadback,
			scope : this
		});
	},
	  
	/**
	 * 加载数据
	 */
  	loadData : function() {
  		this.getStore().load();
	},
	  
	storeLoadback : Ext.emptyFn,

  	summaryTotal : function() {
  		var columnArray = this.columnArray;
	  	var records = undefined;
	  	if (this.isSelectedRecords()) {
	  		records = this.getSelections();
  		} else {
	  		records = this.getRangeRecords();
	  	}
		  //
	  	var totalColArr = [];
	  		if (records && records.length > 0 && columnArray && columnArray.length > 0) {
		  		Ext.each(columnArray, function(column) {
			    	var totalValue = 0;
				    Ext.each(records, function(record) {
					      totalValue = formatFloat((totalValue + parseFloat(record.get(column.colnumName), 6)), 6);
				    });
				    totalColArr.push({
					      totalLabel : column.totalLabel,
					      totalNumber : totalValue
				      });
			    }, this);
	  	}
	  	this.sumSelectTotal(totalColArr);
	  }
	
});