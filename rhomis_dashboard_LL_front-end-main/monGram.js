var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('monGram');
var box = echarts.init(chartDom);
var option;

box.showLoading();
$.get(
    ROOT_PATH + '/monGram',
    function (md) {
        box.hideLoading();
        option = {
            title: {
                text: 'off farm month',
                left: 'center',
            },
            tooltip: {},
            legend: {
                data:['Count of Month']
            },
            xAxis: {
              type: 'category',
              data: ['Jan','Feb','Mar','Apr','May','Jun','Jul',
                    'Aug','Sep','Oct','Nov','Dec']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [md['jan'],md['feb'],md['mar'],md['apr'],md['may'],
                        md['jun'],md['jul'],md['aug'],md['sep'],md['oct'],
                        md['nov'],md['dec']],
                type: 'bar'
              }
            ]
          };
       
        box.setOption(option);
    }
);

option && box.setOption(option);