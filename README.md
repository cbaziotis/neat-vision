# NeAt-Vision

> NeAt (Neural Attention) Vision, is a visualization tool 
for the attention mechanisms of deep-learning models 
for Natural Language Processing (NLP) tasks.

**Demo**: https://cbaziotis.github.io/neat-vision/

## Attention Mechanism
In machine learning and in particular deep-learning,
whenever we want to identify  the most informative words in a sentence, 
or patches (regions) in an image, we employ an attention mechanism.
The goal is to obtain a fixed feature representation for the input, 
in which the most informative elements contribute more.

_neat-vision_ is made for visualizing the weights of attention mechanisms 
for Natural Language Processing (Tasks) tasks.
In NLP the input text is expressed as a sequence of words or characters,
where each of them is represented by a feature vector.
The feature vector of word $w_i$ might be 
the `i-th` output of an embedding layer $e_i$, or usually,
the output of an RNN at timestep $h_i$.

In the simplest case, we use a self-attention mechanism, 
in order to obtain a fixed vector representation for the input,
by computing a weighed sum (convex combination) of its constituent vectors. 
The attention mechanism learns to assign larger weights 
to the most informative vectors (i.e. words). 
The magnitude of the weight of each vector signifies 
how important each vector (i.e. word) is for the task at hand.

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
At this moment, _neat-vision_ only is supports the visualization of 
self-attention mechanisms and for the following tasks:
 - Regression
 - Classification
 - Multi-Label Classification

_neat-vision_ works with json files containing the tokens (i.e. words, chars), 
attention weights and model predictions. Depending on the task (classification, regression), 
you will have to use slightly different format.
_neat-vision_ expects 2 kinds of files:
 - **Data files**.
 - **Label files**.


In `samples` directory you will find some examples, 
containing the visualizations of the predictions
of our team (NTUA-SLP) in Semeval 2018. You can use them to test the tool.



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
