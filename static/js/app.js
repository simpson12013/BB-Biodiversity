function buildMetadata(sample) {
  metadata = d3.select('#sample-metadata').html("")
  d3.json(`/metadata/${sample}`).then(function(response){
    Object.entries(response).forEach(function([key, value]) {
      metadata.append("div").text(`${key} : ${value}`)
    })
  })
}


function buildCharts(sample) {
  d3.json(`/samples/${sample}`).then(function(response){

    console.log(response.otu_ids.slice(0,9))
    var trace1 = {
      x: response.otu_ids,
      y: response.sample_values,
      mode: "markers",
      type: "scatter",
      name: "high jump",
      marker: {
        color: response.otu_ids,
        size: response.sample_values
      }
    };
    var data1 = [trace1];
  
    var layout1 = {
      title: "Belly Button Cleanliness",
      xaxis: { title: "OTU IDS" },
      yaxis: { title: "Sample Values" }
    };
    Plotly.newPlot("bubble", data1, layout1);

    var trace2 = {
      labels: response.otu_ids.slice(0,9),
      values: response.sample_values.slice(0,9),
      type: 'pie'
    };

    var data2 = [trace2];

    var layout2 = {
      title: "Belly Button, You're So Fine",
    };

    Plotly.newPlot("pie", data2, layout2);
      Object.entries(response).forEach(function([key, value]) {
      })
  })

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
