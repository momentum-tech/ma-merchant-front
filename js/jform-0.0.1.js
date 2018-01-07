function JForm() {
	var _id = "jEntityForm";
	var _width = 550;
	
	var _formId = _id + '_form';
	
	var _inputLst;
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	
	var height = 30;
	
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
	formMask.style.zIndex = 1000;
	formMask.style.display = "none";
	
	body.appendChild(formMask);
	
	var formBlock = document.createElement("div");
	
	formBlock.className = "form_block";
	formBlock.style.width = _width;
	formBlock.style.height = height + "px";
	formBlock.style.left = left;
	formBlock.style.top = top;
	formBlock.style.zIndex = 1001;
	formBlock.style.display = "none";
	formBlock.id = _id;
	
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
	formBtn.className = "form_btn";
	formTitleInfoBlock.appendChild(formBtn);
	
	var loadingBtn = document.createElement("div");
	loadingBtn.id = _id + "_btn_loading";
	loadingBtn.className = "form_loading";
	formTitleInfoBlock.appendChild(loadingBtn);
	
	var formInfoBlock = document.createElement("div");
	formInfoBlock.id = _id + "_form_div";
	formInfoBlock.style.height = height + "px";
	formInfoBlock.className = "form_info";
	formBlock.appendChild(formInfoBlock);
	
	var fromInfo = document.createElement("form");
	fromInfo.id = _id + "_form";
	
	body.appendChild(formBlock);
	
	this.showForm = function(formInfo) {
		var formDiv = document.getElementById(_id);
		var formInfoBlock = document.getElementById(_id + "_form_div");
		
		document.getElementById(_id + "_mask").style.display = "inline";
		formDiv.style.display = "inline";
		
		var formSize = 0;
		for(var i = 0; i < formInfo.inputLst.length; i++) {
			var input = formInfo.inputLst[i];
			if(input.type != 'hidden') {
				formSize ++;
			}
		}
		
		var totalHeight = document.body.clientHeight;
		var height = Math.ceil(formSize/2) * 50 + 30;
		var top = (totalHeight - height)/2;
		
		formInfoBlock.style.height = height + "px";
		formDiv.style.top = (top - 20) + "px";
		
		this.drawForm(formInfo);
	}
	
	this.hideForm = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}
	
	this.drawForm = function(formInfo) {
		document.getElementById(_id + "_form_div").innerHTML = "";
		document.getElementById(_id + "_btn").style.visibility = "visible";
		document.getElementById(_id + "_btn_loading").style.visibility = "hidden";
		
		_inputLst = formInfo.inputLst;
		var btnFunction = formInfo.btnFunction;
		var customFunction = formInfo.customFunction;
		var customDelete = formInfo.customDelete;
		
		if(formInfo.title) {
			document.getElementById(_id + "_title").innerHTML = formInfo.title;
		} else {
			document.getElementById(_id + "_title").innerHTML = "";
		}
		
		if(formInfo.btnTxt) {
			document.getElementById(_id + "_btn").style.display = "inline";
			document.getElementById(_id + "_btn").innerHTML = formInfo.btnTxt;
		} else {
			document.getElementById(_id + "_btn").style.display = "none";
		}
		
		var fromInfo = document.createElement("form");
		fromInfo.id = _id + "_form"; 
		
		var elementSize = 0;
		for(var i = 0; i < _inputLst.length; i ++) {
			var elementLineDiv;
			
			var input = _inputLst[i];
			var inputType = input.type;
			
			if(inputType == "hidden") {
				continue;
			}
			
			if(elementSize % 2 == 0) {
				elementLineDiv = document.createElement("div");
				fromInfo.appendChild(elementLineDiv);
				
				if(elementSize == 0) {
					elementLineDiv.className = "form_element_line_top_block";
				} else {
					elementLineDiv.className = "form_element_line_block";
				}
			}
			
			var label = document.createElement("label");
			label.className = "form_label";
			label.innerHTML = input.label + ":";
			elementLineDiv.appendChild(label);
			
			if(input.isNotNull) {
				var formNotNull = document.createElement("div");
				formNotNull.className = "form_not_null";
				elementLineDiv.appendChild(formNotNull);
			} else {
				var formNotNull = document.createElement("div");
				formNotNull.className = "form_null";
				elementLineDiv.appendChild(formNotNull);
			}
			
			
			if(inputType == "text") {
				var element = document.createElement("input");
				element.className = "form_lnput";
				element.id = input.id;
				element.name = input.id;
				element.setAttribute("name", "input.id");
				element.setAttribute("type", "text");
				
				if(input.value) {
					element.setAttribute("value", input.value);
				}
				elementLineDiv.appendChild(element);
			} else if(inputType == "select") {
				var element = document.createElement("select");
				element.className = "form_lnput";
				element.id = input.id;
				element.name = input.id;
				element.setAttribute("name", input.id);
				
				var optionLst = input.optionLst;
				
				for(var j = 0; j < optionLst.length; j++) {
					var opt = optionLst[j];
					if(input.value == opt.value) {
						var option = new Option(opt.txt, opt.value);
						option.selected = true;
						element.add(option);
					} else {
						var option = new Option(opt.txt, opt.value);
						element.add(option);
					}
				}
				elementLineDiv.appendChild(element);
			} else if(inputType == "custom") {
				var element = document.createElement("div");
				element.className = "form_custom_div";
				element.id = input.id + "_block";
				
				var inputElement = document.createElement("div");
				inputElement.className = "form_custom_value";
				inputElement.id = input.id + "_txt";
				inputElement.onclick = function() {
					var tmpId = this.id;
					var inputTxtId = tmpId.substring(0, tmpId.length - 4);
					customFunction(inputTxtId);
				}
				if(input.txt && input.value) {
					inputElement.innerHTML = input.txt
				}
				
				element.appendChild(inputElement);
				
				var deleteElement = document.createElement("div");
				deleteElement.className = "form_custom_del";
				deleteElement.id = input.id + "_del_btn";
				deleteElement.onclick = function() {
					var tmpId = this.id;
					var inputId = tmpId.substring(0, tmpId.length - 8);
					
					this.style.visibility = "hidden";
					document.getElementById(inputId + "_txt").innerHTML= "";
					document.getElementById(inputId).value= "";
					
					if(customDelete) {
						customDelete(inputId);
					}
				}
				element.appendChild(deleteElement);
				
				var valueElement = document.createElement("input");
				valueElement.id = input.id;
				valueElement.name = input.id;
				valueElement.setAttribute("name", input.id);
				valueElement.setAttribute("type", "hidden");
				if(input.txt && input.value) {
					valueElement.setAttribute("value", input.value);
				}
				
				element.appendChild(valueElement);
				elementLineDiv.appendChild(element);
			} else if(inputType == "view") {
				var element = document.createElement("label");
				element.className = "form_label_view";
				if(input.value) {
					element.innerHTML = input.value
				}
				elementLineDiv.appendChild(element);
			}
			elementSize ++;
		}
		
		for(var i = 0; i < _inputLst.length; i ++) {
			var input = _inputLst[i];
			
			if(input.type == "hidden") {
				var hiddenElement = document.createElement("input");
				hiddenElement.id = input.id;
				hiddenElement.name = input.id;
				hiddenElement.setAttribute("name", input.id);
				hiddenElement.setAttribute("type", "hidden");
				if(input.value) {
					hiddenElement.setAttribute("value", input.value);
				}
				fromInfo.appendChild(hiddenElement);
			}
		}
		document.getElementById(_id + "_form_div").appendChild(fromInfo);
		
		if(btnFunction) {
			var divObj = document.getElementById(_id + '_btn');
			divObj.onclick = function(){
				var rtnObj = serializeForm(_formId);
				var records = rtnObj.split("&");
				
				for(var i = 0; i < records.length; i ++) {
					var record = records[i];
					
					var equalIdx = record.indexOf("=");
					var id = record.substring(0, equalIdx);
					
					if(record.indexOf("=") == (record.length - 1)) {
						for(var j = 0; j < _inputLst.length; j ++) {
							var input = _inputLst[j];
							if(input.id == id && input.isNotNull) {
								alert(input.label + "不能为空");
								return;
							}
						}
					}
				}
				divObj.style.display = "none";
				drawLoading();
				
				btnFunction(rtnObj);
			}
		}
	}
	
	
	
	var drawLoading = function() {
		document.getElementById(_id + "_btn_loading").style.visibility = "visible";
		
		var info = "<form id='" + _id + "_form'>";
		
		var elementSize = 0;
		for(var i = 0; i < _inputLst.length; i ++) {
			var input = _inputLst[i];
			var inputType = input.type;
			
			if(inputType == "hidden") {
				continue;
			}
			
			if(elementSize % 2 == 0) {
				if(elementSize != 0) {
					info += "</div>";
				}
				if(elementSize == 0) {
					info += "<div style=\"height:50px;float:left;width:100%;margin-top:10px;\">";
				} else {
					info += "<div style=\"height:50px;float:left;width:100%;\">";
				}
			}
			info += "<label for='" + input.id + "' class='form_label'>" + input.label + ": </label>";
			
			if(input.isNotNull) {
				info += "<div class='form_not_null'></div>";
			} else {
				info += "<div class='form_null'></div>";
			}
			info += "<label class='form_label_view'>";
			if(inputType == "text") {
				var inputObj = document.getElementById(input.id);
				if(inputObj.value) {
					info += inputObj.value
				}
			} else if(inputType == "custom") {
				var inputObj = document.getElementById(input.id + "_txt");
				info += inputObj.innerHTML;
			}
			info += "</label>";
			
			elementSize ++;
		}
		info += "</div></div></form>";
		
		document.getElementById(_id + "_form_div").innerHTML = info;
	}
	
	this.processCustom = function(rtnObj) {
		var customTxtId = rtnObj.id + "_txt";
		var inputId = rtnObj.id;
		var inputDelBtn = rtnObj.id + "_del_btn";
		
		document.getElementById(inputId).value = rtnObj.value;
		document.getElementById(inputDelBtn).style.visibility = "visible";
		document.getElementById(customTxtId).innerHTML = rtnObj.txt;
	}
	
	this.clearFormInfo = function(inputId) {
		for(var i = 0; i < _inputLst.length; i ++) {
			var input = _inputLst[i];
			if(input.id == inputId) {
				var inputType = input.type;
				if(inputType == "custom") {
					var customInputId = inputId + "_txt";
					var inputId = inputId;
					var inputDelBtn = inputId + "_del_btn";
					
					document.getElementById(inputId).value = "";
					document.getElementById(inputDelBtn).style.visibility = "hidden";
					document.getElementById(customInputId).innerHTML = "";
				}
			}
		}
	}
	
	
	var serializeForm = function () {
		var form = document.getElementById(_formId);
	    var elements = new Array();
	    var tagElements = form.getElementsByTagName('input');
		
	    for (var j = 0; j < tagElements.length; j++){
			elements.push(tagElements[j]);
		}
		
		var selectElements = form.getElementsByTagName('select');
		for(var i = 0; i < selectElements.length; i++) {
			elements.push(selectElements[i]);
		}
		
		var queryComponents = new Array();
		
		for (var i = 0; i < elements.length; i++) {
		    var queryComponent = serializeElement(elements[i]);
		    if (queryComponent){
				queryComponents.push(queryComponent);
			}
		}
		
		return queryComponents.join('&');  
	}
	
	var serializeElement = function(element) {    
		var method = element.tagName.toLowerCase();
		var parameter = input(element);

		if (parameter) {
			var key = encodeURIComponent(parameter[0]);
			if (key.length == 0) return;

			if (parameter[1].constructor != Array) {
				parameter[1] = [parameter[1]];
			}
			
			var values = parameter[1];
			
			var results = [];
			for (var i=0; i<values.length; i++) {
				results.push(key + '=' + encodeURIComponent(values[i]));
			}
			return results.join('&');
		}
	}
	
	var inputSelector = function(element) {
		if (element.checked) {
			return [element.id, element.value];
		}
	}
	
	var selectSelector = function(element) {
		var index = element.selectedIndex; // 选中索引
		var value = element.options[index].value; // 选中值
		
		return [element.id, value];
	}
      
	var input = function (element) {
		switch (element.type.toLowerCase()) {
			case 'submit':
			case 'hidden':
			case 'password':
			case 'text':
				return [element.id, element.value];
			case 'checkbox':
			case 'radio':
				return inputSelector(element);
			case 'select-one':
				return selectSelector(element);
		}
		return false;
	}
	
}
