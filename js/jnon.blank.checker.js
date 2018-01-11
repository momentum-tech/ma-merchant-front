function JNonBlankChecker() {
	var body = document.body;
	
	var nonBlankTipBlock = document.createElement("div");
	nonBlankTipBlock.id = "nonBlankTipBlock";
	nonBlankTipBlock.className = "non_blank_block";
	nonBlankTipBlock.style.display = "none";
	
	var nonBlankAlarmImageBlock = document.createElement("div");
	nonBlankAlarmImageBlock.id = "nonBlankAlarmImageBlock";
	nonBlankAlarmImageBlock.className = "non_blank_alarm_image_block";
	nonBlankTipBlock.appendChild(nonBlankAlarmImageBlock);
	
	var nonBlankAlarmImage = document.createElement("div");
	nonBlankAlarmImage.className = "non_blank_alarm_image";
	nonBlankAlarmImageBlock.appendChild(nonBlankAlarmImage);
	
	var nonBlankInfo = document.createElement("div");
	nonBlankInfo.id = "nonBlankInfo";
	nonBlankInfo.innerHTML = "";
	nonBlankInfo.className = "non_blank_info";
	nonBlankTipBlock.appendChild(nonBlankInfo);
	
	var nonBlankImage = document.createElement("div");
	nonBlankImage.className = "non_blank_image";
	//nonBlankTipBlock.appendChild(nonBlankImage);
	
	body.appendChild(nonBlankTipBlock);
	
	this.doCheck = function(value) {
		var testObj = document.getElementById("cpyLegalName");
		
		var nonBlankTipBlock = document.getElementById("nonBlankTipBlock");
		nonBlankTipBlock.style.display = "inline";
		nonBlankTipBlock.style.left = testObj.offsetLeft + "px";
		nonBlankTipBlock.style.width = testObj.offsetWidth + "px";
		nonBlankTipBlock.style.top = testObj.offsetTop + "px";
		
		var targetHeight = testObj.offsetHeight;
		
		var nonBlankTipInfo = document.getElementById("nonBlankInfo");
		nonBlankTipInfo.style.height = targetHeight + "px";
		nonBlankTipInfo.style.lineHeight = targetHeight + "px";
		
		var nonBlankAlarmImageBlock = document.getElementById("nonBlankAlarmImageBlock");
		nonBlankAlarmImageBlock.style.marginTop = ((targetHeight - 14)/2) + "px";
		
		/**
		var records = value.split("&");
		for(var i = 0; i < records.length; i ++) {
			var record = records[i];
			
			var equalIdx = record.indexOf("=");
			var id = record.substring(0, equalIdx);
			
			if(record.indexOf("=") == (record.length - 1)) {
				
			}
		}*/
	}
}