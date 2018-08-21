var weatherIcons = {
    'Sunny': '../../../static/img/chart/sunny_128.png',
    'Cloudy': '../../../static/img/chart/cloudy_128.png',
    'Showers': '../../../static/img/chart/showers_128.png'
};

var xArr = [];
var yArr0 = [];
var yArr1 = [];
var yArr2 = [];
for(var m = 1; m < 30; m++){
    xArr.push("2018-01-" + (m<10?'0'+m:m));
    yArr0.push(Math.floor(Math.random()*200));
    yArr1.push(Math.floor(Math.random()*200));
    yArr2.push(Math.floor(Math.random()*50));
}

let option = {
    title : {
        text: '某地区蒸发量和降水量',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['蒸发量','降水量']
    },
    toolbox: {
        show : true,
        feature : {
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : xArr,
            axisLabel: {
                formatter: function (value) {
                    return '{aaaaaaaaaa|'+value+'}';
                },
                margin: 20,
                rich: {
                    aaaaaaaaaa: {
                        color:'rgba(0, 0, 0,1)',
                        width:40,
                        height:40,
                        align: 'center'
                    }
                }
            }
        },
        {
            type : 'category',
            data : xArr,
            axisLabel: {
                formatter: function (value) {
                    var _v = "aaaaaaaaaa";
                    return '{'+_v+'|'+value+'}';
                },
                margin: 20,
                rich: {
                    aaaaaaaaaa: {
                        color:'rgba(0, 0, 0,1)',
                        width:40,
                        height:40,
                        align: 'center',
                        backgroundColor: {
                            image: weatherIcons.Sunny
                        }
                    },
                    b: {
                        width:40,
                        height:40,
                        align: 'center',
                        backgroundColor: {
                            image: weatherIcons.Cloudy
                        }
                    },
                    c: {
                        width:40,
                        height:40,
                        align: 'center',
                        backgroundColor: {
                            image: weatherIcons.Showers
                        }
                    }
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        },
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'蒸发量',
            type:'line',
            data:yArr0
        },
        {
            name:'降水量',
            type:'line',
            
            data:yArr1
        },
        {
            name:'天气',
            type:'line',
            data:yArr2,
            showSymbol:false,
            animation:false,
            yAxisIndex: 1
        }
    ]
};
export default option
