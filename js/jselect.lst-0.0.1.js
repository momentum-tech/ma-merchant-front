function JSelectLstDialog(data) {
	var _id = data.id;
	var _width = 550;
	var _btnFunction = data.btnFunction;
	var _jSelectLst;
	
	var _isSimpleSelect = data.isSimpleSelect;
	var _muiltSeleteArray = new Array();
	
	var _loadingInfos;
	
	var _rtnObj;
	var _caller;
	
	var _page = 1;
	var _rows = 8;
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	
	var height = 400;
	var lstHeight = 350;
	var pagenationHeight = height - lstHeight;
	
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
	formBlock.style.width = _width + "px";
	formBlock.style.height = height + "px";
	formBlock.style.left = left;
	formBlock.style.top = top;
	formBlock.style.zIndex = 2001;
	formBlock.style.display = "none";
	formBlock.id = _id;
	
	body.appendChild(formBlock);
	
	var closeBlock = document.createElement("div");
	closeBlock.className = "close_block";
	closeBlock.onclick = function() {
		document.getElementById(_id).style.display = "none";
		document.getElementById(_id + "_mask").style.display = "none";
	}
	formBlock.appendChild(closeBlock);
	
	var formClose = document.createElement("div");
	formClose.className = "form_close";
	closeBlock.appendChild(formClose);
	
	var formTitleInfoBlock = document.createElement("div");
	formTitleInfoBlock.className = "form_title_info_block";
	formBlock.appendChild(formTitleInfoBlock);
	
	var formTitle = document.createElement("div");
	formTitle.id = _id + "_title";
	formTitle.className = "form_title";
	formTitleInfoBlock.appendChild(formTitle);
	
	var formBtn = document.createElement("div");
	formBtn.id = _id + "_btn";
	formBtn.innerHTML = data.btnTxt;
	formBtn.className = "form_btn";
	formTitleInfoBlock.appendChild(formBtn);
	
	
	var formInfoBlock = document.createElement("div");
	formInfoBlock.id = _id + "_form_div";
	formInfoBlock.style.height = height + "px";
	formInfoBlock.className = "form_info";
	formBlock.appendChild(formInfoBlock);
	
	
	var lstDiv = document.createElement("div");
	lstDiv.id = _id + "_lst_div";
	lstDiv.style.height = lstHeight + "px";
	lstDiv.className = "select_lst_block";
	formInfoBlock.appendChild(lstDiv);
	
	var pagenationDiv = document.createElement("div");
	pagenationDiv.id = _id + "_pagenation_div";
	pagenationDiv.style.height = pagenationHeight + "px";
	pagenationDiv.className = "select_lst_block";
	formInfoBlock.appendChild(pagenationDiv);
	
	
	
	if(_btnFunction) {
		var _divObj = document.getElementById(_id + '_btn');
		_divObj.onclick = function() {
			if(_muiltSeleteArray.length > 0) {
				_btnFunction(_rtnObj);
				document.getElementById(_id).style.display = "none";
				document.getElementById(_id + "_mask").style.display = "none";
			} else {
				if(confirm("没有选定记录?是否继续")) {
					_btnFunction();
				}
			}
		}
	}
	
	this.showSelectLst = function(showInfos) {
		if(showInfos.muiltSeleteArray) {
			_muiltSeleteArray = showInfos.muiltSeleteArray;
		} else {
			_muiltSeleteArray = new Array();
		}
		if(showInfos.caller) {
			_caller = showInfos.caller;
		}
		
		document.getElementById(_id + "_mask").style.display = "inline";
		document.getElementById(_id).style.display = "inline";

		_rtnObj = null;
		document.getElementById(_id + "_title").innerHTML = "" + showInfos.title;
		
		_loadingInfos = showInfos.loadingInfos;
		
		_loadingInfos(_page, _rows, _caller);
	}
	
	this.hideSelectLst = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}
	
	this.finishLoadLstInfo = function(lstDataInfos) {
		var lstDivId = _id + "_lst_div";
		
		lstDataInfos.id = lstDivId;
		lstDataInfos.lstRowSelected = this.lstRowSelected;
		
		_jSelectLst = new this.JSelectLst(lstDataInfos);
		_jSelectLst.createJLst();
		
		var pageDivId = _id + "_pagenation_div";
		var pageInfo = {
			page: _page,
			rows: _rows,
			isMax:lstDataInfos.length < _rows?true:false,
			pagenationId:pageDivId,
			doPage:_loadingInfos
		}
		var jSelectPagenation = new this.JSelectPagenation(pageInfo);
		jSelectPagenation.createPagenation();
	}
	
	this.lstRowSelected = function(rtnObj) {
		if(_isSimpleSelect) {
			_btnFunction(rtnObj);
			document.getElementById(_id).style.display = "none";
			document.getElementById(_id + "_mask").style.display = "none";
		} else {
			_rtnObj = rtnObj;
		}
	}
	
	this.JSelectLst = function(data) {
		var _titles = data.titles;
		var _records = data.records;
		var _keys = data.keys;
		var _lstRowSelected = data.lstRowSelected;
		
		var _idKey = data.idKey;
		var _txtKey = data.txtKey;
		
		this.createJLst = function() {
			var lstDiv = document.getElementById(_id + "_lst_div");
			lstDiv.innerHTML = "";
			
			var margin = 0.5;
			var totalMargin = _titles.length*margin;
			
			var titleWidth = _width - 40;
			var width = titleWidth/(_titles.length);
			
			var selectTableTitleBlock = document.createElement("div");
			selectTableTitleBlock.className = "select_table_title_block";
			
			var tableRowImageOccupy = document.createElement("div");
			tableRowImageOccupy.className = "table_row_image_occupy";
			selectTableTitleBlock.appendChild(tableRowImageOccupy);
			
			for(var i = 0; i < _titles.length; i++) {
				var title = _titles[i];
				
				var seleteTableTitle = document.createElement("div");
				seleteTableTitle.className = "select_table_title";
				seleteTableTitle.style.width = width + "px";
				seleteTableTitle.innerHTML = title;
				selectTableTitleBlock.appendChild(seleteTableTitle);
			}
			
			lstDiv.appendChild(selectTableTitleBlock);
			

			

			for(var i = 0; i < _records.length; i++) {
				var selectTableRowBlock  = document.createElement("div");
				selectTableRowBlock.id = "jselect_row" + i;
				selectTableRowBlock.onclick = function() {
					var divId = this.id;
					var rowIdx = divId.substring(11, divId.length);
					var recordId = _records[rowIdx].recordId;
					var recordTxt = _records[rowIdx].recordTxt;
					if(_isSimpleSelect) {
						if(_caller) {
							_lstRowSelected({value: recordId, txt: recordTxt, caller: _caller});
						} else {
							_lstRowSelected({value: recordId, txt: recordTxt});
						}
					} else {
						var rowImage = document.getElementById(rowIdx + "_row_image");

						//显示图片
						rowImage.className = "table_row_image_checked";
					
						var tmpSelectArray = new Array();

						for(var i = 0; i < _muiltSeleteArray.length; i ++) {
							var selectedIdx = _muiltSeleteArray[i];
							if(selectedIdx == recordId) {
								//不显示图片
								rowImage.className = "table_row_image";
							} else {
								tmpSelectArray[tmpSelectArray.length] = selectedIdx;
							}
						}
						
						if(tmpSelectArray.length == _muiltSeleteArray.length) {
							tmpSelectArray[tmpSelectArray.length] = recordId;
						}
						
						_muiltSeleteArray = tmpSelectArray;
						
						_lstRowSelected({value: _muiltSeleteArray.join("&" + _idKey + "="), txt: recordTxt + "等..."});
					}
				}
				
				var tableRowImage  = document.createElement("div");
				tableRowImage.id = i + "_row_image";
				selectTableRowBlock.appendChild(tableRowImage);
				
				var record = _records[i];
			
				record.recordId = record[_idKey];
				record.recordTxt = record[_txtKey];
			
				if(i%2 == 0) {
					selectTableRowBlock.className = "select_table_row_block_even";
				} else {
					selectTableRowBlock.className = "select_table_row_block_odd";
				}
				
				if(_isSimpleSelect) {
					tableRowImage.className = "table_row_image_radio";
				} else {
					var isChecked = false;
					
					for(var j = 0; j < _muiltSeleteArray.length; j ++) {
						var selectedIdx = _muiltSeleteArray[j];
						if(selectedIdx == record[_idKey]) {
							isChecked = true;
							break;
						}
					}
					
					if(isChecked) {
						tableRowImage.className = "table_row_image_checked";
					} else {
						tableRowImage.className = "table_row_image";
					}
				}
					
				for(var j = 0; j < _keys.length; j ++) {
					var key = _keys[j];
					
					var cellDiv  = document.createElement("div");
					cellDiv.className = "select_table_row";
					cellDiv.style.width = width + "px";
					cellDiv.innerHTML = record[key];
					
					selectTableRowBlock.appendChild(cellDiv);
				}
				lstDiv.appendChild(selectTableRowBlock);
			}
		}
	}

	
	this.JSelectPagenation = function(data) {
		var _isMax = data.isMax;
		var _pagenationId = data.pagenationId;
		var _doPage = data.doPage;
		var _level = data.level;
		var _JPagenation = this;
		
		this.createPagenation = function() {
			var levelInfo = "";
			for(var i = 0; i < _level; i++) {
				levelInfo += "../"
			}
			
			var info = "<div class=\"select_pagenation_div\">";
			info += "<div id='" + _pagenationId + "_pre' class='select_pre_btn'/></div>";
			info += "<div id=\"detailPageInfo\" class=\"select_pagenation_txt\" > 第 " + _page +  " 页 </div>";
			info += "<div id='" + _pagenationId + "_nxt' class='select_nxt_btn'/></div>";
			
			info += "</div>";
			document.getElementById(_pagenationId).innerHTML = info;
			
			var preBtn = document.getElementById(_pagenationId + "_pre");
			var nxtBtn = document.getElementById(_pagenationId + "_nxt");
			if(preBtn && nxtBtn) {
				if(window.attachEvent) {
					preBtn.onclick = function(){
						if(_page > 1) {
							_page = _page - 1;
							_doPage(_page, _rows);
							_JPagenation.createPagenation();
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
							_doPage(_page, _rows);
							_JPagenation.createPagenation();
						}
					}
				} else {
					preBtn.addEventListener('click',function(){
						if(_page > 1) {
							_page = _page - 1;
							_doPage(_page, _rows);
							_JPagenation.createPagenation();
						} else {
							alert("已经是第一页了");
							return;
						}
					});
					nxtBtn.addEventListener('click',function(){
						if(_isMax) {
							alert("已经是最后一页了");
							return;
						} else {
							_page = _page + 1;
							_doPage(_page, _rows);
							_JPagenation.createPagenation();
						}
					});
				}
			}
		}
	}
}

