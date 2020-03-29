
$$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

class Calendar {
    constructor(container, options) {
        this.initialize(container, options)
    }
    //初始化
    initialize(container, options) {
        this.Container = $$(container); //容器(table结构)
        this.Days = []; //日期对象列表
        this.SetOptions(options);
        this.Year = this.options.Year
        this.Month = this.options.Month
        this.Day = this.options.Day
        this.onFinish = this.options.onFinish
        this.dayClick = this.options.dayClick
        this.templateHtml()
        this.Container = $$('idCalendar'); //容器(table结构)
        this.Draw();
    }
    //设置属性
    SetOptions(options) {
        this.options = { //默认值
            Year: new Date().getFullYear(), //显示年
            Month: new Date().getMonth() + 1, //显示月
            Day: null,
            onFinish: function () { }, //日历画完后触发
            ...options || {}
        };
    }
    //上一个月
    PreMonth() {
        //先取得上一个月的日期对象
        var d = new Date(this.Year, this.Month - 2, 1);
        //再设置属性
        this.Year = d.getFullYear();
        this.Month = d.getMonth() + 1;
        //重新画日历
        this.Draw();
    }
    NextMonth() {
        var d = new Date(this.Year, this.Month, 1);
        this.Year = d.getFullYear();
        this.Month = d.getMonth() + 1;
        this.Draw();
    }
    templateHtml() {
        this.Container.innerHTML = ` <div class="Calendar">
        <div id="toyear" class="flex flex-pack-center">
            <div id="idCalendarPre">&lt;</div>
            <div class="year-month">
                <span id="idCalendarYear"></span>年<span id="idCalendarMonth"></span>月
            </div>
            <div id="idCalendarNext">&gt;</div>
        </div>
    
        <table border="1px" cellpadding="0" cellspacing="0">
            <thead>
                <tr class="tou">
                    <td>日</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                </tr>
            </thead>
            <tbody id="idCalendar">
            </tbody>
        </table>
    </div>`;

    }

    IsToday(day) {
        var curentDate = new Date()
        var curentYear = curentDate.getFullYear()
        var curentMonth = curentDate.getMonth() + 1
        var curentDay = curentDate.getDate()
        if (curentYear == this.Year && curentMonth == this.Month && curentDay == day) {
            return true
        }

    }
    //画日历
    Draw() {
        //签到日期
        var day = this.Day;
        //日期列表
        var arr = [];
        //用当月第一天在一周中的日期值作为当月离第一天的天数
        for (var i = 1, firstDay = new Date(this.Year, this.Month - 1, 1).getDay(); i <= firstDay; i++) {
            arr.push("&nbsp;");
        }
        //用当月最后一天在一个月中的日期值作为当月的天数
        for (var i = 1, monthDay = new Date(this.Year, this.Month, 0).getDate(); i <= monthDay; i++) {
            arr.push(i);
        }
        $$('idCalendarYear').innerHTML = this.Year
        $$('idCalendarMonth').innerHTML = this.Month
        var frag = document.createDocumentFragment();
        this.Days = [];
        var _this = this
        while (arr.length > 0) {
            //每个星期插入一个tr
            var row = document.createElement("tr");
            //每个星期有7天
            for (var i = 1; i <= 7; i++) {
                var cell = document.createElement("td");
                cell.innerHTML = "&nbsp;";
                cell.onclick = function (e) {
                    var value = e.target.innerText
                    Number(value) && _this.options.dayClick(`${_this.Year}-${_this.Month}-${value}`)
                }

                if (arr.length > 0) {
                    var d = arr.shift();
                    cell.innerHTML = "<span>" + d + "</span>";
                    if (d > 0 && day.length) {
                        for (var ii = 0; ii < day.length; ii++) {
                            this.Days[d] = cell;
                        }
                    }
                }
                if (this.IsToday(d)) {
                    cell.className = "onToday"
                }
                row.appendChild(cell);
            }
            frag.appendChild(row);
        }

        //先清空内容再插入(ie的table不能用innerHTML)
        while (this.Container.hasChildNodes()) {
            this.Container.removeChild(this.Container.firstChild)
        }
        this.Container.appendChild(frag)
        this.onFinish()
        this.rigistEvent()
    }
    rigistEvent() {
        var _this = this
        var preBtn = $$('idCalendarPre')
        var nextBtn = $$('idCalendarNext')
        this.preOnClick = this.options.preOnClick
        this.nextOnClick = this.options.nextOnClick
        preBtn.onclick = function () {
            _this.PreMonth()
        }
        nextBtn.onclick = function () {
            _this.NextMonth()
        }

    }

}

















