
function gotoFront(documentId) {
	document.getElementById(documentId).style.visibility = "visible";
}

function gotoBack(documentId) {
	document.getElementById(documentId).style.visibility = "hidden";
}

function appear(documentId) {
	document.getElementById(documentId).style.display = "inline";
}
function disappear(documentId) {
	document.getElementById(documentId).style.display = "none";
}
function getWidth(documentId) {
	return document.getElementById(documentId).style.width;
}
function getLeft(documentId) {
	return document.getElementById(documentId).offsetLeft;
}
function getTop(documentId) {
	return document.getElementById(documentId).offsetTop;
}

function processUserInfo(treeMenuInfo) {
	var userInfoObj = getUserInfo();
	drawUserInfo("云南省涉旅商户认证平台", userInfoObj, treeMenuInfo, "login.html")
}


function drawUserInfo(title, userInfoObj, treeMenuInfo, loginPage) {
	var _level = treeMenuInfo.level;
	var _treeNodeId = treeMenuInfo.treeNodeId;
	
	if(_level >= 0 && _level < 6) {
		var levelInfo = "";
		for(var i = 0; i < _level; i++) {
			levelInfo += "../"
		}
		
		if(!userInfoObj) {
			location.href = levelInfo + loginPage;
		}
		
		var titleBlock = document.createElement("div");
		titleBlock.className = "title_block";
		
		var leftTitle = document.createElement("div");
		leftTitle.className = "left_title";
		leftTitle.innerHTML = title;
		titleBlock.appendChild(leftTitle);
		
		var quitBtn = document.createElement("div");
		quitBtn.className = "quit_img";
		quitBtn.onclick = function() {
			if(confirm("您确定要退出吗？")) {
				localStorage.clear();
				location.href = levelInfo + loginPage;
			}
		}
		titleBlock.appendChild(quitBtn);
		
		var roleInfoDiv = document.createElement("div");
		roleInfoDiv.className = "role_info";
		roleInfoDiv.id = "role_info";
		titleBlock.appendChild(roleInfoDiv);
		
		document.getElementById("userInfoBlock").appendChild(titleBlock);
		
		queryUserBaseInfo(_treeNodeId, userInfoObj);
	}
}
function queryUserBaseInfo(treeNodeId, userInfoObj) {
	var url = getCommonSvrAddress() + "queryUserBaseInfo.action?";
	url += "&userId=" + userInfoObj.userId + "&treeNodeId=" + treeNodeId;
	
	$.ajax({
		type: "GET",
		url:url,
		dataType:"json",
		success: function(data) {
			if(data) {
				if (data.isSuccess) {
					var title = createTreeMenu("treeMenu", data.rtnObj.menuInfo);
					assembleRightTitle(title);
					assembleRoleInfo(userInfoObj, data.rtnObj.roleInfo);
				} else {
					alert(data.message);
				}
			}
		}
    });
}
function assembleRoleInfo(userInfoObj, roleInfo) {
	var roleObj = document.getElementById("role_info");
	var userName = userInfoObj.userName;
	var userTel = userInfoObj.userTel;
	
	var userInfo = "";
	if(userName && userName != "null") {
		userInfo = roleInfo + "-" + userName
	} else {
		userInfo = roleInfo + "-" + userTel
	}
	roleObj.innerHTML = userInfo;
}
function assembleRightTitle(title) {
	document.title = title;
	var rightTitleBlock = document.getElementById("rightTitleBlock");
	
	if(rightTitleBlock) {
		var rightTitle = document.createElement("div");
		rightTitle.innerHTML = title;
		rightTitle.className = "right_title";
		rightTitleBlock.appendChild(rightTitle);
		
		var rightTitleHolder = document.createElement("div");
		rightTitleHolder.className = "right_title_holder";
		rightTitleBlock.appendChild(rightTitleHolder);
		
		var rightTitleLine = document.createElement("div");
		rightTitleLine.className = "right_title_line";
		rightTitleBlock.appendChild(rightTitleLine);
		
		var rightTitleLineHolder = document.createElement("div");
		rightTitleLineHolder.className = "right_title_line_holder";
		rightTitleBlock.appendChild(rightTitleLineHolder);
	}
}

function getSvrAddress() {
	return "http://localhost:8080/";
}

function getCommonSvrAddress() {
	return "http://121.199.38.132:8112/";
}

function getUserInfo() {
	if(localStorage) {
		return JSON.parse(localStorage.getItem("ma-merchant.user"));
	} else {
		alert("您的浏览器无法支持,请下载IE8以上版本的浏览器");
	}
}


//处理图片上传============================================
function processFileSliceData(processObj) {
	var _fileData = processObj.fileData;
	var _showUploadingProgress = processObj.showUploadingProgress;
	var _uploadSuccess = processObj.uploadSuccess;
	var _uploadError = processObj.uploadError;
	
	var bufferSize = 100 * 1024;
	var offsetIdx = 0;
	var fileFullPath;
	var relativeFilePath;
	var rtnMsg;
	
	var uploadTimes = Math.ceil(_fileData.length / bufferSize);
	
	for(var i = 1; i <= uploadTimes; i ++) {
		var endIdx = offsetIdx + bufferSize;
		
		var data = _fileData.substring(offsetIdx, endIdx);
		offsetIdx = endIdx;
		
		if(i == 1) {
			rtnMsg = storeFileHead(data);
		} else {
			rtnMsg = storeFileData({data: data, fullFilePath: fileFullPath, relativeFilePath: relativeFilePath, isLast: i==uploadTimes});
		}
		
		if(rtnMsg.isSuccess) {
			fileFullPath = rtnMsg.fullFilePath;
			relativeFilePath = rtnMsg.relativeFilePath;
			
			_showUploadingProgress(uploadTimes, i);
		} else {
			break;
		}
	}
	
	if(rtnMsg) {
		if(rtnMsg.isSuccess) {
			_uploadSuccess(relativeFilePath, fileFullPath);
		} else {
			alert(rtnMsg.message);
			_uploadError();
		}
	} else {
		alert("上传文件异常，请检查网络");
		_uploadError();
	}
}



function storeFileHead(fileData) {
	var url = getSvrAddress() + "uploadSliceFileHead.action";
	
	var data = {data: fileData};
	
	var rtnMsg;
	
	$.ajax({
		type: "POST",
		url:url,
		data:data,
		async: false,
		dataType:"json",
		success: function(data) {
			rtnMsg = data;
		},
		error: function() {
			rtnMsg = {isSuccess: false, message: "上传文件异常，请检查网络情况"};
		}
	});
	
	return rtnMsg;
}

function storeFileData(fileData) {
	var url = getSvrAddress() + "uploadSliceFile.action";
	var rtnMsg;
	
	$.ajax({
		type: "POST",
		url:url,
		data:fileData,
		async: false,
		dataType:"json",
		success: function(data) {
			rtnMsg = data;
		},
		error: function() {
			rtnMsg = {isSuccess: false, message: "上传文件异常，请检查网络情况"};
		}
	});
	
	return rtnMsg;
}

