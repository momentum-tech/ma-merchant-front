
function JPagenation(datas) {
	var _page = datas.page;
	var _isMax = datas.isMax;
	var _pagenationId = datas.pagenationId;
	var _doPage = datas.doPage;
	var _level = datas.level;
	var _JPagenation = this;
	
	this.createPagenation = function() {
		var levelInfo = "";
		for(var i = 0; i < _level; i++) {
			levelInfo += "../"
		}
		
		var info = "<div class=\"pagenation_div\">";
		info += "<img id='" + _pagenationId + "_pre' src=\""+ levelInfo + "/images/pre.png\" style=\"float:left;width:25px;height:20px;cursor:pointer;\"/>";
		info += "<div id=\"detailPageInfo\" class=\"pagenation_txt\" > 第 " + _page +  " 页 </div>";
		info += "<img id='" + _pagenationId + "_nxt' src=\""+ levelInfo + "/images/next.png\" style=\"float:left;width:25px;height:20px;cursor:pointer;\"/>";
		
		info += "</div>";
		document.getElementById(_pagenationId).innerHTML = info;
		
		var preBtn = document.getElementById(_pagenationId + "_pre");
		var nxtBtn = document.getElementById(_pagenationId + "_nxt");
		if(preBtn && nxtBtn) {
			if(window.attachEvent) {
				preBtn.onclick = function(){
					if(_page > 1) {
						_page = _page - 1;
						_doPage(_page);
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
						_doPage(_page);
						_JPagenation.createPagenation();
					}
				}
			} else {
				preBtn.addEventListener('click',function(){
					if(_page > 1) {
						_page = _page - 1;
						_doPage(_page);
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
						_doPage(_page);
						_JPagenation.createPagenation();
					}
				});
			}
		}
	}
}