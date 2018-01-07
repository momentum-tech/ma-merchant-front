function JSoftKeyborad(datas) {
	var _id = datas.id;
	var softKeyboradClick = datas.softKeyboradClick;
	
	var isHidden = false;
	
	var keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "确认"];
	var valueLst = new Array();
	
	var softboard = document.getElementById(_id);
	
	var titleBlock = document.createElement("div");
	titleBlock.className = "softboard_title_block";
	softboard.appendChild(titleBlock);
	
	var titleLabel = document.createElement("div");
	titleLabel.className = "softboard_title_label";
	titleLabel.innerHTML = "欢迎使用聚合支付";
	titleBlock.appendChild(titleLabel);
	
	var totalHeight = document.documentElement.clientHeight;
	var miniMarginTop = totalHeight - 290;
	
	var softKeyboradDel = document.createElement("div");
	softKeyboradDel.onclick = function() {
		valueLst.pop();
		var amt = getAmtFormatValue();
		softKeyboradClick(amt);
	}
	softKeyboradDel.className = "soft_keyboard_del";
	titleBlock.appendChild(softKeyboradDel);
	
	var softKeyboardDown = document.createElement("div");
	softKeyboardDown.onclick = function() {
		hiddenSoftboard();
	}
	softKeyboardDown.className = "soft_keyboard_down";
	titleBlock.appendChild(softKeyboardDown);
	
	for(var i = 0; i < keys.length; i ++) {
		var key = keys[i];
		
		var keyBtn = document.createElement("div");
		
		keyBtn.innerHTML = key;
		if("确认" == key) {
			keyBtn.className = "soft_keyboard_ok_btn";
			keyBtn.onclick = function() {
				var amt = getAmtFormatValue();
				if(amt == "" || amt == "0" || amt == ".") {
					alert("请输入正确金额！");
					return;
				}
				
				hiddenSoftboard();
			}
		} else if("." == key) {
			keyBtn.className = "soft_keyboard_amt_btn";
			keyBtn.onclick = function() {
				valueLst.push(".");
				
				var amt = getAmtFormatValue();
				softKeyboradClick(amt);
			}
		} else {
			keyBtn.className = "soft_keyboard_amt_btn";
			keyBtn.onclick = function() {
				valueLst.push(this.innerHTML);
				
				var amt = getAmtFormatValue();
				softKeyboradClick(amt);
			}
		}
		softboard.appendChild(keyBtn);
	}
	
	
	var top = Math.min(miniMarginTop, softboard.offsetTop);
	
	var getAmtFormatValue = function() {
		var inputValue = valueLst.join("");
		
		var zeroIdx = inputValue.indexOf("0");
		var pointIdx = inputValue.indexOf(".");
		if(inputValue != "0" && zeroIdx == 0 && pointIdx != (zeroIdx + 1)) {
			inputValue = inputValue.substring(1, inputValue.length);
		}
		
		if(pointIdx == 0) {
			inputValue = inputValue.substring(1, inputValue.length);
		}
		
		inputValue = inputValue.replace(/[^\d.]/g,"");
		inputValue = inputValue.replace(/\.{2,}/g,".");
		inputValue = inputValue.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
		inputValue = inputValue.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
		if(inputValue.indexOf(".") < 0 && inputValue != "") {
			inputValue = parseFloat(inputValue);
		}
		
		valueLst = new String(inputValue).split("");
		return inputValue;
	}
	
	var hiddenSoftboard = function() {
		isHidden = true;
		
		var obj = document.getElementById(_id);
		
		var interval = 290;
		
		var timer = setInterval(function(){
			if(interval > 0){
				interval = interval - 12;
				obj.style.top = (obj.offsetTop + 12) + 'px';
			}else{
				clearInterval(timer);
			}
		},10);
	}
	
	this.showSoftboard = function() {
		if(isHidden) {
			var obj = document.getElementById(_id);
		
			var interval = 0;
		
			var timer = setInterval(function(){
				if(interval < 290){
					interval = interval + 12;
					obj.style.top = (obj.offsetTop - 12) + 'px';
				}else{
					clearInterval(timer);
				}
			},10);
		}
	}
	
}