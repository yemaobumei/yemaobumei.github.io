require('normalize.css/normalize.css');
require('styles/App.scss');
import React from 'react';
import ReactDOM from 'react-dom';



/*let imageDatas=require('../data/imageDatas.json');
//获取图片相关信息，转化图片URL路径信息
 let getImageURL=(=>x){
	x.imageURL=require('../images/'+x.fileName);
	return x
}
imageDatas=imageDatas.map(getImageURL);*/
//获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');

//利用自执行函数，将图片名信息转成图片URL路径信息

imageDatas = ((imageDatasArr) => {
  for (var i = 0, j = imageDatasArr.length; i < j; i++) {
    let singleImageData = imageDatasArr[i];
    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
    imageDatasArr[i] = singleImageData;
  }
  return imageDatasArr;
})(imageDatas);

//获取指定区间内的一个随机值
var getRangeRandomNumber=(low,high)=>Math.floor(Math.random()*(high-low)+low);

//获取30度内的随机旋转角度，可正可负
var  get30DegRandomNumber=()=>{
	let sign='';
	sign=(Math.random()>0.5)?'+':'-';
	return sign+Math.ceil(Math.random()*30);
};

/*图片组件*/
class ImgFigure extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick=this.handleClick.bind(this)
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render() {
		/*var styleObj=this.props.arrange.pos;*/
		var styleObj = {};
		//如果props属性中指定了这张图片的位置,则使用
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
		//添加旋转角度css属性
		if(this.props.arrange.rotate){
			(['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
				styleObj[value+'Transform']='rotate('+this.props.arrange.rotate+'deg)';
			});
		}
		if(this.props.arrange.isCenter){
			styleObj['zIndex']=110;
		}
		var className='img-figure';
		if(this.props.arrange.isInverse){
			className+=' is-inverse';
		}

		return (
			<figure className={className}  style={styleObj} onClick={this.handleClick}><img className="img" src={this.props.data.imageURL} alt={this.props.data.title}/>
			<figcaption>
			<h2 className="img-title">{this.props.data.title}</h2>
			          <div className="img-back" onClick={this.handleClick}>
				<p>
				{this.props.data.instagram}
				</p>
				<p>
				{this.props.data.douban}
				</p>
				<p>
				{this.props.data.desc}
				</p>
				</div>
			</figcaption>
			</figure>);
	}
}
//控制按钮组件
class ControllerUnit extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	}
	render() {
		let controllerUnitClassName = 'controller-unit';
		//如果对应的是居中的图片，显示控制按钮的居中态
		if (this.props.arrange.isCenter) {
			controllerUnitClassName += ' is-center ';
			//如果翻转显示翻转状态
			if (this.props.arrange.isInverse) {
				controllerUnitClassName += 'is-inverse'
			}
		}
		return (
		  <span className={ controllerUnitClassName } onClick={this.handleClick}></span>
		)
	}
}


// 舞台组件
class GalleryByReactApp extends React.Component {

	//构建方法,定义实例属性
	constructor(props) {
		super(props);
		this.Constant = {
			centerPos: {
				left: 0,
				right: 0
			},
			hPosRange: { //水平方向的取值范围
				leftSecX: [0, 0],
				rightSecX: [0, 0],
				y: [0, 0]
			},
			vPosRange: { //垂直方向
				x: [0, 0],
				topY: [0, 0]
			}
		};
		this.state = {
			imgsArrangeArr : []
		};
	}
	//图片翻转/////////////////////////////
	inverse(index){
		return ()=>{
			let temp=this.state.imgsArrangeArr;
			temp[index].isInverse=!temp[index].isInverse;
			this.setState({
				imgsArrangeArr:temp
			});
		}
	}
	//图片居中
	center(index){
		return()=>{
			this.rearrange(index);
		}
	}

