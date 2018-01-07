function JMonthlyCalendar(datas) {
	var _id = datas.id;
	var _finishFunction;
	var _width = 550;
	
	var _year;
	var _selectedMonth;
	
	var calendar = this;

	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;

	var height = 300;

	var left = (totalWidth - _width)/2;
	var top = (totalHeight - height)/2;

	var body = document.body;

	var formMask = document.createElement("div");
	formMask.className = "form_mask";
	formMask.style.width = totalWidth;
	formMask.id = _id + "_mask";
	formMask.style.height = totalHeight;
	formMask.style.left = 0;
	formMask.style.top = 0;
	formMask.style.zIndex = 4000;
	formMask.style.display = "none";

	body.appendChild(formMask);

	var baseBlock = document.createElement("div");

	baseBlock.className = "calendar_blcok";
	baseBlock.style.left = left;
	baseBlock.style.top = top;
	baseBlock.style.zIndex = 4001;
	baseBlock.style.display = "none";
	baseBlock.id = _id;

	body.appendChild(baseBlock);
	
	var closeBtnBlock = document.createElement("div");
	closeBtnBlock.className = "calendar_block";
	closeBtnBlock.style.top = top - 11;
	closeBtnBlock.style.left = left + _width - 11;
	baseBlock.appendChild(closeBtnBlock);
	
	var closeBtn = document.createElement("div");
	closeBtn.className = "form_close";
	closeBtnBlock.appendChild(closeBtn);
	closeBtnBlock.onclick = function() {
		hideCalendar();
	};
	
	this.showCurrentCalendar = function(calendarDataInfo) {
		document.getElementById(_id + "_mask").style.display = "inline";
		document.getElementById(_id).style.display = "inline";
		
		_finishFunction = calendarDataInfo.finishFunction;
		if(calendarDataInfo.selectedDate) {
			calendarDataInfo.selectedDate.replace(/-/g,"/");
			
			drawCalendar(selectedDate.getFullYear(), currMonth);
		} else {
			var myDate = new Date();
			var month = myDate.getMonth() + 1;
			
			drawCalendar(myDate.getFullYear(), month);
		}
	}
	
	
	var drawCalendar = function(year, selectedMonth) {
		clearCalendar();
		
		_year = year;
		_selectedMonth = selectedMonth;
		
		var baseBlock = document.getElementById(_id);
		
		var preYearInfoDiv = document.createElement("div");
		preYearInfoDiv.className = "calendar_pre_year";
		preYearInfoDiv.innerHTML = _year - 1;
		preYearInfoDiv.onclick = function() {
			changeCalendarYear(_year - 1);
		}
		baseBlock.appendChild(preYearInfoDiv);
		
		var nxtYearInfoDiv = document.createElement("div");
		nxtYearInfoDiv.className = "calendar_nxt_year";
		nxtYearInfoDiv.innerHTML = _year + 1;
		nxtYearInfoDiv.onclick = function() {
			changeCalendarYear(_year + 1);
		}
		baseBlock.appendChild(nxtYearInfoDiv);
		
		
		var yearInfoDiv = document.createElement("div");
		yearInfoDiv.className = "calendar_current_year";
		yearInfoDiv.innerHTML = _year;
		baseBlock.appendChild(yearInfoDiv);
		
		var calendarDayBlockDiv = document.createElement("div");
		calendarDayBlockDiv.className = "calendar_monthly_day_block";

		baseBlock.appendChild(calendarDayBlockDiv);

		for(var i = 1; i <= 12; i ++) {
			var dayDiv = document.createElement("div");
			dayDiv.className = "calendar_monthly_div";
			dayDiv.value = i;

			dayDiv.innerHTML = getMonthInfo(i);
				if(_selectedMonth == i) {
					dayDiv.className = "calendar_monthly_div_current";
				}
				dayDiv.onclick = function() {
					_finishFunction(getDateInfo(this.value));
					hideCalendar();
				}
			
			calendarDayBlockDiv.appendChild(dayDiv);
		}
	}
	
	var getDateInfo = function(month) {
		if(month < 10) {
			return _year + "-0" + month;
		}
		return _year + "-" + month;
	}
	
	var hideCalendar = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}

	var changeCalendarYear = function(year) {
		clearCalendar();
		drawCalendar(year, _selectedMonth);
	}
	
	var clearCalendar = function() {
		var baseBlock = document.getElementById(_id);
		baseBlock.innerHTML = "";
		
		var closeBtnBlock = document.createElement("div");
		closeBtnBlock.className = "calendar_block";
		closeBtnBlock.style.top = top - 11;
		closeBtnBlock.style.left = left + _width - 11;
		baseBlock.appendChild(closeBtnBlock);
		
		var closeBtn = document.createElement("div");
		closeBtn.className = "form_close";
		closeBtnBlock.appendChild(closeBtn);
		closeBtnBlock.onclick = function() {
			hideCalendar();
		};
	}
	
	var getMonthInfo = function(month) {
		switch(month) {
			case 1:
			return "一月";
			case 2:
			return "二月";
			case 3:
			return "三月";
			case 4:
			return "四月";
			case 5:
			return "五月";
			case 6:
			return "六月";
			case 7:
			return "七月";
			case 8:
			return "八月";
			case 9:
			return "九月";
			case 10:
			return "十月";
			case 11:
			return "十一月";
			case 12:
			return "十二月";
		}
	}
}