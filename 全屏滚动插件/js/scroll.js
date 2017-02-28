(function($){

	var defaults = {
		'container' : '#container',//容器
		'page' : '.page',//子容器
		'easing' : 'ease',//特效方式，ease-in,ease-out,linear
		'duration' : 1000,//每次动画执行的时间
		'pagination' : true,//是否显示分页
		'loop' : false,//是否循环
		'keyboard' : true,//是否支持键盘
		'direction' : 'vertical',//滑动的方向 horizontal,vertical,
		'onpageSwitch' : function(pagenum){}
	};
	var win = $(window),
		$container,$pages,$win_height;

	var opts = {},
		canScroll = true;
	var count=0; //初始页面0
	var pageArray=[];//各个页面的位置
	var speed;//页面切换速度
	var isFinished=true;//判断切换动画是否完成
	var SP=$.fn.switchPage = function(options){
		opts = $.extend({}, defaults , options||{});
		$container=$(opts.container);		
		$pages=$container.find(opts.page);
		return this.each(function(index, el) {
			initPagination();
			mouseWheel();
			keyDown();
		});
	}
//-----------------------初始化分页等参数------------------------------------------------------------
	function initPagination(){
		//设置每张页面高度
		$win_height=win.height();
		$pages.height($win_height);
		//记录每张页面的顶部位置
		$pages.each(function(index, el) {
			pageArray.push($(this).position().top);
		});
		speed=Math.floor($(".page").height()/100);//页面滚动速度
		if(!+[1,]){speed=Math.floor($(".page").height()/30);}//判断是否ie(ie11不支持)
		$container.css('overflow-y','hidden');//父容器设置overflow
		scrollPage(0,-speed);
		//------底部控制栏--------------------------------------
		var $controllerNav=$("<nav class='controller-nav'></nav>");
		$controllerNav.appendTo($container);
		//页码
		var $p=$("<p class='pagination'><span class='count'>"+(count+1)+"</span>/"+pageArray.length+"页</p>");
		$p.appendTo($controllerNav);
		//小圆圈
		var span=""
		for(var i=0;i<pageArray.length;i++){
			span+="<span class='controller-unit'></span>"
		}
		var $controllerUnit=$(span);
		$controllerUnit.appendTo($controllerNav);
		$('.controller-unit').eq(0).addClass("controller-unit-hover");
		//控制按钮绑定事件
		$('.controller-unit').each(function(index,ele){
			$(ele).click(function(e){
				if(count===index){return false;}
				document.documentElement.scrollTop=document.body.scrollTop=pageArray[index];
				count=index;
				pageChange();
			})
		})
	}


  //--------------------------页面滚动--------------------------------------------------------

function scrollPage(destination,speed){
	isFinished=false;
/*	if(speed>0){*/	
		var timer=setTimeout(function(){

			var osTop=document.documentElement.scrollTop||document.body.scrollTop;
				//console.log('ostop'+osTop)
				if(Math.abs(osTop-destination)>Math.abs(speed)){
					speed=speed+speed*0.01;
					document.documentElement.scrollTop=document.body.scrollTop=osTop+speed;
					setTimeout(arguments.callee,3)	
				}else{
					document.documentElement.scrollTop=document.body.scrollTop=destination;
					isFinished=true;
				}

		 },10);

}
//----------------------------页码以及控制按钮相关函数-------------------------------------
function pageChange(){
	$(".count").html(count+1);
	$('.controller-unit').removeClass("controller-unit-hover");
	$('.controller-unit').eq(count).addClass("controller-unit-hover");	
}
//--------------------鼠标滑动事件-----------------------------------------------------------
function mouseWheel(){

	var MouseWheelHandler=function(e){

					e.preventDefault();
					var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;//火狐下比较小,chrome比较大				
					var move=1;
					var delta=value;			
						if (delta<-move && isFinished) {
							moveDown();
						}else if(delta>move && isFinished) {
							moveUp();
						}
				}

	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
}
	function moveDown(){
		count+=1;
		if(count>=pageArray.length){
			count=0;
			document.documentElement.scrollTop=document.body.scrollTop=0;
			$(".count").html(count+1);	
		}else{
			scrollPage(pageArray[count],speed);
		}		
		pageChange();
	}
	function moveUp(){
		count-=1;				
		if(count<0){
			count=pageArray.length-1;
			document.documentElement.scrollTop=document.body.scrollTop=pageArray[count];
			$(".count").html(count+1);	
			
		}else{
			scrollPage(pageArray[count],-speed);	
		}
		pageChange();		
	}

//--------------------键盘滚动事件-------------------------------------
	//绑定键盘事件
	function keyDown(){
		var keydownId;
		win.keydown(function(e){
			clearTimeout(keydownId);
			keydownId = setTimeout(function(){
				var keyCode = e.keyCode;
				if(keyCode == 37||keyCode == 38){
					moveUp();
				}else if(keyCode == 39||keyCode == 40){
					moveDown();
				}
			},100);
		});
	}

//----------------------手机端触摸------------------------------------------------------
	function touchmove(){

	}






/*		$('body').css({
				"transition":"all 3000ms ease",
				"transform":"translate(0px,-966px)"
			});*/

})(jQuery);