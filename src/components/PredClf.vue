<template>
  <div class="prediction container-fluid">
    <div class="row">
      <div class="col-sm-12">

        <!--<div :id="'clf-'+index" style="padding-top: 10px">-->
          <!--<span class="font-weight-bold" style="padding-left: 7px">Label: </span>-->
          <!--<span v-if="labels" v-html="emojify(labels[sample.label].name)"></span>-->
          <!--<span v-else>{{sample.label}}</span>-->
          <!--<span style="padding-right: 20px"></span>-->


          <!--<div v-if="sample.posterior.length > 10"-->
               <!--style="display: inline-block">-->
            <!--<span class="font-weight-bold">Top 5: </span>-->
            <!--<ul class="list-inline" style="display: inline;">-->
              <!--<li class="list-inline-item" v-for="i in 5">-->
                <!--<span v-html="emojify(labels[topIndices[i-1]].name)"></span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->

        <!--<br>-->
        <!--<br>-->

        <table class="table table-bordered table-hover table-sm">
          <tbody>
          <tr>
            <td class="font-weight-bold">Label</td>
            <td class="font-weight-bold">
              {{sample.label}}
              (<span v-if="labels" v-html="emojify(labels[sample.label].name)"></span>)
            </td>
            <td style="text-align: center; vertical-align: middle;"
                :rowspan="sample.posterior.length > 10 ? 3 : 2">
              <i v-if="sample.label === sample.prediction"
                 class="fa fa-smile-o text-success prediction-icon"></i>
              <i v-else
                 class="fa fa-frown-o text-danger prediction-icon"></i>
            </td>
          </tr>
          <tr>
            <td class="font-weight-bold">Prediction</td>
            <td class="font-weight-bold">
              {{sample.prediction}}
              (<span v-if="labels" v-html="emojify(labels[sample.prediction].name)"></span>)
            </td>
          </tr>
          <tr v-if="sample.posterior.length > 10">
            <td class="font-weight-bold">Top 5</td>
            <td class="font-weight-bold">
              <ul class="list-inline" style="display: inline;">
                <li class="list-inline-item" v-for="i in 5">
                  <span v-html="emojify(labels[topIndices[i-1]].name)"></span>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <p>
        <br>
      </p>
      <div class="col-sm-12">
        <p>
          <b-btn @click="showDetails = !showDetails" variant="outline-secondary">
            <span v-if="showDetails">Hide details <i class="fa fa-minus"></i></span>
            <span v-else>Show details <i class="fa fa-plus"></i></span>
          </b-btn>
        </p>

        <!--<pre>{{sample}}</pre>-->
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
          <tr v-for="(prediction, index) in sample.posterior">
            <td v-if="labels" class="fit">{{labels[index].name}}</td>
            <td v-else class="fit">{{index}}</td>

            <td v-if="labels" class="fit">{{labels[index].desc}}</td>

            <td class="text-right">{{normPredictions[index].toFixed(5)}}</td>
            <td>
              <i class="threshold"></i>
              <b-progress
                :value="normPredictions[index]"
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
    props: ["sample", "labels", "options", "index"],
    mixins:["ml"],
    name: "prediction-classification",
    data: function () {
      return {
        showDetails: false,
      }
    },
    methods: {
      sortWithIndeces: function (toSort) {
        for (var i = 0; i < toSort.length; i++) {
          toSort[i] = [toSort[i], i];
        }
        toSort.sort(function (left, right) {
          return left[0] < right[0] ? -1 : 1;
        });
        toSort.sortIndices = [];
        for (var j = 0; j < toSort.length; j++) {
          toSort.sortIndices.push(toSort[j][1]);
          toSort[j] = toSort[j][0];
        }
        return toSort;
      },
      emojify: function (text) {
        return twemoji.parse(text);
      },
    },
    computed: {
      topIndices: function () {
        let arr = JSON.parse(JSON.stringify(this.normPredictions));
        return this.sortWithIndeces(arr).sortIndices.reverse();
      },
      normPredictions: function () {
        return this.softmax(this.sample.posterior);
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
</style>
