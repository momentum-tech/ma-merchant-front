function JPageLst(lstInfos) {
	var _title = lstInfos.titles;
	var _id = lstInfos.id;
	
	var _keys = lstInfos.keys;
	var _functions = lstInfos.functions;
	var _functionTitles = lstInfos.functionTitles;
	var _functionCondition = lstInfos.functionCondition;
	
	var _loadingFunction = lstInfos.loadingFunction;
	
	var _records;
	
	var _titleHeight = 65;
	var _rowHeight = 45;
	var _height = lstInfos.height;
	var _rows = Math.floor((_height - _titleHeight)/_rowHeight);
	var _page = 1;
	var _isMax = false;
	
	var _margin = 10;
	
	if(_loadingFunction) {
		_loadingFunction(_page, _rows);
	}
	
	this.drawJPageLst = function(records) {
		_records = records;
		
		if(_records.length == _rows) {
			_isMax = false;
		} else {
			_isMax = true;
		}
		
		var measureInfo = "";
		var functionWidth = 0;
		if(_functions) {
			measureInfo += "<div id='" + _id + "_measure_block' class=\"table_row\" style='text-align:center;margin-left:" + _margin + ";width:auto;'>";
			for(var j = 0; j < _functionTitles.length; j++) {
				measureInfo += "<span href='javascript:void(0);' class='table_row_btn' id='jlst_row_" + i + "_fun_" + j + "'>" + _functionTitles[j] + "</span>";
			}
			measureInfo += "</div>";
			
			document.getElementById(_id).innerHTML = measureInfo;
			functionWidth = document.getElementById(_id + "_measure_block").offsetWidth;
		}
		
		var totalWidth = document.getElementById(_id).offsetWidth;
		var totalHeight = document.getElementById(_id).offsetHeight;
		
		
		if(totalWidth == 0) {
			alert("表格控件传入宽度属性为0，无法完成渲染");
			return;
		} else {
			var totalMargin = 0;
			if(_functions) {
				totalMargin = _title.length*_margin + _margin;
				width = (((totalWidth - functionWidth - totalMargin)/(_title.length)) - 3) + "px";
			} else {
				totalMargin = _title.length*_margin + _margin*2;
				width = ((((totalWidth - totalMargin)/(_title.length))) - 3) + "px";
			}
			functionWidth += "px";
		}
		
		var info = "";
		info += "<div class=\"table_title_block\">";
		
		for(var i = 0; i < _title.length; i++) {
			var title = _title[i];
			if(title.length > 10) {
				info += "<div class=\"table_title\" style='margin-top:15px;width:" + width + ";margin-left:" + _margin + "px'>" + title + "</div>"
			} else {
				info += "<div class=\"table_title\" style='line-height:65px;width:" + width + ";margin-left:" + _margin + "px'>" + title + "</div>"
			}
		}
		
		if(_functions) {
			info += "<div class=\"table_title\" style='margin-left:" + _margin + "px;width:" + functionWidth + ";line-height:65px;'>操作</div>"
		}
		
		info += "</div>";
		
		for(var i = 0; i < _rows; i++) {
			if((i + 1) > _records.length) {
				info += "<div class=\"table_row_block_empty\">";
				
				info += "<div id='jlst_row_" + i + "'>"
				for(var j = 0; j < _keys.length; j ++) {
					info += "<div class=\"table_row\" style='width:" + width + ";margin-left:" + _margin + "px;'></div>";
				}
				info += "</div>"
				
				if(_functions) {
					info += "<div class=\"table_row\" style='text-align:center;margin-left:" + _margin + "px;width:auto;'>";
					info += "</div>";
				}
				
				info += "</div>";
			} else {
				var record = _records[i];
				
				if(i%2 == 0) {
					info += "<div class=\"table_row_block_even\">";
				} else {
					info += "<div class=\"table_row_block_odd\">";
				}
				
				info += "<div id='jlst_row_" + i + "'>"
				for(var j = 0; j < _keys.length; j ++) {
					var key = _keys[j];
					
					var value = record[key]?record[key]:"";
					
					info += "<div class=\"table_row\" onmouseover='processLstTip(this, \"" + _id + "\")' onmouseout='hideJLstTip(\"" + _id + "\")' style='width:" + width + ";margin-left:" + _margin + "px;'>" + value + "</div>";
				}
				info += "</div>"
				
				if(_functions) {
					if(_functionCondition) {
						var fcKey = _functionCondition.key;
						var fcValue = _functionCondition.value;
						var condition = _functionCondition.condition;
						
						if(eval(record[fcKey] + condition + fcValue)) {
							info += "<div class=\"table_row\" style='text-align:center;margin-left:" + _margin + "px;width:auto;'>";
							for(var j = 0; j < _functionTitles.length; j++) {
								info += "<span href='javascript:void(0);' class='table_row_btn' id='jlst_row_" + i + "_fun_" + j + "'>" + _functionTitles[j] + "</span>";
							}
							info += "</div>";
						}
					} else {
						info += "<div class=\"table_row\" style='text-align:center;margin-left:" + _margin + "px;width:auto;'>";
						for(var j = 0; j < _functionTitles.length; j++) {
							info += "<span href='javascript:void(0);' class='table_row_btn' id='jlst_row_" + i + "_fun_" + j + "'>" + _functionTitles[j] + "</span>";
						}
						info += "</div>";
					}
				}
				
				info += "</div>";
			}
		}
		
		info += "<div class='table_pagenation_block' ><div class='table_pagenation_div'>";
		info += "<div id='" + _id + "_page_pre' class='table_pagenation_pre'></div>";
		info += "<div id=\"detailPageInfo\" class=\"table_pagenation_txt\" > 第 " + _page +  " 页 </div>";
		info += "<div id='" + _id + "_page_nxt' class='table_pagenation_nxt'></div>";
		
		info += "</div></div>";
		
		var _level = 2;
		var _levelInfo = "";
		for(var i = 0; i < _level; i++) {
			_levelInfo += "../"
		}
		
		info += "<div id='" + _id + "TipDiv' onmouseover='showJLstTip(\"" + _id + "\")' class='tip_block'>";
		info += "<div class='tip_image'></div>"
		info += "<div id='" + _id + "TipTxt' class='tip_txt'></div>"
		info += "</div>";
		
		document.getElementById(_id).innerHTML = info;
		document.getElementById(_id + "TipDiv").style.display = "none";
		
		if(_functions) {
			for(var i = 0; i < _records.length; i++) {
				for(var j = 0; j < _functions.length; j++) {
					
					var jlstId = "jlst_row_" + i + "_fun_" + j;
					var _divObj = document.getElementById(jlstId);
					if(_divObj) {
						_divObj.onclick = function(){
							var divId = this.id;
							var midIdx = jlstId.indexOf("_fun_");
							var rowIdx = divId.substring(9, midIdx);
							
							var functionIdx = divId.substring(midIdx+5, jlstId.length);
							
							var _callback = _functions[functionIdx];
							_callback(rowIdx);
						}
					}
				}
			}
		}
		
		var preBtn = document.getElementById(_id + "_page_pre");
		var nxtBtn = document.getElementById(_id + "_page_nxt");
		
		if(preBtn && nxtBtn) {
			preBtn.onclick = function(){
				if(_page > 1) {
					_page = _page - 1;
					_loadingFunction(_page, _rows);
				} else {
					alert("已经是第一页了");
					return;
				}
			}
			
			nxtBtn.onclick = function() {
				if(_isMax) {
					alert("已经是最后一页了");
					return;
				} else {
					_page = _page + 1;
					_loadingFunction(_page, _rows);
				}
			}
		}
	}
	
	this.getJLstRowInfo = function(idx) {
		return _records[idx];
	}
	
	this.getPagInfo = function() {
		return {page: _page, rows: _rows};
	}
	
	this.setPageInfo = function(page) {
		_page = page;
	}
}

function processLstTip(obj, id) {
	var margin = 10;
	
	var tip = document.getElementById(id + "TipDiv");
	var tipTxt = document.getElementById(id + "TipTxt");
	
	document.getElementById(id + "TipDiv").style.display = "inline";
	
	var measureInfo = "<div id='" + id + "_tip_measure_block' class=\"table_row\" style='text-align:center;margin-left:10px;width:auto;height:1px;'>" + obj.innerHTML + "</div>";
	tipTxt.innerHTML = measureInfo;
	
	var objWidth = obj.offsetWidth;
	var tipTxtWidth = document.getElementById(id + "_tip_measure_block").offsetWidth;
	
	tipTxt.innerHTML = obj.innerHTML;
	
	if(tipTxtWidth > objWidth) {
		var left = (tipTxtWidth - objWidth)/2;
		
		tip.style.left = obj.offsetLeft - left;
		tip.style.top = obj.offsetTop + 32;
	} else {
		document.getElementById(id + "TipDiv").style.display = "none";
	}
}

function showJLstTip(id) {
	document.getElementById(id + "TipDiv").style.display = "inline";
}

function hideJLstTip(id) {
	document.getElementById(id + "TipDiv").style.display = "none";
}
