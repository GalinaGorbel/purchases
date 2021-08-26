<template>
  <select
    name="selection"
    id="selection"
    v-model="selection"
    @change="chartOpt"
  >
    <option value="days">по дням</option>
    <option value="weeks">нарисовать график</option>
    <!-- <option value="months">по месяцам</option> -->
  </select>
  <canvas ref="canvas"> </canvas>
</template>

<script>
export default {
  data() {
    return {
      selection: 'weeks',
      canvas: null,
      ctx: null,
      width: 1000,
      height: 500,
      dpi_width: null,
      dpi_height: null,
      rows_count: 6,
      max: 0,
      min: 0,
      startY: 0,
      points: [],
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.loadAll();
  },
  methods: {
    loadAll() {
      this.$store.dispatch('request/loadAll');
    },
    newArr() {
      let arr = this.$store.getters['request/chartRequests'];

      let newArr = arr.reduce((r, obj) => {
        r[obj.date] = r[obj.date] || [];
        r[obj.date].push({
          product: obj.product,
          price: obj.price,
          category: obj.category,
          id: obj.id,
        });
        return r;
      }, {});

      for (let key in newArr) {
        let res = 0;
        newArr[key].forEach((elem) => {
          res += +elem.price;
        });
        this.points[key] = res;
      }
    },
    chartOpt(e) {
      this.newArr();
      if (e.target.value == 'months') {
        console.log('months');
      } else if (e.target.value == 'days') {
        let str = [];
        let x = [];
        Object.keys(this.points).forEach((elem) => {
          str.push(this.points[elem]);
          x.push(elem);
        });

        this.max = Math.max(...str);
        this.min = Math.min(...str);
        this.chart(this.canvas, str, x);
      }
    },

    chart(canvas, str, x) {
      const ctx = canvas.getContext('2d');

      this.dpi_height = this.height * 2;
      this.dpi_width = this.width * 2;
      canvas.style.width = this.width + 'px';
      canvas.style.height = this.height + 'px';
      canvas.width = this.dpi_width;
      canvas.height = this.dpi_height;
      const padding = 40;
      const viewHeight = this.dpi_height - padding * 2;
      const viewWidth = this.dpi_width;
      const yRatio = viewHeight / (this.max - this.min);
      const xRatio = viewWidth / str.length;

// y axis
      const step = viewHeight / this.rows_count;
      const textStep = (this.max - this.min) / this.rows_count;

      ctx.beginPath();
      ctx.strokeStyle = '#bbb';
      ctx.font = 'normal 20px black';
      for (let i = 1; i <= this.rows_count; i++) {
        const y = step * i;
        const text = this.max - textStep * i;

        ctx.fillText(Math.round(text).toString(), 5, y + padding - 10);
        ctx.moveTo(0, y + padding);
        ctx.lineTo(this.dpi_width, y + padding);
      }
      ctx.stroke();
      ctx.closePath();
// ====


      ctx.fillStyle = 'green';

      for (let i = 0; i < str.length; i++) {
        let dp = str[i];
        ctx.fillRect(
          50 + i * xRatio,
          this.dpi_height - (dp + padding) * yRatio,
          100,
          (dp + padding) * yRatio
        );
        ctx.fillText(x[i],  50 + i * xRatio, 16);
      }
    },

  },
  computed: {
    maximum: function () {
      return this.max;
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  border: 1px solid black;
}
</style>