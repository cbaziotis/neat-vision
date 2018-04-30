<template>
  <b-card bg-variant="light">
    <div class="row">
      <div class="col-sm-12">
        <h4>Options</h4>
        <hr>
      </div>
    </div>
    <div class="row">

      <!--Show Attentions-->
      <div class="col-sm-12 setting">
        <b-form-row>
          <label class="col-sm-8">Show Scores</label>
          <div class="col-sm-4">
            <b-button :pressed.sync="options.showAttentions"
                      class="float-right"
                      style="width: 80px"
                      size="sm"
                      :variant="btnVariant(options.showAttentions)">
              {{options.showAttentions}}
            </b-button>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Show the attention scores below each token.
          </b-form-text>
        </b-form-row>
      </div>

      <!--Color Words-->
      <div class="col-sm-12 setting">
        <b-form-row>
          <label class="col-sm-8">Heatmap on Tokens</label>
          <div class="col-sm-4">
            <b-button :pressed.sync="options.colorWords"
                      class="float-right"
                      style="width: 80px"
                      size="sm"
                      :variant="btnVariant(options.colorWords)">
              {{options.colorWords}}
            </b-button>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Show heatmap over the tokens in each text.
          </b-form-text>
        </b-form-row>
      </div>

      <!--Color Attentions-->
      <div class="col-sm-12 setting">
        <b-form-row>
          <label class="col-sm-8">Heatmap on Attentions</label>
          <div class="col-sm-4">
            <b-button :pressed.sync="options.colorAttentions"
                      class="float-right"
                      style="width: 80px"
                      size="sm"
                      :variant="btnVariant(options.colorAttentions)">
              {{options.colorAttentions}}
            </b-button>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Show heatmap over the attention scores.
          </b-form-text>
        </b-form-row>
      </div>

      <!--Show Predictions-->
      <div class="col-sm-12 setting">
        <b-form-row>
          <label class="col-sm-8">Show Predictions</label>
          <div class="col-sm-4">
            <b-button :pressed.sync="options.showPredictions"
                      class="float-right"
                      style="width: 80px"
                      size="sm"
                      :variant="btnVariant(options.showPredictions)">
              {{options.showPredictions}}
            </b-button>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Show an analysis of the predictions of the model.
          </b-form-text>
        </b-form-row>
      </div>

      <div class="col-sm-12 setting"
           v-if="options.task === 'clf' || options.task === 'multi-clf'">
        <b-form-row>
          <label class="col-sm-8">Only Correct</label>
          <div class="col-sm-4">
            <b-button
              :pressed.sync="options.onlyCorrect"
              class="float-right"
              style="width: 80px"
              size="sm"
              :variant="btnVariant(options.onlyCorrect)">
              {{options.onlyCorrect}}
            </b-button>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Show only samples that are classified correctly.
          </b-form-text>
        </b-form-row>

      </div>

      <!--Max Loss-->
      <div class="col-sm-12 setting" v-if="options.task === 'reg'">
        <b-form-row>
          <label class="col-sm-8">Max Loss</label>
          <div class="col-sm-4">
            <b-form-input id="maxLoss"
                          v-model="options.maxLoss"
                          type="number"
                          step="0.01"
                          size="sm"
                          placeholder="Enter your name"></b-form-input>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Filter out samples by max loss (0 = show all).
          </b-form-text>
        </b-form-row>
      </div>

      <!--MAX LENGTH-->
      <div class="col-sm-12 setting">
        <b-form-row>
          <label class="col-sm-8">Max Length</label>
          <div class="col-sm-4">
            <b-form-input id="maxLength"
                          v-model="options.maxLength"
                          type="number"
                          size="sm"
                          placeholder="Enter your name"></b-form-input>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Filter out samples by max length (0 = show all).
          </b-form-text>
        </b-form-row>
      </div>

      <div class="col-sm-12 setting" v-if="labels">
        <b-form-row>
          <label class="col-sm-8">Filter Label</label>
          <div class="col-sm-4">
            <b-form-select v-model="options.filteredLabel"
                           :options="labelOptions"
                           size="sm"/>
          </div>
        </b-form-row>
        <b-form-row>
          <b-form-text class="col-sm-12">
            Filter out samples by label.
          </b-form-text>
        </b-form-row>

      </div>
    </div>
  </b-card>
</template>

<script>
  export default {
    props: ["options", "labels"],
    methods: {
      btnVariant: function (state) {
        if (state) {
          return 'success';
        } else {
          return 'danger';
        }
      }
    },
    computed: {
      labelOptions: function () {
        try {
          let vm = this;
          let options =  Object.keys(vm.labels).map(function (key, index) {
            return { value: key, text: vm.labels[key]["name"] + " " + vm.labels[key]["desc"] }
          });
          options.push({ value: null, text: "-- show all --" });
          return options;
        }catch (ex){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .setting {
    margin: 5px 0;
  }

  span.label {
    font-size: 18px;
    display: inline-block;
  }
</style>
