### 使用方法

```
	<div id="Calendar"></div> //日历容器

	<script language="JavaScript">
		(function () {
			var cale = new Calendar("Calendar", {
				Year: 2020, //显示年
				Month: 03, //显示月
				Day: 29,
				dayClick: function (e) {
					console.log(e)
				},
				onFinish: function () {

				}

			});


		})()

	</script>

```