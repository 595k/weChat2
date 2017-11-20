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
		//初期化，每次显示页面都同步缓存
		this.setData({
			cartList:[],
			total:0
		})
		var data = wx.getStorageInfoSync();
		//获取其中key是数字的缓存
		for (var ind in data.keys) {
			if (!isNaN(data.keys[ind])) {
				var storage = wx.getStorageSync(data.keys[ind]);
				var temp = [];
				temp = {
					id: storage.id,
					title: storage.title.length > 7 ? storage.title.substring(0, 7) + "..." : storage.title,
					logo: storage.logo,
					isSelect: false,
					buyCount: 1
				};
				this.data.cartList = this.data.cartList.concat(temp);
			}
		}
		
		this.setData({
			cartList: this.data.cartList
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
				[key2]: false
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
	wePay: function () {
		wx: wx.navigateTo({
			url: '../wePay/wePay'
		})
	}
})