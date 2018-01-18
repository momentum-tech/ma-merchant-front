function JValueChecker(objLst) {
	
	var attentionLst = new Array();
	
	this.doCheck = function(checkTarget) {
		var tip = checkTarget.tip;
		var checkTargetId = checkTarget.id;
		var value = checkTarget.value;
		var targetObj = document.getElementById(checkTargetId);
		if(!value) {
			if(targetObj) {
				var targetHeight = targetObj.offsetHeight;
			
				var body = document.body;
				
				var checkAlarmImageBlock = document.createElement("div");
				checkAlarmImageBlock.id = "checkAlarmImageBlock_" + checkTargetId;
				checkAlarmImageBlock.className = "check_alarm_image_block";
				checkAlarmImageBlock.style.marginTop = ((targetHeight - 14)/2) + "px";
				checkAlarmImageBlock.style.marginLeft = "5px";
				checkAlarmImageBlock.style.left = targetObj.offsetLeft + targetObj.offsetWidth;
				checkAlarmImageBlock.style.top = targetObj.offsetTop;
				body.appendChild(checkAlarmImageBlock);
				
				attentionLst[attentionLst.length] = checkAlarmImageBlock.id;
				
				var checkAlarmImage = document.createElement("div");
				checkAlarmImage.className = "check_alarm_image";
				checkAlarmImageBlock.appendChild(checkAlarmImage);
				
				var checkTip = document.createElement("div");
				checkTip.id = "checkTip_" + checkTargetId;
				checkTip.className = "check_tip";
				checkTip.style.left = (targetObj.offsetLeft + 3) + "px";
				checkTip.style.top = (targetObj.offsetTop + targetObj.offsetHeight + 3) + "px";
				checkTip.innerHTML = tip;
				
				attentionLst[attentionLst.length] = checkTip.id;
				
				body.appendChild(checkTip);
			}
		}
	}
	
	this.clearChecker = function(value) {
		for(var i = 0; i < attentionLst.length; i++) {
			var objId = attentionLst[i];
			document.getElementById(objId).remove();
		}
		attentionLst = new Array();
	}
	
	this.isCheckOK = function() {
		if(attentionLst.length > 0) {
			return false;
		}
		return true;
	}
	
	
}