<template>
  <div class="sentence-wrapper">
    <div class="row">

      <div class="col-12 col-sm">
        <div class="sentence" :id="sentence.id" ref="sentence.id" :class="sentenceWidth">
          <div v-for="(item, index) in emojify(sentence.text)" class="token">
            <div class="word" :style="opacityStat(index,'word')">
              <span v-if="item[0] !== item[1]" v-html="item[0]"></span>
              <span v-else>{{item[1]}}</span>
            </div>
            <div class="attention" v-show="options.showAttentions && showAttentions"
                 :style="opacityStat(index,'attention')">
              {{attentions[index].toFixed(3)}}
            </div>
          </div>
        </div>
      </div>


      <div class="col-12 col-sm-auto">
        <div class="sentence-functions">
          <button class="btn btn-outline-secondary btn-xs text-center"
                  v-on:click="toImage">
            <i class="fa fa-camera"></i>
          </button>
          <br>

          <b-button :pressed.sync="showAttentions"
                    class="btn btn-outline-secondary btn-xs"
                    size="sm">
            <i v-if="showAttentions" class="fa fa-eye"></i>
            <i v-else class="fa fa-eye-slash"></i>
          </b-button>

          <!--<button :class="{ active: sentenceWidth==='fullwidth' }"-->
          <!--v-on:click="setSentenceWidth('fullwidth')"-->
          <!--class="btn btn-outline-secondary float-right btn-xs"-->
          <!--size="sm">-->
          <!--fullwidth-->
          <!--</button>-->
          <!--<button :class="{ active: sentenceWidth==='textwidth' }"-->
          <!--v-on:click="setSentenceWidth('textwidth')"-->
          <!--class="btn btn-outline-secondary float-right btn-xs"-->
          <!--size="sm">-->
          <!--textwidth-->
          <!--</button>-->
          <!--<button :class="{ active: sentenceWidth==='columnwidth' }"-->
          <!--v-on:click="setSentenceWidth('columnwidth')"-->
          <!--class="btn btn-outline-secondary float-right btn-xs"-->
          <!--size="sm">-->
          <!--columnwidth-->
          <!--</button>-->

        </div>
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    props: ["sentence", "options", "index"],
    name: "sentence",
    data: function () {
      return {
        showAttentions: true,
        sentenceWidth: "fullwidth",
        fontSize: 1.0
      }
    },
    computed: {
      attentions: function () {
        return this.sentence.attention.slice(0, this.sentence.text.length);
      },
      opacities: function () {
        return this.softmax(this.attentions, 0.04);
      },
      att_mean: function () {
        // let sum = this.math.sum(this.attentions);
        let sum = 1; // it is always 1, since attentions scores are normalized
        return sum / this.attentions.length;
      },
      att_std: function () {
        return this.std(this.attentions);
      },
      att_min: function () {
        return Math.min(this.attentions);
      },
      att_max: function () {
        return Math.max(this.attentions);
      },
      elementId: function () {
        return "sentence-" + this.index;
      }
    },
    methods: {
      opacityTemp: function (index, type) {
        let score = this.opacities[index];
        if (type === "word" && !this.options.colorWords) {
          score = 0;
        } else if (type === "attention" && !this.options.colorAttentions) {
          score = 0;
        }

        let style = {
          background: "rgba(255, 0, 0, " + score + ")"
        };

        return style
      },
      opacityStat: function (index, type) {
        let score = this.attentions[index];

        if (score > this.att_mean) {
          score = (score - this.att_mean) / (4 * this.att_std);
          // color_opacity = score;
        } else {
          score = score / 2;
        }

        if (type === "word" && !this.options.colorWords) {
          score = 0;
        } else if (type === "attention" && !this.options.colorAttentions) {
          score = 0;
        }

        let fontSize = this.fontSize;

        if (type === "attention") {
          fontSize *= 0.75;
        }

        let style = {
          background: "rgba(255, 0, 0, " + score + ")",
          'font-size': fontSize + 'em'
        };

        return style
      },
      btnVariant: function (state) {
        if (state) {
          return 'success';
        } else {
          return 'danger';
        }
      },
      toImage: function (event) {
        let el_id = this.sentence.id;
        let node = document.getElementById(el_id);

        try {
          let labels_node = null;
          if (this.options.task === 'multi-clf') {
            labels_node = document.getElementById('multi-clf-' + this.index);
          } else if (this.options.task === 'clf') {
            labels_node = document.getElementById('clf-' + this.index);
          }
          labels_node.style.fontSize = this.fontSize + "em";
          node.appendChild(labels_node);

        } catch (e) {

        }

        let that = this;
        window.domtoimage.toSvg(node, {cacheBust: true})
          .then(function (dataUrl) {
            //todo: find workaround https://stackoverflow.com/questions/48753691/cannot-access-cssrules-from-local-css-file-in-chrome-64/49160760#49160760
            let link = document.createElement('a');
            link.download = el_id + '_' + that.sentenceWidth + '_' + '.svg';
            link.href = dataUrl;
            link.target = '_blank';
            link.click();
          })
          .catch(function (error) {
            console.error('oops, something went wrong!', error);
          });

      },
      emojify: function (tokens) {
        let em_tokens = [];
        for (let i = 0; i < tokens.length; i++) {
          em_tokens.push([twemoji.parse(tokens[i]), tokens[i]])
        }
        return em_tokens;
      },
      setSentenceWidth: function (width) {
        return this.sentenceWidth = width;
      }
    }
  }
</script>

<style>

  .sentence-functions .btn {
    height: 36px;
    width: 100%;
    margin: 2px 0;
  }
  div.sentence-functions {
    /*background: red;*/
    width: 45px;
  }

  .sentence {
    padding: 5px 0px;
    display: inline-block;
  }

  .sentence-latex {
    background: cornsilk;
    border: 2px solid black;
  }

  .columnwidth {
    width: 7.7cm;
  }

  .textwidth {
    width: 16cm;
  }

  .token {
    display: inline-block;
    padding: 0 1px;
  }

  .word, .attention {
    padding: 0 2px;
  }

  .word, .attention {
    text-align: center;
    margin: 3px 0;
  }

  .attention {
    padding: 0 4px;
    /*transform: rotate(-20deg);*/
    border-top: 1px solid lightgrey;
  }

</style>
