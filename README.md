# geemb

> Gemmb监控管理系统

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# 踩坑
https://www.jianshu.com/p/de667b477057
* [mpvue连接跳转和传递参数](https://www.jianshu.com/p/4a2a00260439)

# vue-i18n 配置mpvue
https://ask.dcloud.net.cn/article/35102


## components

### table-row 表格头部

```vue
<table-row :rows="rows"></table-row>

<script >
import tableRow from 'my-table-row';
  export default {
    components: {
      "table-row": tableRow,
    },
    data() {
      return {
        rows: [
          {
            width: "22%",
            name: "优先级",
            selectOptions: [
              {
                id: 1,
                name: "Critical"
              },
              {
                id: 2,
                name: "Major"
              },
              {
                id: 3,
                name: "Minor"
              },
              {
                id: 4,
                name: "Warining"
              },
              {
                id: 5,
                name: "Normal"
              }

            ],
            isArrow: true
          },
          {
            width: "28%",
            name: "设备名称",
            isArrow: true
          },
          {
            width: "28%",
            name: "设备IP",
            isArrow: true
          },
          {
            width: "22%",
            name: "地点",
            isArrow: true
          }
        ]
      };
    },
  }

</script>



```
