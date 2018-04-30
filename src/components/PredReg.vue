<template>
  <div class="prediction container-fluid">
    <div class="row">
      <div class="col-sm-6">
        <span>Label: {{sample.label.toFixed(3)}}</span>
        <br>
        <span>Prediction: {{sample.prediction.toFixed(3)}}</span>
      </div>
      <div class="col-sm-6">
        <span>Error ({{difference.toFixed(3)}})</span>
        <b-progress
          :value="difference"
          :min="0" :max="1"
          variant="danger"
          class="mb-3"></b-progress>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["sample", "options"],
    name: "prediction-regression",
    methods: {},
    computed: {
      difference: function () {
        return Math.abs(this.sample.label - this.sample.prediction);
      },
      errorColor: function () {
        let green = Number.parseInt(255 - (255 * this.difference), 10);
        let red = Number.parseInt(255 * this.difference, 10);
        let blue = 0;

        return {
          background: "rgb(" + red + ", " + green + ", " + blue + ")"
        };
      }
    }
  }
</script>

<style scoped>

</style>
