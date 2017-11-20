var app = getApp();
/**
 * 请求
 */
function http(url, action, obj) {
	wx.request({
		url: app.globalData.dataUrl + url
		, header: {
			"content-type": "json"
		},
		success: function (res) {
			// console.log(res)
			if (res.data.error == 0) {

				if (obj) {
					action(res.data.data, obj);
				} else {
					action(res.data.data);
				}
			}
		}, fail: function () {
			wx.showToast({
				title: '连接超时了',
			})
		}
	})
}
/**
 * 计算乘积的总和
 */
function getTotal(num1, num2) {
	var temp = 0;
	try {
		temp += num1.toString().split(".")[1].length;
	} catch (e) { }
	try {
		temp += num2.toString().split(".")[1].length;
	} catch (e) { }
	var num = Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, temp);
	return num;
}
/**
 * 计算相加的总和
 */
function getAdd(num1, num2) {
	var temp1 = 0, temp2 = 0;
	try { temp1 = num1.toString().split(".")[1].length } catch (e) { }
	try { temp2 = num2.toString().split(".")[1].length } catch (e) { }
	var m = Math.pow(10, Math.max(temp1, temp2))
	return (num1 * m + num2 * m) / m
}
module.exports = {
	http: http,
	getTotal: getTotal,
	getAdd: getAdd
}
