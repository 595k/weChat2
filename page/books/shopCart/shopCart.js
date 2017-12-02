// pages/application/books/shopCart/shopCart.js
var util = require("../../../utils/util.js");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		selectAll: false,
		selectAllText: "全选",
		cartList: [],
		total: 0
	},
	onShow: function () {

		var data = wx.getStorageInfoSync();
		//获取其中key是数字的缓存
		var arr = [];
		for (var ind in data.keys) {
			if (!isNaN(data.keys[ind])) {
				var storage = wx.getStorageSync(data.keys[ind]);
				console.log(typeof (this.data.cartList[ind]))
				var temp = [];
				temp = {
					id: storage.id,
					title: storage.title.length > 7 ? storage.title.substring(0, 7) + "..." : storage.title,
					logo: storage.logo,
					isSelect: typeof (this.data.cartList[ind]) == "object" ? this.data.cartList[ind].isSelect : false,
					buyCount: typeof (this.data.cartList[ind]) == "object" ? this.data.cartList[ind].buyCount : 1
				};
				arr = arr.concat(temp);
			}
		}

		this.setData({
			cartList: arr
		})

	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},
	/**
	 * 详细信息
	 */
	bookDetail: function (event) {
		// console.log(event)
		var id = event.currentTarget.dataset.id

		wx.navigateTo({
			url: '../bookDetail/bookDetail?id=' + id,
		})
	},
	/**
	 * 是否全选
	 */
	selectAll: function () {
		var cartList = this.data.cartList;
		if (this.data.selectAll) {
			this.setData({
				selectAll: false,
				selectAllText: "全选"
			})
			for (var ind in cartList) {
				var key = "cartList[" + ind + "].isSelect"
				this.setData({
					[key]: false
				})
			}
		} else {
			this.setData({
				selectAll: true,
				selectAllText: "全取消"
			})
			for (var ind in cartList) {
				var key = "cartList[" + ind + "].isSelect"
				this.setData({
					[key]: true
				})
			}
		}
		this.total()
	},
	/**
	 * 是否选择
	 */
	isSelect: function (event) {
		var index = event.currentTarget.dataset.id;
		var cart = this.data.cartList[index];
		var key2 = "cartList[" + index + "].isSelect";
		// console.log(key2)
		if (cart.isSelect) {
			this.setData({
				[key2]: false,
				selectAll: false,
				selectAllText: "全选"
			})
		} else {
			this.setData({
				[key2]: true
			})
		}
		this.total();
	}
	/**
	 * 减一
	 */
	, minCount: function (event) {
		var index = event.currentTarget.dataset.id;
		var cart = this.data.cartList[index]
		if (cart.buyCount <= 1) { return }
		var key = "cartList[" + index + "].buyCount";

		this.setData({
			[key]: Number(cart.buyCount) - 1
		})
		if (cart.isSelect) {
			this.total()
		}
	}
	/**
	 * 加一
	 */
	, maxCount: function (event) {
		var index = event.currentTarget.dataset.id;
		var cart = this.data.cartList[index]
		if (cart.buyCount >= 10) { return }
		var key = "cartList[" + index + "].buyCount";

		this.setData({
			[key]: Number(cart.buyCount) + 1
		})
		if (cart.isSelect) {
			this.total()
		}
	},
	/**
	 * 计算总价格
	 */
	total: function () {
		var money = 0;
		var cartList = this.data.cartList;
		for (var ind in cartList) {
			var str = cartList[ind];
			if (str.isSelect) {
				var m = util.getTotal(str.buyCount, 0.1)
				money = util.getAdd(money, m)
			}
		}
		this.setData({
			total: money
		})
	},
	/**
	 * 购买/支付
	 */
	wePay: function () {
		wx: wx.navigateTo({
			url: '../wePay/wePay'
		})
	},
	/**
	 * 删除商品
	 */
	delete: function () {
		var cartList = this.data.cartList;
		var del = false;//没有要删除的
		// var temp = cartList;
		for (var ind = cartList.length - 1; ind >= 0; ind--) {
			//判断是否被选中
			if (cartList[ind].isSelect) {
				wx.removeStorageSync(cartList[ind].id.toString());
				cartList.splice(ind, 1);
				this.data.cartList = cartList;
				// temp[ind] = false;
				del = true;
			}
		}

		if (!del) {
			wx.showToast({
				title: '没有选中',
			})
		} else {
			this.setData({
				cartList: cartList,
				total: 0,
				selectAll: false,
				selectAllText: "全选"
			})
		}
	}
})