	//布局整个舞台图片位置
	rearrange(centerIndex){
		let imgsArrangeArr=this.state.imgsArrangeArr,
			Constant=this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,
			imgsArrangTopArr = [],
			topImgNum = Math.floor(Math.random() * 2), //上侧区域图片个数取一个或者不取
			topImgSpliceIndex = 0,//上侧区域图片开始索引
			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);//先在图片状态数组里删除中心图片的状态
			//布置中心图片状态
			imgsArrangeCenterArr[0]={
				pos:centerPos,
				rotate:0,
				isCenter:true,
				isInverse:false
			}
			//布置上侧区域图片状态
			topImgSpliceIndex=Math.floor((imgsArrangeArr.length-topImgNum)*Math.random());
			imgsArrangTopArr=imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);//先在图片状态数组里删除上侧区域图片的状态
			imgsArrangTopArr.forEach((value,index)=>{
				imgsArrangTopArr[index]={
					pos:{
						top:getRangeRandomNumber(vPosRangeTopY[0],vPosRangeTopY[1]),
						left:getRangeRandomNumber(vPosRangeX[0],vPosRangeX[1])
					},
					rotate:get30DegRandomNumber(),
					isCenter:false,
					isInverse:false
				}
			});
			//布置左右两侧区域图片状态
			for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
				let hPosRangeX=null;
				if (i < k) {
					hPosRangeX=hPosRangeLeftSecX;
				}else{
					hPosRangeX=hPosRangeRightSecX;
				}
				imgsArrangeArr[i]={
					pos: {
						top:getRangeRandomNumber(hPosRangeY[0],hPosRangeY[1]),
						left:getRangeRandomNumber(hPosRangeX[0],hPosRangeX[1])
					},
					rotate: get30DegRandomNumber(),
					isCenter: false,
					isInverse:false
				};
			}
			//重新插入上侧区域图片状态信息
			if (imgsArrangTopArr && imgsArrangTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex,0,imgsArrangTopArr[0]);
			}
			//重新插入中心区域图片状态信息
			imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
			this.setState({imgsArrangeArr:imgsArrangeArr});

			
	}
	//组件加载以后，为每张图片计算其位置的范围
	componentDidMount() {
		//拿到舞台的大小
		let stageDOM=ReactDOM.findDOMNode(this.refs.stage),
			   stageW=stageDOM.scrollWidth,
			   stageH=stageDOM.scrollHeight,
			   halfStageW=Math.ceil(stageW/2),
			   halfStageH=Math.ceil(stageH/2);
		let imgFigureDOM=ReactDOM.findDOMNode(this.refs.imgFigure0),
			   imgW=imgFigureDOM.scrollWidth,
			   imgH=imgFigureDOM.scrollHeight,
			   halfImgW=Math.ceil(imgW/2),
			   halfImgH=Math.ceil(imgH/2);
			
			//计算中心图片的位置
			this.Constant.centerPos={
				left:halfStageW-halfImgW,
				top:halfStageH-halfImgH
			}
			//计算左侧，右侧区域图片排布位置的取值范围
			this.Constant.hPosRange.leftSecX[0]=-halfImgW;
			this.Constant.hPosRange.leftSecX[1]=halfStageW-halfImgW*3;
			this.Constant.hPosRange.rightSecX[0]=halfStageW+halfImgW;
			this.Constant.hPosRange.rightSecX[1]=stageW-halfImgW;
			this.Constant.hPosRange.y[0] = -halfImgH;
			this.Constant.hPosRange.y[1] = stageH - halfImgH;
			//计算上册区域图片排布位置的取值范围
			this.Constant.vPosRange.topY[0]=-halfImgH;
			this.Constant.vPosRange.topY[1]=halfStageH-halfImgH*3;
			this.Constant.vPosRange.x[0]=halfImgW-imgW;
			this.Constant.vPosRange.x[1]=halfStageW;

			let num=Math.floor(Math.random()*10);
			this.rearrange(num);

	}
	render() {
		let controllerUnits=[],
			ImgFigures=[];
		imageDatas.forEach((value,index)=>{  //!!!!!不能替换成(){}

		if (!this.state.imgsArrangeArr[index]) {
			this.state.imgsArrangeArr[index] = {
				pos: {
					left: 0,
					top: 0
				},
				rotate: 0,
				isInverse: false,
				isCenter: false
			}
		}
			ImgFigures.push(<ImgFigure data={value} key={index} ref={'imgFigure'+index}
				arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}
				center={this.center(index)}/>);
			controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]}
				inverse={this.inverse(index)}
				center={this.center(index)}/>)
		});

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
				{ImgFigures}
				</section>
				<nav className="controller-nav">
				{controllerUnits}
				</nav>
			</section>
			);
	}
}

GalleryByReactApp.defaultProps = {
};

export default GalleryByReactApp;
