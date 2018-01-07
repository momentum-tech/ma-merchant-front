function JCalendar(datas) {
	var _id = datas.id;
	var _finishFunction;
	var _width = 550;
	
	var _year;
	var _month;
	
	var calendar = this;

	var totalHeight = document.body.clientHeight;
	var totalWidth = document.body.clientWidth;

	var height = 500;

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
			var selectedDate = new Date(calendarDataInfo.selectedDate.replace(/-/g,"/"));
			
			var currDay = selectedDate.getDate();
			var month = selectedDate.getMonth() + 1;
			
			drawCalendar(selectedDate.getFullYear(), month, currDay, currDay);
		} else {
			var myDate = new Date();
			var currDay = myDate.getDate();
			var month = myDate.getMonth() + 1;
			
			drawCalendar(myDate.getFullYear(), month, currDay, currDay);
		}
	}
	
	
	var drawCalendar = function(year, month, currDay, selectedDay) {
		clearCalendar();
		
		_year = year;
		_month = month;
		_currDay = currDay;
		_selectedDay = selectedDay;
		
		var baseBlock = document.getElementById(_id);
		
		var baseMonthInfoDiv = document.createElement("div");
		baseMonthInfoDiv.className = "calendar_month_block";
		baseBlock.appendChild(baseMonthInfoDiv);
		
		var preMonthInfoDiv = document.createElement("div");
		preMonthInfoDiv.className = "calendar_pre_month";
		preMonthInfoDiv.innerHTML = getMonthInfo(getCircleMonth(_month - 1));
		preMonthInfoDiv.onclick = function() {
			changeCalendarMonth(getCircleMonth(_month - 1));
		}
		baseMonthInfoDiv.appendChild(preMonthInfoDiv);
		
		var nxtMonthInfoDiv = document.createElement("div");
		nxtMonthInfoDiv.className = "calendar_nxt_month";
		nxtMonthInfoDiv.innerHTML = getMonthInfo(getCircleMonth(_month + 1));
		nxtMonthInfoDiv.onclick = function() {
			changeCalendarMonth(getCircleMonth(_month + 1));
		}
		baseMonthInfoDiv.appendChild(nxtMonthInfoDiv);
		
		var monthInfoDiv = document.createElement("div");
		monthInfoDiv.className = "calendar_current_month";
		monthInfoDiv.innerHTML = getMonthInfo(_month);
		baseMonthInfoDiv.appendChild(monthInfoDiv);
		
		
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
		calendarDayBlockDiv.className = "calendar_day_block";

		baseBlock.appendChild(calendarDayBlockDiv);

		var weekLabelDiv = document.createElement("div");
		weekLabelDiv.className = "calendar_week_first"
		weekLabelDiv.innerHTML = getWeekInfo(7);
		calendarDayBlockDiv.appendChild(weekLabelDiv);

		for(var i = 1; i < 7; i ++) {
			var weekLabelDiv = document.createElement("div");
			if(i == 0) {
				weekLabelDiv.className = "calendar_week_first"
			} else {
				weekLabelDiv.className = "calendar_week"
			}
			weekLabelDiv.innerHTML = getWeekInfo(i);

			calendarDayBlockDiv.appendChild(weekLabelDiv);
		}

		var monthStartWeek = getFirstDayWeekInfo(_year, _month);
		
		var daysLst = new Array();
		for(var i = 0; i < monthStartWeek; i ++) {
			daysLst.push({type:"occupation"});
		}
		
		var days = getDaysOfMonth(_year, _month);
		for(var i = 1; i <= days; i ++) {
			if(_currDay == i) {
				daysLst.push({type:"real", value: i, isCurrent:true});
			} else {
				daysLst.push({type:"real", value: i, isCurrent:false});
			}
		}
		
		var lastOccupyNum =  7 - (daysLst.length%7 == 0?7:(daysLst.length%7));
		
		for(var i = 0; i < lastOccupyNum; i ++) {
			daysLst.push({type:"occupation"});
		}
		
		for(var i = 0; i < daysLst.length; i ++) {
			var dayDiv = document.createElement("div");
			dayDiv.className = "calendar_day_div";
			
			var record = daysLst[i];

			if(record.type == "real") {
				dayDiv.innerHTML = record.value;
				if(record.isCurrent) {
					dayDiv.className = "calendar_day_div_current";
				}
				dayDiv.onclick = function() {
					_finishFunction(getDateInfo(this.innerHTML));
					hideCalendar();
				}
			} else if(record.type == "occupation") {
				dayDiv.className = "calendar_day_occupy_div";
			}
			
			calendarDayBlockDiv.appendChild(dayDiv);
		}
	}
	
	var getDateInfo = function(day) {
		var tmpDay = new Number(day);
		var tmpMonth = new Number(_month);
		
		if(tmpMonth < 10) {
			tmpMonth = "0" + tmpMonth;
		}
		if(tmpDay < 10) {
			return _year + "-" + tmpMonth + "-0" + day;
		}
		return _year + "-" + tmpMonth + "-" + day;
	}

	var hideCalendar = function() {
		document.getElementById(_id + "_mask").style.display = "none";
		document.getElementById(_id).style.display = "none";
	}

	var changeCalendarMonth = function(month) {
		clearCalendar();
		drawCalendar(_year, month, _currDay, _selectedDay);
	}
	var changeCalendarYear = function(year) {
		clearCalendar();
		drawCalendar(year, _month, _currDay, _selectedDay);
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

	var getDaysOfMonth = function(year, month) {
		var _year = new Number(year);
		var _month = new Number(month);
		
		var days = 0;

		if (_month == 1 || _month == 3 || _month == 5 || _month == 7 || _month == 8 || _month == 10 || _month == 12) {
			days = 31;
		} else if (_month == 4 || _month == 6 || _month == 9 || _month == 11) {
			days = 30;
		} else {
			if ((_year % 4 == 0 && _year % 100 != 0) || _year % 400 == 0) {
				days = 29;
			} else {
				days = 28;
			}
		}
		return days;
	}


	var getCircleMonth = function(idx) {
		if(idx == 0) {
			return 12;
		} else if(idx == 13) {
			return 1;
		}
		return idx;
	}

	var getFirstDayWeekInfo = function(year, month) {
		var _fullYear = new String(year);
		var _month = new Number(month);
		var _day = 1;

		var century = new Number(_fullYear.substring(0, 2));
		var year = new Number(_fullYear.substring(2, year.length));
		return (year + parseInt(year/4) + parseInt(century/4) - (2 * century) + parseInt(26 * (_month + 1)/10) + _day - 1) % 7
	}


	var getWeekInfo = function(week) {
		switch(week) {
			case 1:
			return "周一";
			case 2:
			return "周二";
			case 3:
			return "周三";
			case 4:
			return "周四";
			case 5:
			return "周五";
			case 6:
			return "周六";
			case 7:
			return "周日";
		}
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