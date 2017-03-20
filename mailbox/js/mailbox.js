var Mailbox=
(function($){

	var defaults = {
			'container' : '#wrap',//容器id;
			'width':'400px',//设置容器宽度
			'height':'30px',//设置容器高度
			'background':'transparent',//背景色
			'line-height':'30px',
			//已输入内容tip小框样式和input输入框样式
			'validation':function(str){
				var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
				return reg.test(str);
			},
			'style':{
				'height':'12px',//设置div.tip高度
				//'background':'#fff',//div.tip背景色
				'font-size':'12px',
				'line-height':'12px',
				'input_width':'100px',//输入框默认宽度		
			},
			'info':'提示信息,比如输入邮箱'

	};


	var Mailbox = function(options){
		this.flag=false;//标志是否可以删除tip
		this.opts = $.extend({}, defaults , options||{});
		this.opts.style=$.extend({},defaults.style,options.style||{});
		this.$container=$(this.opts.container);
			this.initPagination();
			this.inputChange();
			this.keyDown();				

	}
	Mailbox.prototype.getValue=function(){
		var value="";
		this.$container.find('.tip .message').each(function(index,ele){
			value=value+$(ele).html()+';';
		})
		return value;
	}
	Mailbox.prototype.initPagination=initPagination;
	Mailbox.prototype.inputChange=inputChange;
	Mailbox.prototype.keyDown=keyDown;
	return Mailbox;
//-----------------------初始化分页等参数------------------------------------------------------------
	function initPagination(){
		var this_=this;//绑定原型对象this
		//设置容器，输入框的宽度，高度保持一致。
		this_.$container.css({'width':this_.opts.width,'height':this_.opts.height,'background':this_.opts.background,'line-height':this_.opts['line-height']});
		var $box=$('<div class=" added"></div><div class="inputbox"><input type="text" style="border:none;padding:0 5px;background:transparent" placeholder='+this_.opts.info+'></div>');
		$box.appendTo(this_.$container);
		$box.css({'height':this_.opts.style.height,'border':'none','display':'inline','line-height':this_.opts.style.height});
		$box.find('input').css({height:this_.opts.height});

		//容器clik事件，激活input输入框，去掉tip_click样式
		this_.$container.click(function(event){

			$(this).find('input').focus();
			$(this).find('.tip').removeClass('tip_click');
			event.stopPropagation();
		})
	}


//--------------------输入框内容改变事件--------------------------------
	function inputChange(){
		var this_=this;//绑定原型对象this
		this_.$container.find('input').change(input);
	//--------------内容改变具体的响应函数----------------------------------
		function input(e){
				var $this_=$(this);
				var text=$this_.val();		
				var tips="";
				if(text.length>0){
					if(/;/.test(text)){
						var res=text.split(';');//分号;分组	
					}else{
						var res=[text];
					}
					$this_.val('')//清空
					for(var i=0;i<res.length;i++){
						if(res[i]!=""){
							if(this_.opts.validation(res[i])){
								tips+='<div class="tip"><span class="message">'+res[i]+'</span><a class="del" href="javascript:void(0)" >x</a></div>'	
							}else{
								tips+='<div class="tip error"><span class="message">'+res[i]+'</span><a class="del error" href="javascript:void(0)" >x</a></div>'	
						}
							}
					}
					var $tips=$(tips);
					$tips.appendTo(this_.$container.find('.added'));
					// console.log(this.$container.find('.added'))
					$tips.each(function(index,ele){//$tips==>[div.tip,div.tip,…………]jquery数组

						//div.tip小框样式设置	
						$(ele).css(this_.opts.style)

						//tips的hover事件，边框颜色变化
						$(ele).hover(function(){

							$(ele).addClass('tip_hover');
							$(ele).find('a').addClass('tip_hover');
						},function(){
							$(ele).removeClass('tip_hover');
							$(ele).find('a').removeClass('tip_hover');
						})
						//tip的click事件
						$(ele).click(function(event){
							event.stopPropagation();//阻止冒泡
							this_.$container.find('input').focus()
							if($(this).hasClass('tip_click')){
								$(this).removeClass('tip_click');
							}else{
								$(this).addClass('tip_click');
							}					
						})					
					})
					//删除每个小tip框事件
					$tips.find('.del').each(function(index,ele){
						$(ele).click(function(event){
							$(this).closest('div.tip').remove();
						})
					})

					//恢复输入框默认宽度
					$this_.css({'width':this_.opts.style['input_width']});
					this_.flag=true;//此时输入框内容为空,this.flag置为true；
				}
		}

	}
//--------------------键盘输入事件-------------------------------------
	//绑定键盘事件
	function keyDown(){
		var this_=this;//绑定原型对象this
		this.$container.find('input').keydown(function(e){
			var $this_=$(this);//保存inputh对象
			var keydownId;
			clearTimeout(keydownId);
			keydownId = setTimeout(function(){


				var keyCode = e.keyCode;
				//console.log(keyCode)
				
				//输入分号事件
				if(keyCode == 186){
					this_.$container.find('input').change()
					
				}

				//--------input框输入时动态改变长度-------------------
				var testLength = $this_.val().length;
				var input_width=parseInt(this_.opts.style['input_width'].substring(0,3));
				var width=testLength*14>input_width?testLength*14:input_width;
				$this_.css('width', width + 'px')
				
				if(testLength>0){
					this_.flag=false;//输入框非空，则this.flag为false
				}
				//键盘按下delete按钮事件
				if(keyCode == 8){
					var $tip_click=this_.$container.find('.tip_click');
					var $tip=this_.$container.find('.tip');
					

						if($tip_click.length>0){
							$tip_click.remove();
						}else{
							if(testLength == 0){
								if(this_.flag){
									$tip.last().remove();
								}else{
									this_.flag=true;
								}																	
							}
						}											
				}
			},100);
		});
	}

	
})(jQuery);