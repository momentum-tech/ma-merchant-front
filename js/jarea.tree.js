function AreaTree(data) {
	var _id = data.id;
	var _width = 420;
	var _btnTxt = data.btnTxt;
	var _btnFunction = data.btnFunction;
	var _rootLable = data.rootLabel;
	var _rootId = data.rootId;
	var _rootLevel = data.rootLevel;
	var _areaTree;
	var _rtnObj;
	
	this.createAreaTree = function() {
		
		var totalHeight = document.body.clientHeight;
		var totalWidth = document.body.clientWidth;
		
		var height = 400;
		
		var left = (totalWidth - _width)/2;
		var top = (totalHeight - height)/2;
		
		var body = document.body;
		
		var formMask = document.createElement("div");
		formMask.className = "form_mask";
		formMask.style.width = totalWidth;
		formMask.id = _id + "_mask";
		formMask.style.height = totalHeight;
		formMask.style.left = 0;
		formMask.style.top = 0;
		formMask.style.zIndex = 2000;
		formMask.style.display = "none";
		
		body.appendChild(formMask);
		
		var formBlock = document.createElement("div");
		
		formBlock.className = "form_block";
		formBlock.style.width = _width;
		formBlock.style.height = height + "px";
		formBlock.style.left = left;
		formBlock.style.top = top;
		formBlock.style.zIndex = 2001;
		formBlock.style.display = "none";
		formBlock.id = _id;
		
		var info = "<div class=\"form_title_block\" onclick='document.getElementById(\"" + _id + "\").style.display = \"none\";document.getElementById(\"" + _id + "_mask\").style.display = \"none\";'>";
		info += "<div class=\"form_close\"></div>";
		info += "</div>";
		info += "<div style=\"background:#f8f8f8;width:409px;float:left;height:45px;z-index:-1;border:solid 1px #d2d2d2;border-bottom:solid 1px #eeeeee;border-radius:2px 2px 0px 0px;\">";
		info += "<div id='" + _id + "_title' style=\"height:45px;line-height:45px;margin-left:15px;font-size:13px;color:#333333;float:left;\">";
		info += "选择区域:</div>";
		info += "<div id='" + _id + "_btn' style=\"height:24px;line-height:24px;font-size:13px;margin-top:12px;width:60px;background:#eb7d60;float:right;margin-right:15px;font-size:13px;color:#fff;cursor:pointer\">";
		info += _btnTxt + "</div>";
		info += "</div>";
		info += "<div id='" + _id + "_form_div' style=\"overflow:auto;height:" + height + "px;background:#ffffff;width:409px;float:left;border-left:solid 1px #d2d2d2;border-right:solid 1px #d2d2d2;border-bottom:solid 1px #d2d2d2;border-radius:0px 0px 2px 2px;\"><form id='" + _id + "_form'>";
		info += "</div>";
		
		formBlock.innerHTML = info;
		
		body.appendChild(formBlock);
		
		var areaDivId = _id + "_form_div";
		
		var areaTreeInfo = {treeId:areaDivId, //tree id
				loadTreeItem: this.loadAreaTreeItem,  //加载方法
				treeItemSelected: this.areaTreeItemSelected,
				datas: {treeItemLst:[{label:_rootLable, id:_rootId, level: _rootLevel}]}}

		_areaTree = new JTree(areaTreeInfo);
		_areaTree.createTree();
		
		if(_btnFunction) {
			var jformBtnId = _id + '_btn';
			var _divObj = document.getElementById(jformBtnId);
			if(_divObj) {
				if(window.attachEvent) {
					_divObj.onclick = function(){
						if(_rtnObj) {
							_btnFunction(_rtnObj);
							document.getElementById(_id).style.display = "none";
							document.getElementById(_id + "_mask").style.display = "none";
						}
					}
				} else {
					_divObj.addEventListener('click',function(){
						if(_rtnObj) {
							_btnFunction(_rtnObj);
							document.getElementById(_id).style.display = "none";
							document.getElementById(_id + "_mask").style.display = "none";
						}
					});
				}
			}
		}
	}
	
	this.showAreaTree = function() {
		document.getElementById(_id + "_mask").style.display = "inline";
		document.getElementById(_id).style.display = "inline";
	}
	
	this.finishLoading = function(idx, childrenTreeItemLst) {
		_areaTree.finishLoading(idx, childrenTreeItemLst);
	}
	
	this.areaTreeItemSelected = function(idx) {
		var treeItem = _areaTree.getTreeItem(idx);
		if(treeItem) {
			_rtnObj = {value: treeItem.id, txt:treeItem.label, level: treeItem.level};
			document.getElementById(_id + "_title").innerHTML = "选择区域:&nbsp&nbsp&nbsp" + treeItem.label;
		}
	}
	
	this.loadAreaTreeItem = function(idx) {
		var treeItem = _areaTree.getTreeItem(idx);
		if(treeItem) {
			
			var url = "http://localhost:8080/getDivisionInfo.action?fNode=" + treeItem.id + "&level=" + treeItem.level;
			
			alert(url);
			
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
	}
}
