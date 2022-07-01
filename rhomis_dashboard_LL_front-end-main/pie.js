var ROOT_PATH =
    'http://localhost:3000/api/data/livelihood';

var chartDom = document.getElementById('pie');
var p = echarts.init(chartDom);
var option;

p.showLoading();
$.get(
    ROOT_PATH + '/pie',
    function (pie_data) {
        p.hideLoading();
        option = {
          title: {
            text: 'off farm pie',
            left: 'center',
        },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'off farm spend',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data:pie_data
            }
          ]
        };
        p.setOption(option);
    }
);

option && p.setOption(option);
