<template>
  <div :class="className" :style="{ width: width, height: height, float: float }" />
</template>

<script>
  import echarts from 'echarts'
  import resize from '@/utils/resize'

  export default {
    name: 'PictorialBarChats',
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '45vh'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      legendData: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      legendNum: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      tbTitle: {
        type: String,
        default: ''
      },
      float: {
        type: String,
        default: ''
      },
      optionType: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      setOptions() {
        this.chart.clear()
        this.chart.setOption({
          title: {
            text: this.tbTitle,
            left: 'center',
            // textStyle: { color: '#0EB8FF' },
            top: '8px'
          },
          xAxis: {
            // name: '月份',
            //X轴名称
            nameLocation: 'middle',
            //名称的位置
            nameGap: 30,
            //坐标轴名称与轴线之间的距离
            nameRotate: 0,
            //坐标轴名字旋转，角度值
            axisTick: {
              show: false,
              //是否显示坐标轴刻度
              nameTextStyle: {
                //坐标轴名称的颜色
                color: '#000'
              }
            },
            axisLine: {
              //是否显示坐标轴轴线
              show: false,
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#000'
              }
            },
            splitArea: { show: false }
          },
          yAxis: {
            nameLocation: 'middle',
            nameGap: 50,
            nameRotate: 90,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: '#002D9C'
              }
            }
          },
          //标题
          legend: [
            {
              data: ['总工单数1'],
              top: 180,
              x: 'left'
            },
            {
              data: ['2222'], 
              top: 200,
              // padding: [0, 28, 0, 0],
              x: 'left'  
            }
          ],
          series: [
            {
              name: '总工单数1',
              data: [
                { value: 335, name: '调账成功笔数' },
                { value: 310, name: '调账失败笔数' },
                { value: 234, name: '审批失败笔数' }
              ],
              type: 'pie',
              center: ['27%', '26%'],
              radius: ['31%', '50%'],
              color: ['rgba(255, 251, 0, 1)', 'rgba(1, 194, 224, 1)', 'rgba(4, 251, 25, 1)']
            },
            {
              name: '2222',
              data: [
                { value: 111, name: '调账成功笔数' },
                { value: 222, name: '调账失败笔数' },
                { value: 333, name: '审批失败笔数' }
              ],
              type: 'pie',
              center: ['27%', '26%'],
              radius: ['31%', '50%'],
              color: ['rgba(255, 251, 0, 1)', 'rgba(1, 194, 224, 1)', 'rgba(4, 251, 25, 1)']
            }
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el)
        this.setOptions()
      }
    }
  }
</script>
<style scoped lang="scss"></style>
