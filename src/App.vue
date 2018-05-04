<!--<script src="main.js"></script>-->
<template>
  <div id="app">

    <div id="wrapper" :class="{toggled:sidebar}">

      <!-- Sidebar -->
      <div id="sidebar-wrapper">
        <!-- OPTIONS -->
        <br>
        <div class="container-fluid">
          <b-card bg-variant="light">
            <div class="row">
              <div class="col-sm-12">
                <h4>Data</h4>
                <hr>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm-12">
                <b-form-radio-group id="taskTypeRadios"
                                    stacked
                                    buttons
                                    style="width: 100%"
                                    button-variant="outline-secondary"
                                    size="md"
                                    v-model="options.task"
                                    :options="tasks"
                                    name="radiosBtnDefault"/>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <b-form-group
                  :label-cols="4"
                  label-size="md"
                  label="Data file"
                  label-for="attentionsFile">

                  <b-form-file id="attentionsFile"
                               v-model="attentionsFile"
                               :state="Boolean(attentionsFile)"
                               placeholder="Select data file..."></b-form-file>
                </b-form-group>
              </div>
            </div>
            <div class="row" v-show="options.task !== 'reg'">
              <div class="col-sm-12">
                <b-form-group
                  :label-cols="4"
                  label-size="md"
                  label="Labels file"
                  label-for="labelsFile">

                  <b-form-file id="labelsFile"
                               v-model="labelsFile"
                               :state="Boolean(labelsFile)"
                               placeholder="Select labels file..."></b-form-file>
                </b-form-group>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-sm-12">
                <b-button @click="loadData"
                          variant="secondary"
                          style="width: 100%"
                          class="float-sm-right">Load
                </b-button>
              </div>
            </div>
          </b-card>
          <br>
          <div class="row">
            <div class="col-sm-12">
              <app-options :options="options" :labels="labels"></app-options>
            </div>
          </div>
        </div>
      </div>
      <!-- /#sidebar-wrapper -->

      <!-- Page Content -->
      <div id="page-content-wrapper">
        <div class="container-fluid">

          <!--navbar-->
          <div class="row">
            <div class="col-sm-12">
              <nav class="navbar  navbar-light bg-light fixed-top">
                <a class="navbar-brand" href="#">
                  <strong>Neat</strong> (Neural Attention)
                  <strong>Vision</strong>
                </a>
                <b-button
                  class="navbar-toggler"
                  variant="outline"
                  :pressed.sync="sidebar">
                  <span class="navbar-toggler-icon"></span>
                </b-button>
              </nav>
            </div>
          </div>

          <!--Loader-->
          <div class="row" v-show="statuses.isLoadingFile">
            <div class="col-sm-12 text-center">
              <i class="fa fa-4x fa-spinner fa-pulse"></i>
              <!--<i class="fa fa-4x fa-spinner fa-spin" v-show="statuses.isLoadingFile"></i>-->
            </div>
          </div>

          <!--TOP PAGINATION-->
          <div class="row "
               v-if="validSamples(samples).length>0 && !statuses.isLoadingFile">
            <div class="col-12 col-md">
              <b-pagination size="sm" align="right"
                            v-model="pagination.currentPage"
                            :total-rows="validSamples(samples).length"
                            :per-page="pagination.perPage">
              </b-pagination>
            </div>
            <div class="col-12 col-md-auto">
              <div style="background: red; width: 300px;">
                <b-form inline class="float-right">
                  <label class="mr-sm-2">Per Page</label>
                  <b-form-select v-model="pagination.perPage"
                                 :options="pagination.options" size="sm"/>
                </b-form>

              </div>
            </div>
          </div>

          <!--SAMPLES-->
          <div class="div" v-if="!statuses.isLoadingFile">
            <div class="row"
                 v-for="sample in paginate(validSamples(samples),pagination.perPage,pagination.currentPage)"
                 :key="sample.id">
              <div class="col-sm-12">
                <div class="sample">
                  <app-sentence :sentence="sample" :options="options"
                                :index="sample.id"/>

                  <hr v-if="options.showPredictions">

                  <!--Regression-->
                  <app-prediction-regression
                    v-if="options.showPredictions && options.task === 'reg'"
                    :sample="sample"
                    :options="options"
                    :index="sample.id"/>

                  <!--Classification-->
                  <app-prediction-classification
                    v-if="options.showPredictions && options.task === 'clf'"
                    :sample="sample"
                    :labels="labels"
                    :options="options"
                    :index="sample.id"/>

                  <!--Multi-Label Classification-->
                  <app-prediction-multi-classification
                    v-if="options.showPredictions && options.task === 'multi-clf'"
                    :sample="sample"
                    :labels="labels"
                    :options="options"
                    :index="sample.id"/>

                </div>
              </div>
            </div>
          </div>

          <!--BOTTOM PAGINATION-->
          <div class="row "
               v-if="validSamples(samples).length>0 && !statuses.isLoadingFile">
            <div class="col-12 col-md">
              <b-pagination size="sm" align="right"
                            v-model="pagination.currentPage"
                            :total-rows="validSamples(samples).length"
                            :per-page="pagination.perPage">
              </b-pagination>
            </div>
            <div class="col-12 col-md-auto">
              <div style="background: red; width: 300px;">
                <b-form inline class="float-right">
                  <label class="mr-sm-2">Per Page</label>
                  <b-form-select v-model="pagination.perPage"
                                 :options="pagination.options" size="sm"/>
                </b-form>

              </div>
            </div>
          </div>

        </div>
      </div>
      <!-- /#page-content-wrapper -->

    </div>

  </div>