var JInput = function(input) {
	var _id = input.id;
	var _value = input.value;
	var _text = input.txt;
	var _customFunction = input.customFunction;
	var _deleteFunction = input.deleteFunction;
	
	var inputDiv = document.getElementById(_id);
	
	var element = document.createElement("div");
	element.className = "custom_input_block";
	
	var inputElement = document.createElement("div");
	inputElement.className = "custom_input_text";
	inputElement.id = _id + "_txt"
	inputElement.onclick = function() {
		_customFunction();
	}
	if(input.txt && input.value) {
		inputElement.innerHTML = input.txt
	}
	element.appendChild(inputElement);
	
	var deleteElement = document.createElement("div");
	deleteElement.className = "custom_input_del_btn";
	deleteElement.id = _id + "_del_btn";
	deleteElement.onclick = function() {
		this.style.visibility="hidden";
		document.getElementById(_id + "_txt").innerHTML = "";
		document.getElementById(_id + "_value").value = "";
		
		if(_deleteFunction) {
			_deleteFunction();
		}
	}
	element.appendChild(deleteElement);
	
	var valueElement = document.createElement("input");
	valueElement.id = _id + "_value"
	valueElement.setAttribute("name", input.id);
	valueElement.setAttribute("type", "hidden");
	if(input.txt && input.value) {
		valueElement.setAttribute("value", input.value);
	}
	
	element.appendChild(valueElement);
	inputDiv.appendChild(element);
	
	
	
	
	this.finishValueSelect = function(rtnObj) {
		document.getElementById(_id + "_txt").innerHTML = rtnObj.txt;
		document.getElementById(_id + "_value").value = rtnObj.value;
		document.getElementById(_id + "_del_btn").style.visibility = "visible";
	}
	
	this.getJInputValue = function() {
		return document.getElementById(_id + "_value").value;
	}
	
	this.clearInput = function() {
		document.getElementById(_id + "_txt").innerHTML = "";
		document.getElementById(_id + "_value").value = "";
		document.getElementById(_id + "_del_btn").style.visibility = "hidden";
	}
	
	
}

