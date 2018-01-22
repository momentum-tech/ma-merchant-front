jQuery.support.cors = true;

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
function stopPropagation(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
}

function processUserInfo(treeMenuInfo) {
	var userInfoObj = getUserInfo();
	drawUserInfo("云南省涉旅商户认证平台", userInfoObj, treeMenuInfo, "login.html", "main.html")
}


function drawUserInfo(title, userInfoObj, treeMenuInfo, loginPage, mainPage) {
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
		
		
		var todoBtn = document.createElement("div");
		todoBtn.id = "user_todo_btn";
		todoBtn.className = "todo_img";
		todoBtn.onclick = function(e) {
			showTodoDialog();
			stopPropagation(e);
		}
		titleBlock.appendChild(todoBtn);
		
		var todoNum = document.createElement("div");
		todoNum.className = "todo_num";
		todoNum.id = "user_todo_num";
		todoNum.innerHTML = "1";
		todoBtn.appendChild(todoNum);
		
		
		document.getElementById("userInfoBlock").appendChild(titleBlock);
		
		createMessageDialog();
		
		queryUserBaseInfo(_treeNodeId, userInfoObj, levelInfo, mainPage);
	}
}

//构建消息窗口
function createMessageDialog() {
	var body = document.body;
	
	var todoDialogBlock = document.createElement("div");
	todoDialogBlock.className = "todo_dialog_block";
	todoDialogBlock.id = "todo_dialog_block";
	todoDialogBlock.style.display = "none";
	body.appendChild(todoDialogBlock);
	
	var todoTipImg = document.createElement("div");
	todoTipImg.className = "todo_dialog_img";
	todoTipImg.id = "todoTipImg";
	todoTipImg.style.display = "none";
	body.appendChild(todoTipImg);
	
	var todoDialog = document.createElement("div");
	todoDialog.className = "todo_dialog";
	todoDialog.id = "todo_dialog";
	todoDialogBlock.appendChild(todoDialog);
	
	var todoDialogTitle = document.createElement("div");
	todoDialogTitle.className = "todo_dialog_title";
	todoDialogTitle.innerHTML = "待办任务列表";
	todoDialog.appendChild(todoDialogTitle);
	
	var todoDialogTitleLine = document.createElement("div");
	todoDialogTitleLine.className = "todo_dialog_title_line";
	todoDialog.appendChild(todoDialogTitleLine);
	
	var todoLstBlock = document.createElement("div");
	todoLstBlock.className = "todo_lst_block";
	todoLstBlock.id = "todoLstBlock"
	todoDialog.appendChild(todoLstBlock);
	
	if(window.attachEvent) {
		document.attachEvent('onclick',function(){
			var todoDialogBlock = document.getElementById("todo_dialog_block");
			todoDialogBlock.style.display = "none";
			
			var todoTipImg = document.getElementById("todoTipImg");
			todoTipImg.style.display = "none";
		});
	} else {
		document.addEventListener('click',function(){
			var todoDialogBlock = document.getElementById("todo_dialog_block");
			todoDialogBlock.style.display = "none";
			
			var todoTipImg = document.getElementById("todoTipImg");
			todoTipImg.style.display = "none";
		});
	}
}

function showTodoDialog() {
	var todoDialogBlock = document.getElementById("todo_dialog_block");
	
	var userTodoBtn = document.getElementById("user_todo_btn");
	var top = userTodoBtn.offsetTop;
	var left = userTodoBtn.offsetLeft;
	
	var dialogWidth = 300;
	var dialogHeight = 400;
	var dialogTop = top + 32;
	var dialogLeft = left + 10 - dialogWidth/2;
	
	todoDialogBlock.style.width = dialogWidth + "px";
	todoDialogBlock.style.height = dialogHeight + "px";
	todoDialogBlock.style.top = dialogTop + "px";
	todoDialogBlock.style.left = dialogLeft + "px";
	todoDialogBlock.style.display = "inline";
	
	var todoTipImg = document.getElementById("todoTipImg");
	todoTipImg.style.top = (dialogTop - 8) + "px";
	todoTipImg.style.left = (left + 10 - 6) + "px";
	todoTipImg.style.display = "inline";
}
function assembleTodoLst(data) {
	if(data) {
		var todoLstBlock = document.getElementById("todoLstBlock");
		todoLstBlock.innerHTML = "";
		
		var size = Math.min(7, data.length);
		for(var i = 0; i < size; i++) {
			var todoRow = document.createElement("div");
			todoRow.className = "todo_row_block";
			todoRow.innerHTML = data[i];
			
			todoLstBlock.appendChild(todoRow);
			
			var todoRowLine = document.createElement("div");
			todoRowLine.className = "todo_row_line";
			todoLstBlock.appendChild(todoRowLine);
		}
	}
}








function queryUserBaseInfo(treeNodeId, userInfoObj, levelInfo, mainPage) {
	var url = getSvrAddress() + "queryUserBaseInfo.action?";
	url += "&userId=" + userInfoObj.userId + "&treeNodeId=" + treeNodeId;
	
	$.ajax({
		type: "GET",
		url:url,
		dataType:"json",
		success: function(data) {
			if(data) {
				if (data.isSuccess) {
					var title = createTreeMenu("treeMenu", data.rtnObj.menuInfo);
					if(title == "" && treeNodeId != "main") {
						location.href = levelInfo + mainPage;
					} else {
						assembleRightTitle(title);
						assembleRoleInfo(userInfoObj, data.rtnObj.roleInfo);
						assembleTodoLst(["我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1", "我是测试消息1，我是测试消息1"]);
					}
				} else {
					alert(data.message);
				}
			}
		},
		error: function() {
			alert("查询用户基本信息失败，网络连接异常，请检查网络");
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
	return "http://111.231.201.90:8113/";
}

function getCommonSvrAddress() {
	return "http://111.231.201.90:8112/";
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
	
	var offsetIdx = 0;
	var fileFullPath;
	var relativeFilePath;
	var rtnMsg;
	
	//var uploadTimes = Math.ceil(_fileData.length / bufferSize);
	
	var uploadInfo = getUploadTimes(_fileData.length);
	for(var i = 1; i <= uploadInfo.uploadTimes; i ++) {
		var endIdx = offsetIdx + uploadInfo.bufferSize;
		
		var data = _fileData.substring(offsetIdx, endIdx);
		offsetIdx = endIdx;
		
		if(i == 1) {
			rtnMsg = storeFileHead(data);
		} else {
			rtnMsg = storeFileData({data: data, fullFilePath: fileFullPath, relativeFilePath: relativeFilePath, isLast: i==uploadInfo.uploadTimes});
		}
		
		if(rtnMsg.isSuccess) {
			fileFullPath = rtnMsg.fullFilePath;
			relativeFilePath = rtnMsg.relativeFilePath;
			
			_showUploadingProgress(uploadInfo.uploadTimes, i);
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

function getUploadTimes(fileSize) {
	var uploadTimes = 2;
	
	var bufferSize = 100 * 1024;
	if(fileSize < 100 * 1024) {
		uploadTimes = 2;
	} else if(fileSize > 100 * 1024 && fileSize <= 500 * 1024) {
		uploadTimes = 5;
	} else if(fileSize > 500 * 1024 && fileSize <= 2000 * 1024) {
		uploadTimes = 10;
	} else {
		uploadTimes = 20;
	}
	
	return {uploadTimes: uploadTimes, bufferSize: fileSize/uploadTimes}
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


//=======================================form 值序列号=======================================
var serializeForm = function (formId) {
	var form = document.getElementById(formId);
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