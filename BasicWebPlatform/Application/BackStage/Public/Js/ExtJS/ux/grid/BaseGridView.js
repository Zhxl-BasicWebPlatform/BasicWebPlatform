/**
 *	基本的扩展gird 
 **/
Ext.define('Ext.ux.grid.BaseGridView',{
	extend: 'Ext.grid.Panel',
	
	stateful: true,
	stateId: Ext.id(),
	
	forceFit: true,
	closable: true,
	
	/**
	 * 初始化列
	 */
	initColumns: Ext.emptyFn,
	
	/**
	 * 初始化顶部工具栏
	 */
	initTopBarBtns: Ext.emptyFn,
	
	viewConfig: {
        //在表格中显示斑马线
        stripeRows: true,
        //可以复制单元格文字
        enableTextSelection: true
	},
	
	selModel: Ext.create('Ext.selection.CheckboxModel'),
	columns: [{
		xtype: 'rownumberer',
        text: '编号',
        sortable: false,
        width: 60,
        menuDisabled: true
	}],
	
	initComponent : function() {
		var self = this;
		
		/**
		 *  初始化列
		 */
		var columns = self.initColumns();
		if(columns && columns.length > 0){
			self.columns = self.columns.concat(columns);
		}
		self.columns = self.columns.concat([{
			header: '状态',
			dataIndex: 'status',
			sortable: false,
	        menuDisabled: true
		},{
			header: '创建时间',
			dataIndex: 'create_time',
			sortable: false,
	        menuDisabled: true
		},{
			header: '更新时间',
			dataIndex: 'update_time',
			sortable: false,
	        menuDisabled: true
		},{
			header: '创建人',
			dataIndex: 'create_time',
			sortable: false,
	        menuDisabled: true
		}]);
		
		/**
		 * 初始化顶部工具栏
		 */
		var topBarBtns = self.initTopBarBtns();
		if(topBarBtns && topBarBtns.length > 0){
			self.tbar = topBarBtns;
		}
		
		Ext.ux.grid.BaseGridView.superclass.initComponent.call(this);
	},
	
	getSelections : function() {
		return this.getSelectionModel().getSelections();
	},
	
	/**
	 * 
	 */
	isExistsRecords : function() {
		var records = this.getStore().getRange();
		return records && records.length > 0;
	},
	
	getRangeRecords : function() {
		return this.getStore().getRange();
	},
	/*
	 * Wether exists value by column name
	 */
	isExistsColVal : function(colName, val) {
		if (!this.isExistsRecords()) {
			return false;
		}
		var records = this.getStore().getRange();
		var exists = false;
		Ext.each(records, function(rec) {
			  if (rec.get(colName) == val) {
				  exists = true;
			  }
		  }, this);
		return exists;
	},
	/**
	 * Decide there is exists data record which is selected in the grid panel
	 * 
	 * @return {}
	 */
	isSelectedRecords : function() {
		var records = this.getSelections();
		return records && records.length > 0;
	},
	
	/**
	 * 
	 * @return {}
	 */
	selectAll : function() {
		this.getSelectionModel().selectAll();
	},
	
	/**
	 * Operation a function each the store records
	 * 
	 * @param fn
	 *         The callback funciton
	 * @param {}
	 *         scope t The callback funciton operation scope
	 */
	eachRecord : function(fn, scope) {
		var records = this.getStore().getRange();
		if (records && records.length > 0) {
			Ext.each(records, function(_record) {
				  fn.call(scope ? scope : this, _record);
			  }, this);
		}
	},

	/**
	 * 对每条选中的记录调用函数
	 * 
	 * @param {}
	 *         fn
	 * @param {}
	 *         scope
	 */
	eachSelectedRecord : function(fn, scope) {
		var records = this.getSelections();
		if (records && records.length > 0) {
			Ext.each(records, function(_record) {
				  fn.call(scope ? scope : this, _record);
			  }, this);
		}
	},
	
	/**
	 * 
	 * @param {}
	 *         colName
	 * @return {String}
	 */
	serialSelectedRecord : function(colName) {
		var vals = "";
		this.eachSelectedRecord(function(rec) {
			  vals += rec.get(colName) + ",";
		  }, this);
		if (vals.length > 0) {
			return vals.substring(0, vals.length - 1);
		}
		return "";
	},

	//
	eachModifiedRecord : function(fn, scope) {
		var records = this.getStore().getModifiedRecords();
		if (records && records.length > 0) {
			Ext.each(records, function(_record) {
				  fn.call(scope ? scope : this, _record);
			  }, this);
		}
	},

	//
	getSelectedColVals : function(colName) {
		var vals = [];
		this.eachSelectedRecord(function(rec) {
			  vals.push(rec.get(colName));
		  }, this);
		return vals;
	},

	/**
	 * 删除所有记录
	 */
	removeAll : function() {
		this.getStore().removeAll();
	},
	
	/**
	 * 从Store删除选中的记录
	 * 
	 */
	removeSelections : function() {
		var sels = this.getSelections();
		if (sels.length == 0) {
			CdForm.ErrorBox('请选择要删除的记录！');
			return;
		}
		for (var i = 0; i < sels.length; i++) {
			if (this.beforeRemove(sels[i])) {
				this.getStore().remove(sels[i]);
			}
		}
		this.getView().refresh();
	},

	/**
	 * 
	 * @param {}
	 *         sel ： 当前正要删除的记录
	 */
	beforeRemove : function(sel) {
		return true;
	},

	/**
	 * 
	 * 增加记录
	 * 
	 * @param {}
	 *         _r : Mixed Ext.data.Record 或 Array
	 * @return
	 */
	addRecords : function(_r) {
		if (typeof _r != 'Array')
			_r = [].concat(_r);
		this.getStore().add(_r);
		this.getView().refresh();
	},
	
	/**
	 * 
	 * @param {}
	 *         _r
	 * @param {}
	 *         index
	 */
	insertRecords : function(_r) {
		if (typeof _r != 'Array')
			_r = [].concat(_r);
		this.getStore().insert(0, _r);
		this.getView().refresh();
	},
	/**
	 * 选择单条记录
	 */
	getSingleRecord : function(pmsg) {
		var sm = this.getSelectionModel();
		if (sm.getCount() > 1 || sm.getCount() == 0) {
			var msg = "只允许" + pmsg + "单条记录,请选择需要" + pmsg + "的记录！";
			if (sm.getCount() == 0) {
				msg = "请选择需" + pmsg + "的记录！"
			}
			CdForm.ErrorBox(msg);
			return;
		}
		return sm.getSelected();
	},
	
	/**
	 * 选择多条记录
	 * 
	 * @param {}
	 *         pmsg
	 */
	getMultlyRecord : function(pmsg) {
		var sm = this.getSelectionModel();
		if (sm.getCount() == 0) {
			if (sm.getCount() == 0) {
				msg = "请选择需" + pmsg + "的记录！"
			}
			CdForm.ErrorBox(msg);
			return;
		}
		return sm.getSelected();
	},
	
	/**
	 * ' 统计选中的行某栏位的总值
	 * 
	 * @param {}
	 *         args
	 */
	sumSelectTotal : function(args) {
		if (this.pagingBar.displayItem) {
			var count = this.pagingBar.store.getCount();
			var msg = count == 0 ? this.pagingBar.emptyMsg : String.format(this.pagingBar.displayMsg, this.pagingBar.cursor + 1, this.pagingBar.cursor + count,
			  this.pagingBar.store.getTotalCount());
			msg += '&nbsp;&nbsp;<font color="red">';
			Ext.each(args, function(arg) {
				  msg += arg.totalLabel;
				  msg += "：";
				  msg += arg.totalNumber;
				  msg += " ";
			  });
			msg += '</font>';
			this.pagingBar.displayItem.setText(msg);
		}
	},
	
	refreshSelfSummary : function() {
		if (!this.selfSummary) {
			return;
		}
		this.eachRecord(function(r) {
			  if (r.get("sumRecord") == true) {
				  this.getStore().remove(r);
			  }
		  }, this);
		//
		var rec = this.getStore().recordType;
		var sumRecord = new rec();
		sumRecord.set('sumRecord', true);
		//
		var records = this.getStore().getRange();
		if (records && records.length > 0) {
			Ext.each(this.getColumnModel().config, function(_col) {
				  if (_col.sum == true) {
					  var totalVal = 0;
					  Ext.each(records, function(_record) {
						    if (_record.get(_col.dataIndex)) {
							    totalVal = totalVal + (parseFloat(_record.get(_col.dataIndex)) * this.selfSummaryScale) / this.selfSummaryScale;
						    }
					    }, this);
					  sumRecord.set(_col.dataIndex, totalVal);
				  }
			  }, this);
			this.addRecords(sumRecord);
		}

	}
});