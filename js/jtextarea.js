function JTextArea(data) {
	var _id = data.id;
	var _width = 550;
	
	var _formId = _id + '_form';
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	
	var height = 300;
	
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
	
	
	var textArea = document.createElement("textarea");
	textArea.id = _id + "_txt_info";
	textArea.className = "text_area";
	textArea.style.width = (_width - 10) + "px";
	formBlock.appendChild(textArea);
	
	body.appendChild(formBlock);
	
	this.showForm = function(formInfo) {
		document.getElementById(_id + "_mask").style.display = "inline";
		document.getElementById(_id).style.display = "inline";
		
		this.drawForm(formInfo);
	}
	
	var hideForm = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}
	
	this.drawForm = function(formInfo) {
		document.getElementById(_id + "_btn").style.visibility = "visible";
		document.getElementById(_id + "_btn_loading").style.visibility = "hidden";
		
		var btnFunction = formInfo.btnFunction;
		
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
		
		
		if(btnFunction) {
			var divObj = document.getElementById(_id + '_btn');
			var textArea = document.getElementById(_id + "_txt_info");
			
			divObj.onclick = function(){
				hideForm();
				
				btnFunction(textArea.value);
			}
		}
	}
		
}
