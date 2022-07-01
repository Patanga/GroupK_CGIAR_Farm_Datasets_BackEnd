var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('hisGram');
var box = echarts.init(chartDom);
var option;

box.showLoading();
$.get(
    ROOT_PATH + '/hisGram',
    function (hisData) {
        var keys = Object.keys(hisData)
        var values = Object.values(hisData)
        box.hideLoading();
        option = {
            title: {
                text: 'off farm %',
                left: 'center',
            },
            tooltip: {},
            legend: {
                data:['Percentage Number']
            },
            xAxis: {
              type: 'category',
              data: keys
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: values,
                type: 'bar'
              }
            ]
          };
       
        box.setOption(option);
    }
);

option && box.setOption(option);
