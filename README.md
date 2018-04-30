# neat-vision

> NeAt (Neural Attention) Vision, is a visualization tool for the attention mechanisms of deep-learning models for Natural Language Processing (NLP) tasks.

Demo: https://cbaziotis.github.io/neat-vision/

## Attention Mechanism
In deep-learning, an attention mechanism is usually employed, 
in order to identify the most important elements in a sequence.
The goal is to obtain a feature representation, in which the most informative elements contribute more.
For example we may want to identify the most informative words in a sentence, or patches (regions) in an image.

Usually, we obtain the representation of the sequence, 
by computing a convex combination (weighed sum) of a sequence of vectors. 
The attention mechanism learns to assign larger weights to the most informative vectors. 
The magnitude of the weight of each vector signifies how important each vector (element) is.

This tools is made for visualizing the scores of attention mechanisms for Natural Language Processing (Tasks) tasks. 
At this moment, only is supports the visualization of self-attention mechanisms, for the following tasks:
 - Regression
 - Classification
 - Multi-Label Classification

### Examples

<p>
<img src="./images/task1_ec/1-01.png" height="55" >
<img src="./images/task1_ec/1-02.png" align="right" height="55" >
</br>
<img src="./images/task1_ec/1-04.png" height="55" >
<img src="./images/task1_ec/1-05.png" align="right" height="55" >
</br>
<img src="./images/task1_ec/1-10.png" height="55" >
<img src="./images/task1_ec/1-11.png" align="right" height="55" >
</br>
<img src="./images/task1_ec/1-12.png" height="55" >
<img src="./images/task1_ec/1-16.png" align="right" height="55" >
</br>
</p>


### Documentation

_neat-vision_ works with json files containing the tokens (i.e. words, chars), 
attention weights and model predictions. Depending on the task (classification, regression), 
you will have to use slightly different format.

In `samples` directory you will find some examples, 
containing the visualizations of the predictions
of our team (NTUA-SLP) in Semeval 2018. You can use them to test the tool.

I will upload a detailed documentation soon 
of how to _neat-vision_ expects the json files to be formatted and how to use it.


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