</template>

<script>
  /* eslint-disable camelcase */

  export default {
  data () {
    return {
      samples: null,
      labels: null,
      attentionsFile: null,
      labelsFile: null,
      sidebar: true,
      statuses: {
        isLoadingFile: false
      },
      options: {
        showAttentions: true,
        colorAttentions: false,
        showPredictions: false,
        onlyCorrect: false,
        maxLength: 40,
        maxLoss: 0,
        colorWords: true,
        filteredLabel: null,
        task: 'clf'
      },
      tasks: [
        {text: 'Classification', value: 'clf'},
        {text: 'Regression', value: 'reg'},
        {text: 'Multi-Label Classification', value: 'multi-clf'}
      ],
      pagination: {
        currentPage: 1,
        perPage: 100,
        options: [50, 100, 200, 300, 500, 1000]
      }
    }
  },
  watch: {
    'options.task': function (val, oldVal) {
      this.labels = null
      this.samples = null
    }
  },
  methods: {
    loadAttentions: function () {
      let reader = new FileReader()
      let vm = this
      this.statuses.isLoadingFile = true
      reader.onload = (e) => {
        try {
          vm.samples = JSON.parse(e.target.result)
        } catch (ex) {
          alert('ex when trying to parse json = ' + ex)
        } finally {
          this.statuses.isLoadingFile = false
        }
      }
      reader.readAsText(this.attentionsFile)
    },
    loadLabels: function () {
      let reader = new FileReader()
      let vm = this
      reader.onload = (e) => {
        try {
          vm.labels = JSON.parse(e.target.result)
        } catch (ex) {
          alert('ex when trying to parse json = ' + ex)
        }
      }
      reader.readAsText(this.labelsFile)
    },
    loadData: function () {
      if (this.attentionsFile == null) {
        alert('Select a data file first!')
      } else {
        this.options.filteredLabel = null
        this.loadAttentions()
        this.loadLabels()
      }
    },
    isSampleVisible: function (sentence) {
      if (this.options.maxLength > 0 &&
          sentence.text.length > this.options.maxLength) {
        return false
      }

      if (this.options.task === 'clf') {
        if (this.options.onlyCorrect && sentence.label !== sentence.prediction) {
          return false
        }

        if (this.options.filteredLabel != null && sentence.label != this.options.filteredLabel) {
          return false
        }
      } else if (this.options.task === 'multi-clf') {
        if (this.options.onlyCorrect && !_.isEqual(sentence.label, sentence.prediction)) {
          return false
        }
      } else if (this.options.task === 'reg') {
        let diff = Math.abs(sentence.label - sentence.prediction)
        if (this.options.maxLoss > 0 && diff > this.options.maxLoss) {
          return false
        }
      }
      return true
    },
    validSamples: function (arr) {
      try {
        return arr.filter(sentence => this.isSampleVisible(sentence))
      } catch (ex) {
        return []
      }
    },
    paginate: function (array, page_size, page_number) {
      --page_number // because pages logically start with 1, but technically with 0
      return array.slice(page_number * page_size, (page_number + 1) * page_size)
    },
    getLabelsEc: function (sample) {
      let labels = []
      var that = this
      Object.keys(that.labels).forEach(function (key) {
        if (sample.label[key]) {
          labels.push(that.labels[key].name)
        }
      })
      return labels.join(', ')
    },
    getIndex: function (index) {
      return index + ((this.pagination.currentPage - 1) * this.pagination.perPage)
    }
  }
}
</script>

<style>
  .sample {
    border: 1px solid gray;
    padding: 5px;
    margin: 5px 0;
    font-family: "Liberation Serif", "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;

  }

  body {
    padding-top: 50px;
  }

  .sentence img.emoji {
    width: 20px;
  }

  img.emoji {
    width: 22px;
  }

  .sentence .word img.emoji {
    width: 22px;
  }

</style>
