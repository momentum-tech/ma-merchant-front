function JLst(lstInfos) {
	var _title = lstInfos.titles;
	var _id = lstInfos.id;
	
	var _keys = lstInfos.keys;
	var _functions = lstInfos.functions;
	var _functionTitles = lstInfos.functionTitles;
	var _functionCondition = lstInfos.functionCondition;
	
	var _records;
	
	this.drawJLst = function(records) {
		_records = records;
		
		var info = "";
		info += "<table class=\"table\"><tr class=\"title\" >";
		for(var i = 0; i < _title.length; i++) {
			info += "<td>" + _title[i] + "</td>"
		}
		
		if(_functions) {
			info += "<td>操作</td>"
		}
		
		info += "</tr>";
		
		for(var i = 0; i < _records.length; i++) {
			var record = _records[i];
		
			if(i%2 == 0) {
				info += "<tr class=\"row\">";
			} else {
				info += "<tr class=\"row\">";
			}
			
			for(var j = 0; j < _keys.length; j ++) {
				var key = _keys[j];
				info += "<td align=\"center\">" + record[key] + "</td>";
			}
			
			if(_functions) {
				var isShowFunction = true;
				if(_functionCondition) {
					for(var k = 0; k < _functionCondition.length; k++) {
						if(!eval("record['" + _functionCondition[k].key + "']" + _functionCondition[k].condition 
							+ _functionCondition[k].value)) {
							isShowFunction = false;
							break;
						}
					}
				}
				
				if(isShowFunction) {
					info += "<td align=\"center\">";
					for(var j = 0; j < _functionTitles.length; j++) {
						if(j == 0) {
							info += "<span href='javascript:void(0);' class='table_row_btn' id='jlst_row_" + i + "_fun_" + j + "'>" + _functionTitles[j] + "</span>";
						} else {
							info += "<span href='javascript:void(0);' class='table_row_btn' id='jlst_row_" + i + "_fun_" + j + "'>" + _functionTitles[j] + "</span>";
						}
					}
					info += "</td>";
				} else {
					info += "<td align=\"center\"></td>";
				}
			}
			info += "</tr>";
		}
		info += "</table>";
		
		document.getElementById(_id).innerHTML = info;
		
		if(_functions) {
			for(var i = 0; i < _records.length; i++) {
				for(var j = 0; j < _functions.length; j++) {
					
					var jlstId = "jlst_row_" + i + "_fun_" + j;
					var _divObj = document.getElementById(jlstId);
					if(_divObj) {
						if(window.attachEvent) {
							_divObj.onclick = function(){
								var divId = this.id;
								var midIdx = jlstId.indexOf("_fun_");
								
								var rowIdx = divId.substring(9, midIdx);
								var functionIdx = divId.substring(midIdx+5, jlstId.length);
								
								var _callback = _functions[functionIdx];
								_callback(rowIdx);
							}
						} else {
							_divObj.addEventListener('click',function(){
								var divId = this.id;
								var midIdx = jlstId.indexOf("_fun_");
								
								var rowIdx = divId.substring(9, midIdx);
								var functionIdx = divId.substring(midIdx+5, jlstId.length);
								
								var _callback = _functions[functionIdx];
								
								_callback(rowIdx);
							});
						}
					}
				}
			}
		}
	}
	
	this.getJLstRowInfo = function(idx) {
		return _records[idx];
	}
}