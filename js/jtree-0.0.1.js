function JTree(treeInfo) {
	var _treeId = treeInfo.treeId;
	var _jtree = this;
	var _loadTreeItem = treeInfo.loadTreeItem;
	var _treeItemSelected = treeInfo.treeItemSelected;
	var _treeItemArray = new Array();
	var _isLoading = false;
	var _datas = treeInfo.datas;
	var _selectedIdx = -1;
	
	this.createTree = function() {
		_treeItemArray = new Array();
		
		var info = "";
		
		var treeItemLst = _datas.treeItemLst;
		if(treeItemLst) {
			var itemLevel = 1;
			info = this.assembleTreeItem(treeItemLst, itemLevel);
		}
		
		info = info;
		
		document.getElementById(_treeId).innerHTML = info;
		
		for(var i = 0; i < _treeItemArray.length; i++) {
			var treeId = _treeId + "_" + i;
			var _divObj = document.getElementById(treeId);
			if(_divObj) {
				if(window.attachEvent) {
					_divObj.onclick = function(){
						if(_isLoading) {
							alert("加载中, 请稍后...");
						} else {
							_isLoading = true;
							
							var divId = this.id;
							_idx = divId.substring(_treeId.length+1, divId.length);
							
							_selectedIdx = _idx;
							
							var isExpansion = _treeItemArray[_idx].isExpansion;
							
							if(isExpansion) {
								_treeItemArray[_idx].isExpansion = !isExpansion;
								_isLoading = false;
								
								_jtree.createTree();
								
								_treeItemSelected(_idx);
							} else {
								_treeItemArray[_idx].isExpansion = !isExpansion;
								
								var childTreeItemLst = [{label:"加载中, 请稍后...", isLoading:true}];
								_treeItemArray[_idx].treeItemLst = childTreeItemLst;
								
								_jtree.createTree();
								
								_treeItemSelected(_idx);
								
								_loadTreeItem(_idx);
							}
						}
					}
				} else {
					_divObj.addEventListener('click',function(){
						if(_isLoading) {
							alert("加载中, 请稍后...");
						} else {
							_isLoading = true;
							
							var divId = this.id;
							_idx = divId.substring(_treeId.length+1, divId.length);
							
							var isExpansion = _treeItemArray[_idx].isExpansion;
							
							if(isExpansion) {
								_treeItemArray[_idx].isExpansion = !isExpansion;
								_isLoading = false;
								
								_jtree.createTree();
								
								_treeItemSelected(_idx);
							} else {
								_treeItemArray[_idx].isExpansion = !isExpansion;
								
								var childTreeItemLst = [{label:"加载中, 请稍后...", isLoading:true}];
								_treeItemArray[_idx].treeItemLst = childTreeItemLst;
								
								_jtree.createTree();
								
								_treeItemSelected(_idx);
								
								_loadTreeItem(_idx);
							}
						}
					});
				}
			}
		}
	}
	
	this.assembleTreeItem = function(treeItemLst, itemLevel) {
		var info = "";
		
		for(var i = 0; i < treeItemLst.length; i++) {
			var treeItem = treeItemLst[i];
			var isExpansion = treeItem.isExpansion;
			var isLoading = treeItem.isLoading;
			
			if(isLoading) {
				info += "<div class='j_tree_item_loading_block'>"
				info += "<div id='" + _treeId + "_" +  _treeItemArray.length + "' class=\"tree_item\">";
			} else {
				info += "<div class='j_tree_item_block'>"
				info += "<div id='" + _treeId + "_" +  _treeItemArray.length + "' class=\"tree_item\">";
			}
			
			if(isExpansion) {
				info += "<div class='j_tree_item_image_sub' style=\"margin-top:15px;float:left;width:10px;height:10px;margin-left:" + (itemLevel*30) + "px\"></div>";
			} else if(isLoading) {
				info += "<div class='j_tree_item_image_loading' style=\"margin-top:10px;float:left;width:20px;height:20px;margin-left:" + (itemLevel*30) + "px\"></div>";
			} else {
				info += "<div class='j_tree_item_image_plus' style=\"margin-top:15px;float:left;width:10px;height:10px;margin-left:" + (itemLevel*30) + "px\"></div>";
			}
			
			if(treeItem.isSelected) {
				info += "<div style=\"height:40px;line-height:40px;float:left;font-size:13px;margin-left:7px;color:gray\">";
			} else {
				info += "<div style=\"height:40px;line-height:40px;float:left;font-size:13px;margin-left:7px;color:#333333\">";
			}
			
			info += treeItem.label;
			info += "</div></div></div>";
			
			_treeItemArray[_treeItemArray.length] = treeItem;
			
			var childrenTreeItemLst = treeItem.treeItemLst;
			
			if(childrenTreeItemLst && isExpansion) {
				var childrenItemLevle = itemLevel + 1;
				info += this.assembleTreeItem(childrenTreeItemLst, childrenItemLevle);
			}
		}
		
		return info;
	}
	
	this.finishLoading = function(idx, childrenTreeItemLst) {
		_isLoading = false;
		
		_treeItemArray[idx].treeItemLst = [];
		
		for(var i = 0; i < childrenTreeItemLst.length; i ++) {
			_treeItemArray[idx].treeItemLst.push(childrenTreeItemLst[i]);
		}
		
		_jtree.createTree();
	}
	
	this.getTreeItem = function(idx) {
		return _treeItemArray[_idx];
	}
}