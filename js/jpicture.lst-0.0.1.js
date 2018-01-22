function JPictureLst(obj) {
	var _id = obj.id;
	var _uploadFile = obj.uploadFile;
	var _isUpload = true;
	if(obj.isUpload == false) {
		_isUpload = false;
	}
	
	var _entityId;
	
	var processing = false;
	
	var _margin = 15;
	
	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;
	
	var _width, _height, _imageHeight, _pictureLst;
	
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
		hidePictureLst();
	}
	
	body.appendChild(formMask);
	
	this.showUploadingProgress = function(pictureId, total, current) {
		var imageUploadBtn = document.getElementById(pictureId + "_upload_block");
		var imageUploadProgress = document.getElementById(pictureId + "_progress");
		imageUploadBtn.style.visibility = "hidden";
		imageUploadProgress.style.visibility = "visible";
		
		var interval = _imageHeight/total * current;
		
		imageUploadProgress.style.marginTop = interval + "px";
		imageUploadProgress.style.height = (_imageHeight - interval) + 'px';
	}
	
	this.showPictureLst = function(showInfos) {
		_entityId = showInfos.entityId;
		_pictureLst = showInfos.pictureLst;
		
		var imageLst = showInfos.imageLst;
		var pictureLst = showInfos.pictureLst;
		
		drawImageFromLst(showInfos.pictureLst);
		
		document.getElementById(_id + "_mask").style.display = "inline";
		
		for(var i = 0; i < pictureLst.length; i ++) {
			var picture = pictureLst[i];
		
			var imgBlockDiv = document.getElementById(picture.id + "_image_block");
			imgBlockDiv.style.display = "inline";
			
			var imageUrl = picture.url;
			
			if(imageUrl) {
				document.getElementById(picture.id + "_image").src = imageUrl;
			}
		}
	}
	
	
	var drawImageFromLst = function(pictureLst) {
		var isEven = pictureLst.length%2 == 0;
		
		var _pictureSize = pictureLst.length;
		
		_width = (document.body.clientWidth - _margin * (_pictureSize - 1))/_pictureSize - _margin * 2;
		_width = Math.min(_width, 300);
		
		_imageHeight = _width/3*4;
		_height = _imageHeight + 35;
		for(var i = 0; i < _pictureSize; i ++) {
			var picture = pictureLst[i];
			
			var imgBlockDiv = document.createElement("div");
			imgBlockDiv.id = picture.id + "_image_block";
			imgBlockDiv.className = "image_block";
			imgBlockDiv.style.width = _width + "px";
			imgBlockDiv.style.height = _height + "px";
			imgBlockDiv.style.display = "none";
			
			var uploadBlock = document.createElement("div");
			uploadBlock.id = picture.id + "_upload_block";
			uploadBlock.className = "image_upload_block";
			uploadBlock.style.marginTop = "-10px";
			uploadBlock.style.marginLeft = (_width - 15) + "px";
			uploadBlock.style.visibility = "hidden";
			uploadBlock.onclick = function() {
				processing = true;
				
				var blockId = this.id;
				var pictureId = blockId.substring(0, blockId.length - 13);
				
				var uploadImage = document.getElementById(pictureId + "_image");
				if(uploadImage) {
					_uploadFile(pictureId, uploadImage.src);
				}
			}
			
			
			var imageUpload = document.createElement("div");
			imageUpload.className = "image_upload_btn";
			uploadBlock.appendChild(imageUpload);
			
			imgBlockDiv.appendChild(uploadBlock);
			
			
			var okBlock = document.createElement("div");
			okBlock.id = picture.id + "_upload_ok";
			okBlock.className = "image_upload_ok_block";
			okBlock.style.marginTop = "-10px";
			okBlock.style.marginLeft = (_width - 15) + "px";
			okBlock.style.visibility = "hidden";
			
			var imageOK = document.createElement("div");
			imageOK.className = "image_upload_ok_btn";
			okBlock.appendChild(imageOK);
			
			imgBlockDiv.appendChild(okBlock);
			
			var errorBlock = document.createElement("div");
			errorBlock.id = picture.id + "_upload_error";
			errorBlock.className = "image_upload_error_block";
			errorBlock.style.marginTop = "-10px";
			errorBlock.style.marginLeft = (_width - 15) + "px";
			errorBlock.style.visibility = "hidden";
			
			var imageError = document.createElement("div");
			imageError.className = "image_upload_error_btn";
			errorBlock.appendChild(imageError);
			
			imgBlockDiv.appendChild(errorBlock);
			
			var imgDiv = document.createElement("img");
			imgDiv.id = picture.id + "_image";
			imgDiv.className = "image_div";
			imgDiv.src = "../../js/images/bg_1.png"
			imgDiv.style.width = _width + "px";
			imgDiv.style.height = _imageHeight + "px";
			imgBlockDiv.appendChild(imgDiv);
			
			var imgLabelDiv = document.createElement("label");
			imgLabelDiv.id = picture.id + "_label";
			imgLabelDiv.className = "image_label";
			imgLabelDiv.style.width = _width + "px";
			if(_isUpload) {
				imgLabelDiv.htmlFor = picture.id;
			}
			
			imgLabelDiv.style.marginTop = (0 - _imageHeight) + "px";
			imgLabelDiv.style.height = (_height - 35) + "px";
			imgBlockDiv.appendChild(imgLabelDiv);
			
			
			var imageFile = document.createElement("input");
			imageFile.id = picture.id;
			imageFile.className = "image_file"
			imageFile.onchange = function() {
				previewImage(this);
			}
			imageFile.setAttribute("name", picture.id);
			imageFile.setAttribute("type", "file");
			imgBlockDiv.appendChild(imageFile);
			
			
			var txtDiv = document.createElement("div");
			txtDiv.className = "image_txt";
			txtDiv.innerHTML = picture.name;
			
			imgBlockDiv.appendChild(txtDiv);
			
			var idx = parseInt(i/2);
			if(isEven) {
				if(i % 2 == 0) {
					imgBlockDiv.style.left = totalWidth/2 - (_width * (idx + 1) + idx * _margin + _margin /2);
					imgBlockDiv.style.top = (totalHeight - _height)/2;
				} else {
					imgBlockDiv.style.left = totalWidth/2 + (_width * idx + idx * _margin + _margin /2);
					imgBlockDiv.style.top = (totalHeight - _height)/2;
				}
				body.appendChild(imgBlockDiv);
			} else {
				if(i % 2 == 0) {
					imgBlockDiv.style.left = totalWidth/2 - idx* _width - idx* _margin - _width/2;
					imgBlockDiv.style.top = (totalHeight - _height)/2;
				} else {
					imgBlockDiv.style.left = totalWidth/2 + idx* _width + (idx + 1) * _margin + _width/2;
					imgBlockDiv.style.top = (totalHeight - _height)/2;
				}
				body.appendChild(imgBlockDiv);
			}
			
			var uploadProgressBlock = document.createElement("div");
			uploadProgressBlock.id = picture.id + "_progress";
			uploadProgressBlock.className = "image_upload_progress_block";
			uploadProgressBlock.style.height = imgDiv.offsetHeight;
			uploadProgressBlock.style.visibility = "hidden";
			imgBlockDiv.appendChild(uploadProgressBlock);
		}
	}
	
	this.uploadError = function(pictureId) {
		processing = false;
		
		var uploadError = document.getElementById(pictureId + "_upload_error");
		uploadError.style.visibility = "visible";
	}
	
	this.uploadSuccess = function(pictureId) {
		processing = false;
		
		var imageUploadOKBtn = document.getElementById(pictureId + "_upload_ok");
		imageUploadOKBtn.style.visibility = "visible";
	}
	
	this.getEntityId = function() {
		return _entityId;
	}
	
	
	var hidePictureLst = function() {
		if(processing) {
			alert("文件正在处理中，无法关闭，请稍后");
		} else {
			document.getElementById(_id + "_mask").style.display = "none";
		
			for(var i = 0; i < _pictureLst.length; i ++) {
				var picture = _pictureLst[i];
			
				var imgBlockDiv = document.getElementById(picture.id + "_image_block");
				imgBlockDiv.style.display = "none";
			}
		}
	}
	
	
	var previewImage = function(file) {
		var MAXWIDTH = 40;
		var MAXHEIGHT = 40;
		var div = document.getElementById('preview');
		if (file.files && file.files[0]) {
			var img = document.getElementById(file.id + "_image");
			img.onload = function () {
				//var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
				//img.style.marginTop = rect.top + 'px';
			}
			
			var imageUploadBtn = document.getElementById(file.id + "_upload_block");
			var uploadError = document.getElementById(file.id + "_upload_error");
			
			var reader = new FileReader();
			reader.readAsDataURL(file.files[0]);
			
			reader.onload = function (evt) {
				img.src = this.result;
				imageUploadBtn.style.visibility = "visible";
				uploadError.style.visibility = "hidden";
			}
		}
	}

	
	var clacImgZoomParam = function(maxWidth, maxHeight, width, height) {
		var param = { top: 0, left: 0, width: width, height: height };
		if (width > maxWidth || height > maxHeight) {
			rateWidth = width / maxWidth;
			rateHeight = height / maxHeight;
			if (rateWidth > rateHeight) {
				param.width = maxWidth;
				param.height = Math.round(height / rateWidth);
			} else {
				param.width = Math.round(width / rateHeight);
				param.height = maxHeight;
			}
		}
		param.left = Math.round((maxWidth - param.width) / 2);
		param.top = Math.round((maxHeight - param.height) / 2);
		return param;
	}
	
	
}