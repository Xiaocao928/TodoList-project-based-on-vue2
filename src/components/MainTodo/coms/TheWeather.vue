<template>
  <div class="weather">
    <div class="location">
      <i class="iconfont icon-dizhiguanli"></i>
      {{ location }}
    </div>
    <div class="date">
      <i class="iconfont icon-rili"></i>
      {{ date }}
    </div>
    <div class="temp">
      <i class="iconfont icon-kongqiwendu"></i>
      high:{{ temp.high }} low:{{ temp.low }}
    </div>

    <div class="wind">
      <i class="iconfont icon-feng"></i>
      风力:{{ wind.fengli }}{{ wind.fengxiang }}
    </div>
    <div class="type">
      <i class="iconfont icon-shouye"></i>
      {{ type }}
    </div>
    <div class="air">
      <i class="iconfont icon-kongqizhiliangjiance"></i>
      AQI:{{ air.aqi }} AQI等级:{{ air.aqi_level }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheWeather',
  data() {
    return {
      location: '',
      date: '',
      air: { aqi: '', aqi_level: '' },
      wind: { fengli: '', fengxiang: '' },
      temp: { high: '', low: '' },
      tip: '',
      type: '',
    }
  },
  mounted() {
    this.$http
      .get('https://api.vvhan.com/api/weather')
      .then(res => {
        // console.log(res)
        this.location = res.data.city
        this.date = res.data.info.date
        this.air.aqi = res.data.info.air.aqi
        this.air.aqi_level = res.data.info.air.aqi_level
        this.wind.fengli = res.data.info.fengli
        this.wind.fengxiang = res.data.info.fengxiang
        this.temp.high = res.data.info.high
        this.temp.low = res.data.info.low
        this.tip = res.data.info.tip
        this.type = res.data.info.type
        // console.log(this.type)
      })
      .catch(error => {
        console.error(error)
      })
  },
}
</script>
<style lang="stylus">
@import 'http://at.alicdn.com/t/c/font_4003533_ij9xi9bhsnc.css'
.weather
    display:flex
    flex-wrap: wrap;
    font-size: 12px
    box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.3)
    border-radius: 5px
    margin: 5px 10px
    .location
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke

        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        margin:10px 5px
        padding:4px 8px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        box-sizing: border-box
        cursor: pointer
    .date
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke
        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        padding:4px 8px
        margin:10px 5px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        cursor: pointer
    .air
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke
        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        padding:4px 8px
        margin:10px 5px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        cursor: pointer
    .wind
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke
        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        padding:4px 8px
        margin:10px 5px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        cursor: pointer
    .temp
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke
        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        padding:4px 8px
        margin:10px 5px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        cursor: pointer
    .type
        -webkit-backdrop-filter: blur(10px);
        color:whitesmoke
        background-color: rgba(255, 255, 255, 0.1)
        border: 1px solid rgba(255, 255, 255, 0.1)
        padding:4px 8px
        margin:10px 5px
        border-radius: 100px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1)
        cursor: pointer
</style>
