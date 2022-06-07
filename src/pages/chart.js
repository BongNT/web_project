
// var React = require('react');
// var Component = React.Component;
// var CanvasJSReact = require('./canvasjs.react');
// var CanvasJS = CanvasJSReact.CanvasJS;
// var CanvasJSChart = CanvasJSReact.CanvasJSChart;
// 	class App extends Component {
// 		render() {
// 			const options = {
// 				exportEnabled: true,
// 				animationEnabled: true,
// 				title: {
// 					text: "Thống kê loại Giấy chứng nhận"
// 				},
// 				data: [{
// 					type: "pie",
// 					startAngle: 270,
// 					toolTipContent: "<b>{label}</b>: {y}%",
// 					showInLegend: "true",
// 					legendText: "{label}",
// 					indexLabelFontSize: 16,
// 					indexLabel: "{label} - {y}%",
// 					dataPoints: [
// 						{ y: dataRef.current.valid, label: "Còn hạn" },
// 						{ y: dataRef.current.expired, label: "Hết hạn" },
// 						{ y: dataRef.current.evoked, label: "Bị thu hồi" },
// 					]
// 				}]
// 			}
// 			return (
// 			<div>
// 				<CanvasJSChart options = {options}	/>
// 			</div>
// 			);
// 		}
// 	}  
//     module.export = App;