function JTreeDailog(data) {
	var _id = data.id;
	
	var _btnTxt = data.btnTxt;
	var _btnFunction = data.btnFunction;
	var _rootLable = data.rootLabel;
	var _rootId = data.rootId;
	var _rootLevel = data.rootLevel;
	var _areaTree;
	var _rtnObj;
	
	
	var _height = 400;
	var _width = 420;
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	
	var _left = (totalWidth - _width)/2;
	var _top = (totalHeight - _height)/2;
	
	var body = document.body;
	
	var formMask = document.createElement("div");
	formMask.className = "form_mask";
	formMask.style.width = totalWidth;
	formMask.id = _id + "_mask";
	formMask.style.height = totalHeight;
	formMask.style.left = 0;
	formMask.style.top = 0;
	formMask.style.display = "none";
	body.appendChild(formMask); 
	
	var formBlock = document.createElement("div");
		
	formBlock.className = "form_block";
	formBlock.style.width = _width + "px";
	formBlock.style.height = _height + "px";
	formBlock.style.left = _left;
	formBlock.style.top = _top;
	formBlock.style.display = "none";
	formBlock.id = _id;
	body.appendChild(formBlock);
	
	var titleInfoBlock = document.createElement("div");
	titleInfoBlock.className = "form_title_info_block";
	titleInfoBlock.style.width = _width + "px";
	formBlock.appendChild(titleInfoBlock);
	
	var formTitle = document.createElement("div");
	formTitle.className = "form_title";
	formTitle.id = _id + "_title";
	titleInfoBlock.appendChild(formTitle);
	
	var formBtn = document.createElement("div");
	formBtn.className = "form_btn"
	formBtn.innerHTML = _btnTxt;
	formBtn.onclick = function() {
		_btnFunction(_rtnObj);
		document.getElementById(_id).style.display = "none";
		document.getElementById(_id + "_mask").style.display = "none";
	}
	titleInfoBlock.appendChild(formBtn);
	
	var formInfoBlock = document.createElement("div");
	formInfoBlock.id = _id + "_form_div";
	formInfoBlock.style.height = _height + "px";
	formInfoBlock.style.width = _width + "px";
	formInfoBlock.className = "form_info";
	formBlock.appendChild(formInfoBlock);
	
	var agreementCloseBlock = document.createElement("div");
	agreementCloseBlock.className = "agreement_close_block";
	agreementCloseBlock.id = _id + "_close_block";
	
	agreementCloseBlock.style.left = ((totalWidth - _width)/2 + _width - 11) + "px";
	agreementCloseBlock.style.top = (totalHeight - _height)/2 - 11;
	agreementCloseBlock.onclick = function() {
		hideTreeDailog();
	}
	var agreementClose = document.createElement("div");
	agreementClose.className = "agreement_close";
	agreementCloseBlock.appendChild(agreementClose);
	
	formBlock.appendChild(agreementCloseBlock);
	
	var areaTreeInfo = {treeId:(_id + "_form_div"), //tree id
			loadTreeItem: function(idx) {
				var treeItem = _areaTree.getTreeItem(idx);
				if(treeItem) {
					if(treeItem.level > 3) {
						var itemLst = new Array();
						_areaTree.finishLoading(idx, itemLst);
						return;
					}
					
					var url = getSvrAddress() + "getDivisionInfo.action?fNode=" + treeItem.id + "&level=" + treeItem.level;
					
					$.ajax({
						type: "GET",
						url:url,
						dataType:"json",
						success: function(data) {
							if(data) {
								if (data.isSuccess) {
									var itemLst = new Array();
									var records = data.rtnObj;
									for(var i = 0; i < records.length; i++) {
										var record = records[i];
										itemLst[itemLst.length] = {label: record.div_name, id: record.div_code, level: parseInt(record.div_level)};
									}
									_areaTree.finishLoading(idx, itemLst);
								} else {
									alert(data.message);
								}
							}
						}
					});
				}
			},  //加载方法
			treeItemSelected: function(idx) {
				var treeItem = _areaTree.getTreeItem(idx);
				if(treeItem) {
					_rtnObj = {value: treeItem.id, txt:treeItem.label, level: treeItem.level};
					document.getElementById(_id + "_title").innerHTML = "选择区域:&nbsp&nbsp&nbsp" + treeItem.label;
				}
			},
			datas: {treeItemLst:[{label:_rootLable, id:_rootId, level: _rootLevel}]}}

	_areaTree = new JTree(areaTreeInfo);
	_areaTree.createTree();
	
	this.showTreeDailog = function() {
		document.getElementById(_id + "_mask").style.display = "inline";
		document.getElementById(_id).style.display = "inline";
	}
	
	var hideTreeDailog = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}
	
	this.finishLoading = function(idx, childrenTreeItemLst) {
		_areaTree.finishLoading(idx, childrenTreeItemLst);
	}
	
	var drawTreeDialog = function() {
		
	}
	
}
