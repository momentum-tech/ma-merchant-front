function JLoading() {
	var body = document.body;
	
	var totalHeight = document.documentElement.clientHeight;
	var totalWidth = document.documentElement.clientWidth;
	
	var formMask = document.createElement("div");
	formMask.className = "loading_mask";
	formMask.style.width = totalWidth + "px";
	formMask.id = "_loading_mask";
	formMask.style.height = totalHeight + "px";
	formMask.style.left = 0;
	formMask.style.top = 0;
	formMask.style.zIndex = 1050;
	formMask.style.display = "none";
	
	body.appendChild(formMask);
	
	var loadingDiv = document.createElement("div");
	loadingDiv.className = "loading_div";
	loadingDiv.id = "_loading_div";
	loadingDiv.style.left = (totalWidth - 45)/2 + "px";
	loadingDiv.style.top = (totalHeight - 45)/2 + "px";
	loadingDiv.style.zIndex = 1050;
	loadingDiv.style.display = "none";
	
	body.appendChild(loadingDiv);
	
	this.showLoading = function() {
		document.getElementById("_loading_mask").style.display = "inline";
		document.getElementById("_loading_div").style.display = "inline";
	}
	
	this.hideLoading = function() {
		document.getElementById("_loading_mask").style.display = "none";
		document.getElementById("_loading_div").style.display = "none";
	}
	
}
