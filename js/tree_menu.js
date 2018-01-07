function createTreeMenu(divName, principalNodeList) {
	var html = "";
	var title = "";
	
	for(var i = 0; i < principalNodeList.length; i++) {
		var principalNode = "";
		principalNode += "<div class=\"parent_tree_item\"><div class=\"parent_tree_img\"></div>";
		
		principalNode += "<div class=\"parent_tree_label\">" + principalNodeList[i].label + "</div>";
		principalNode += "</div>";
		
		if(principalNodeList[i].nodes) {
			var nodeList = principalNodeList[i].nodes
			var node = "";
			for(var j = 0; j < nodeList.length; j++) {
				
				if(nodeList[j].isSelected) {
					node += "<div class=\"selected_tree_item\" onclick=\"location.href='" + nodeList[j].href + "'\">";
					node += "<div class=\"selected_tree_flag\"></div>";
					node += "<div class=\"selected_tree_label\">" + nodeList[j].label + "</div>";
					node += "</div>";
					
					title = nodeList[j].label;
				} else {
					node += "<div class=\"tree_item\" onclick=\"location.href='" + nodeList[j].href + "'\">";
					node += "<div class=\"tree_label\">" + nodeList[j].label + "</div>";
					node += "</div>";
				}
			}
			principalNode += node;
		}
		html += principalNode;
	}
	document.getElementById(divName).innerHTML = html;
	
	return title;
}