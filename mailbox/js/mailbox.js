(function($){

	var defaults = {
			'container' : '#wrap',//容器id;
			'width':'400px',//设置容器宽度
			'height':'30px',//设置容器高度
			'background':'#fff',//背景色
			'border':'1px solid #aaa',//输入框边框
	};


	var opts = {},
	SP=$.fn.mailbox = function(options){
		opts = $.extend({}, defaults , options||{});
		$container=$(opts.container);		
		return this.each(function(index, el) {
			initPagination();
			inputChange();
		});
	}
//-----------------------初始化分页等参数------------------------------------------------------------
	function initPagination(){
		//设置容器，输入框的宽度，高度保持一致。
		$container.css({'width':opts.width,'height':opts.height,'background':opts.background,'border':opts.border});
		var $box=$('<div class="spans"></div><div class="inputbox"><input type="text" style="width:100%;border:none" /></div>');
		$box.appendTo($container);
		$box.css({'height':opts.height,'border':'none','display':'inline','line-height':opts.height});
	}


//输入框内容改变事件
	function inputChange(){
		function remove(){
			$(this).parent('div').remove();
		}
		$container.find('input').change(function(e){
			var $this_=$(this);
			var text=$this_.val();
			var spans="";
			if(/;/.test(text) && text.length>1){
				var res=text.split(';');//分号;分组
				for(var i=0;i<res.length-1;i++){
					if(res[i]!=""){
						spans+='<div style="display:inline;font-size:12px;border:1px solid #000;border-radius:3px;">'+res[i]+'<span onclick="$(this).parent("div").remove();">x<span></div>'	
					}
				}
				$(spans).prependTo($container.find('.spans'));
			}
		})

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
})(jQuery);