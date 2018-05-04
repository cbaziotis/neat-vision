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
The feature vector of word ![equation](http://latex.codecogs.com/gif.latex?w_i) 
might be the `i-th` output of an embedding layer ![equation](http://latex.codecogs.com/gif.latex?e_i), 
or usually, the `i-th` output of an RNN ![equation](http://latex.codecogs.com/gif.latex?h_i).



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

#### Overview
In _neat-vision_ needs 2 kinds of files:
 - **Data file**. This file contains  (1) the text (tokenized), 
      (2) the attention scores and (3) the models predictions.
 - **Label file** (optional). 
      This is needed only in classifications tasks 
      and if provided, it is used for mapping each class label 
      to a user-defined description.

At this moment, _neat-vision_ only is supports the visualization of 
self-attention mechanisms, operating at the sentence-level 
and for the following tasks:
 - Regression.
 - Multi-class Classification: means a classification task with more than two classes.
  Each sample belongs to one of `N` classes.
 - Multi-label Classification: means that we have `N` classes 
   and each sample may belong to more than one classes.
   Essentially, it is a binary classification task for each class.  


#### Input Format

Here you will find a detailed overview of 
how to properly format the output files, for each task.
Besides the necessary data needed for visualizing the attention weights,
in _neat-vision_ you can also visualise the predictions of the model
and gain insights in its behavior. However, it is not required that you provide
such data (e.g. posterior probabilities). 

In any case, in `\samples` you will find some examples, 
containing the predictions of our team (NTUA-SLP) in Semeval 2018. 
You can use them to test _neat-vision_ and to check the format of the data files.

**Classification**. 
The structure of the data file for a classification task is the following:
```json
{
    "text": [],       \\ list of strings - the tokens (words, chars) in the text. (required)
    "label": 0,       \\ integer - the class label. (required)
    "prediction": 0,  \\ integer - the predicted label. (required)
    "posterior": [],  \\ list of floats - the posterior probabilities. (optional)
    "attention": [],  \\ list of floats - the attention weigths. (required)
    "id": "sample_99" \\ string - a unique id assigned to each sample. (required)
  },
```

Here is an example of a sample in a data file:
```json
{
    "text": [
      "20",
      "episodes",
      "left",
      "i",
      "am",
      "dying",
      "over",
      "here"
    ],
    "label": 0,
    "prediction": 0,
    "posterior": [
      1.6511023044586182,
      0.6472567319869995,
      0.10215002298355103,
      -1.8493231534957886
    ],
    "attention": [
      0.026811618357896805,
      0.03429250791668892,
      0.16327856481075287,
      0.1225932389497757,
      0.14799638092517853,
      0.17938685417175293,
      0.15541180968284607,
      0.1702289879322052,
      0.0,
      0.0,
      ...
      0.0,
      0.0
    ],
    "id": "sample_99"
  },
```



**Multilabel Classification**. 
The structure of the data file for a classification task is the following:
```json
{
    "text": [],       \\ list of strings - the tokens (words, chars) in the text. (required)
    "label": 0,       \\ list of ints - the class labels - binary vector. (required)
    "prediction": 0,  \\ list of ints - the predicted labels - binary vector. (required)
    "posterior": [],  \\ list of floats - the posterior probabilities. (optional)
    "attention": [],  \\ list of floats - the attention weigths. (required)
    "id": "sample_55" \\ string - a unique id assigned to each sample. (required)
  },
```

Here is an example of a sample in a data file:
```json
{
    "text": [
      "<allcaps>",
      "fall",
      "season",
      "starts",
      "today",
      "</allcaps>",
      "!",
      "<repeated>"
    ],
    "label": [
      0,
      1,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      1
    ],
    "prediction": [
      0,
      1,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    "posterior": [
      -2.388745069503784,
      0.4522533118724823,
      -3.0336408615112305,
      -2.2636921405792236,
      1.1948155164718628,
      -2.710108995437622,
      -0.09358435124158859,
      -3.7859573364257812,
      -3.229905605316162,
      -2.832045078277588,
      -2.1722922325134277
    ],
    "attention": [
      0.12348131835460663,
      0.12422706931829453,
      0.12277955561876297,
      0.14215923845767975,
      0.12141828238964081,
      0.12250666320323944,
      0.12207339704036713,
      0.12135452032089233,
      0.0,
      0.0,
      ...
      0.0,
      0.0
    ],
    "id": "TASK1_E-c_dev_144"
  }
```



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
