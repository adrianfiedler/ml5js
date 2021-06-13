let model;
let targetLabel = "C";
let state = "collection";

function setup() {
  createCanvas(400, 400);

  let options = {
    inputs: ["x", "y"],
    outputs: ["label"],
    task: "classification",
    debug: true,
  };

  model = ml5.neuralNetwork(options);
}

function draw() {
  // background(255);
}

function keyPressed() {
  if (key == "t") {
    state = "training";
    model.normalizeData();
    let options = {
      epochs: 200,
    };
    model.train(options, whileTraining, finishedTraining);
  } else {
    targetLabel = key;
  }
}

function whileTraining(epoch, loss) {
  console.log(epoch);
}

function finishedTraining() {
  console.log("finished training.");
  state = "prediction";
}
function mouseClicked() {
  let inputs = {
    x: mouseX,
    y: mouseY,
  };

  if (state == "collection") {
    let target = {
      label: targetLabel,
    };
    model.addData(inputs, target);
    ellipse(mouseX, mouseY, 24);
    textAlign(CENTER, CENTER);
    text(targetLabel, mouseX, mouseY);
  } else {
    model.classify(inputs, gotResults);
  }
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
    return;
  }
  console.table(results);
}
