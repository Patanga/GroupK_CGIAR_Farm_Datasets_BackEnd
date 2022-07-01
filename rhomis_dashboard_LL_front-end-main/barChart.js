var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('barChart');
var box = echarts.init(chartDom);
var option;
box.showLoading();
$.get(
    ROOT_PATH + '/barChart',
    function (bardata) {
        var keys = Object.keys(bardata)
        var values = Object.values(bardata)
        box.hideLoading();
        option = {
            title: {
                text: 'type',
                left: 'center',
            },
            tooltip: {},
            legend: {
                data:['type count']
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