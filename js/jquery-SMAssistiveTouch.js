/*
	author:SM
	e-mail:sm0210@qq.com
	desc:SMAssistiveTouch辅助功能按钮插件JS
	version:SMAssistiveTouch辅助功能按钮插件 0.1
*/
(function($){
		 $.fn.initSMAssistiveTouch=function(options){
			//参数
			var s = $.extend({}, defaults, options || {});
			//ID
			var SMAssistiveTouchId = 'SMAssistiveTouchId-';
			
			//渲染SMAssistiveTouch辅助功能按钮
			s.newSMAssistiveTouch = function(){
				//SMAssistiveTouchId
				SMAssistiveTouchId = SMAssistiveTouchId + s.createRandom(2,0,50);
				//实例化SMAssistiveTouch辅助功能按钮
				var str='<div id="'+SMAssistiveTouchId+'"  class="assistiveTouch"></div>';
				$("body").append(str);
				//获取SMAssistiveTouch辅助功能按钮对象
				this.SMAssistiveTouch = $("#"+SMAssistiveTouchId);
				//设置SMAssistiveTouch属性
				s.initDomAttribute();
				//监听事件
				s.initEvents();
			},
			/**
				设置SMAssistiveTouch属性
			*/
			s.initDomAttribute =  function(){
				//Touch元素;
				var touch = this.SMAssistiveTouch;
				//高度
				var height=s.width;
				//设置样式
				touch.css({
					"top":s.x+"px",
					"right":s.y+"px",
					"width":s.width+"px",
					"height":height+"px"
				});
			},
			/*
				监听事件
			*/
			s.initEvents = function(){
				//注册事件
				//SMAssistiveTouch对象
				var touch=this.SMAssistiveTouch;
				//监听touchstart事件
				touch.on('touchstart',s.onTouchstart);
				//监听touchmove事件
				touch.on('touchmove',s.onTouchMove);
				//监听touchend事件
				touch.on('touchend',s.onTouchend);
				//监听click事件
				touch.on("click",s.onTouchClick);	
			},
			/**
				onTouchstart事件
			*/
			s.onTouchstart = function(e){
				
			},
			/**
				onTouchMove事件
			*/
			s.onTouchMove = function(e){
				//阻止事件冒泡
				e.preventDefault();
				e.stopPropagation();
				
				//设置移动
				//SMAssistiveTouch对象
				var touch = s.SMAssistiveTouch;
				//x
				var newX=e.originalEvent.touches[0].clientX;
				//y
				var newY=e.originalEvent.touches[0].clientY;  
				//屏幕宽
				var screenW=$(window).width();
				//屏幕高
				var screenH=$(window).height();
				
				//判断是否超出屏幕
				if((newX+this.width)>screenW){
					newX=screenW-this.width;
				}
			
				if((newY+this.width)>screenH){ 
					newY=screenH-this.width;
				}
				
				if(newX<0) newX=0;
				if(newY<0) newY=0;
				
				//重新设置SMAssistiveTouch位置
				touch.css({
					"top":newY+"px",
					"left":newX+"px"
				});
				
			},
			/**
				onTouchend事件
			*/
			s.onTouchend = function(e){
				
			},
			/**
				onTouchClick 事件
			*/
			s.onTouchClick = function(e){
				//抛出点击事件
				if(typeof s.onClick === "function") {
					//抛出事件
					s.onClick.call(this);
				}
			},
			/**
				随机产生一个数
				num 要产生多少个随机数
				from 产生随机数的最小值
				to 产生随机数的最大值
			*/
			s.createRandom = function(num , from , to){
				var arr=[];
				var json={};
				while(arr.length<num)
				{
					//产生单个随机数
					var ranNum=Math.ceil(Math.random()*(to-from))+from;
					//通过判断json对象的索引值是否存在 来标记 是否重复
					if(!json[ranNum])
					{
						json[ranNum]=1;
						arr.push(ranNum);
					}
				}
				return arr.join('');
			},
			//提供方法，可扩展
			
			//渲染
			s.newSMAssistiveTouch();
			return s;
		 };	
		//初始化参
		var defaults ={
			//x坐标
			x:50,
			//y坐标
			y:50,
			//默认宽度
			width: 50
		};
		
})(jQuery);
