function JAgreement(id) {
	var _id = id;
	var _entityId;
	
	var processing = false;
	
	var _margin = 15;
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	var agreementWidth = totalWidth/3;
	var agreementHeight = totalHeight/5*4;
	
	var body = document.body;
	
	var formMask = document.createElement("div");
	formMask.className = "form_mask";
	formMask.style.width = totalWidth;
	formMask.id = _id + "_mask";
	formMask.style.height = totalHeight;
	formMask.style.left = 0;
	formMask.style.top = 0;
	formMask.style.display = "none";
	formMask.onclick = function() {
		hideAgreement();
	}
	body.appendChild(formMask);
	
	var agreement = document.createElement("div");
	agreement.id = _id + "_agreement";
	agreement.className = "agreement_div";
	agreement.style.width = agreementWidth + "px";
	agreement.style.height = agreementHeight + "px";
	agreement.style.left = (totalWidth - agreementWidth)/2;
	agreement.style.top = (totalHeight - agreementHeight)/2;
	agreement.style.display = "none";
	body.appendChild(agreement);
	
	var titleDiv = document.createElement("div");
	titleDiv.className = "agreement_title_block";
	titleDiv.innerHTML = "服务保障承诺";
	agreement.appendChild(titleDiv);
	
	var agreementBodyDiv = document.createElement("div");
	agreementBodyDiv.className = "agreement_body_block";
	agreementBodyDiv.innerHTML = "我公司(以下简称我公司)根据号文件批复开发建设项目，我公司根据贵司摆帐款要求，我开户银行银行支行同意按出具资金锁定函的方式为我公司接款万元人民币。我公司同意显示和支付%服务费。　　我公司保证提供的企业执照、相关项目批复文件及银行官员的身份证明、任职文件是真实、有效、合法，是可查询、可验证的，是合法的经营者。我公司保证甲乙双方签约后两日内准时进银行操作，并且开户银行开出的银行资金锁定函是银行行为，真实有效、依法合规。　　双方签订协议后企业方即可向资方支付万元前期服务费。贵方到企业所在地后安排人员自行选定银行开立个人账户打入壹千万人民币(以进账单为主)，我方即时支付______万元服务费，然后按照双方签订的协议在约定的时间内进银行开始操作。　　如因我公司和我接款银行原因不能继续操作时，我公司将承担一切经济责任并放弃一切追索要求和诉讼权利。　　特此承诺　　承诺单位(盖章)：　　法定代表人或经办人(签字)："
	agreement.appendChild(agreementBodyDiv);
	
	var agreeBlock = document.createElement("div");
	agreeBlock.className = "agree_block"
	agreement.appendChild(agreeBlock);
	
	var agreeInfoBlock = document.createElement("div");
	agreeInfoBlock.className = "agree_info"
	agreeInfoBlock.innerHTML = "点击“确认”表示我完全同意以上文件条款";
	agreeBlock.appendChild(agreeInfoBlock);
	
	
	var agreeBtn = document.createElement("div");
	agreeBtn.className = "agree_btn";
	agreeBtn.id = _id + "_agreement";
	agreeBtn.innerHTML = "确认";
	agreeBlock.appendChild(agreeBtn);
	
	var negativeBtn = document.createElement("div");
	negativeBtn.className = "agree_btn";
	negativeBtn.innerHTML = "不同意";
	negativeBtn.onclick = function() {
		hideAgreement();
	}
	agreeBlock.appendChild(negativeBtn);
	
	var agreementCloseBlock = document.createElement("div");
	agreementCloseBlock.className = "agreement_close_block";
	agreementCloseBlock.id = _id + "_close_block";
	agreementCloseBlock.style.left = (totalWidth - agreementWidth)/2 + agreementWidth - 11;
	agreementCloseBlock.style.top = (totalHeight - agreementHeight)/2 - 11;
	agreementCloseBlock.style.display = "none";
	agreementCloseBlock.onclick = function() {
		hideAgreement();
	}
	
	var agreementClose = document.createElement("div");
	agreementClose.className = "agreement_close";
	agreementCloseBlock.appendChild(agreementClose);
	
	body.appendChild(agreementCloseBlock);
	
	
	this.showAgreement = function(agreementObj) {
		var maskDiv = document.getElementById(_id + "_mask");
		var agreementDiv = document.getElementById(_id + "_agreement");
		var closeBlockDiv = document.getElementById(_id + "_close_block");
		maskDiv.style.display = "inline";
		agreementDiv.style.display = "inline";
		closeBlockDiv.style.display = "inline";
		
		var agreeBtn = document.getElementById(_id + "_agreement");
		agreeBtn.onclick = function() {
			hideAgreement();
			agreementObj.agree();
		}
	}
	
	var hideAgreement = function() {
		var maskDiv = document.getElementById(_id + "_mask");
		var agreementDiv = document.getElementById(_id + "_agreement");
		var closeBlockDiv = document.getElementById(_id + "_close_block");
		maskDiv.style.display = "none";
		agreementDiv.style.display = "none";
		closeBlockDiv.style.display = "none";
	}
	
	
}