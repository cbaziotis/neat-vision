<template>
  <div class="prediction container-fluid">


    <div class="row">

      <div class="col-sm-12">
        <table class="table table-bordered table-hover table-sm">
          <thead v-if="labels">
          <th></th>
          <th class="text-center" v-for="(value, key) in labels">{{value.name}}</th>
          <th></th>
          </thead>
          <tbody>
          <tr>
            <td class="font-weight-bold">Label</td>
            <td v-for="(label, index) in sample.label"
                :class="{'table-danger': sample.label[index] !== sample.prediction[index] }"
                align="center">
              <span :class="{'font-weight-bold': label === 1}">{{label}}</span>
            </td>
            <td style="text-align: center; vertical-align: middle;" rowspan="2">
              <i v-if="isEqual(sample.label, sample.prediction)"
                 class="fa fa-smile-o text-success prediction-icon"></i>
              <i v-else
                 class="fa fa-frown-o text-danger prediction-icon"></i>
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">Prediction</td>
            <td v-for="(label, index) in sample.prediction"
                :class="{'table-danger': sample.label[index] !== sample.prediction[index] }"
                align="center">
              <span :class="{'font-weight-bold': label === 1}">{{label}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>


      <!-- element to collapse -->
      <div class="col-sm-12">
        <p>
          <b-btn @click="showDetails = !showDetails" variant="outline-secondary">
            <span v-if="showDetails">Hide details <i class="fa fa-minus"></i></span>
            <span v-else>Show details <i class="fa fa-plus"></i></span>
          </b-btn>
        </p>

        <table v-if="showDetails" class="table table-bordered table-hover table-sm">
          <thead>
          <tr>
            <th scope="col" style="width: 5em">Label</th>
            <th v-if="labels" scope="col" style="min-width: 5em">Description</th>
            <th scope="col" style="width: 7em" class="text-right">Posteriors</th>
            <th scope="col">Distributions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(prediction, index) in normalized(sample.posterior)">
            <td v-if="labels" class="fit">{{labels[index].name}}</td>
            <td v-else class="fit">{{index}}</td>

            <td v-if="labels" class="fit">{{labels[index].desc}}</td>

            <td class="text-right">{{prediction.toFixed(5)}}</td>
            <td>
              <i class="threshold"></i>
              <b-progress
                :value="prediction"
                :min="0" :max="1"
                variant="default"
                :precision="3">
                <!--<b-progress-bar :value="prediction" variant="success"></b-progress-bar>-->
                <!--<b-progress-bar :value="1-prediction" variant="danger"></b-progress-bar>-->
              </b-progress>
            </td>
          </tr>
          </tbody>
        </table>


      </div>


    </div>
  </div>
</template>

<script>
  export default {
    props: ["sample", "labels", "options"],
    name: "prediction-classification",
    data: function () {
      return {
        showDetails: false,
      }
    },
    created() {
      console.log(_.isEmpty() ? 'Lodash is available here!' : 'Uh oh..');
    },
    methods: {
      sigmoid: function (t) {
        return 1 / (1 + Math.pow(Math.E, -t));
      },
      normalized: function (numbers) {
        let that = this;
        return numbers.map(function (number) {
          return that.sigmoid(number);
        })
      }
    },
    computed: {
      isEqual: function () {
        return _.isEqual
      }
    }
  }
</script>

<style scoped>
  .prediction-icon {
    font-size: 2.5em;
    margin: 0px 0px;
    padding: 0px 0px;
  }

  .table td.fit,
  .table th.fit {
    white-space: nowrap;
    width: 1%;
  }

  td {
    position: relative;
  }

  .threshold {
    border-left: 1px solid darkred;
    margin-top: 10px;
    width: 100%;
    height: 12px;
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 50%;
  }

  .progress {
    margin-top: 4px;
  }
</style>
