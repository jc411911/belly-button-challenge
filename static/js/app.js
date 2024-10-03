// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Metadata JSON Data:", data);

    // get the metadata field
    const metadata = data.metadata;
    console.log("Metadata:", metadata);

    // Filter the metadata for the object with the desired sample number
    const resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0];
    console.log("Filtered Metadata Result:", result);

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Loop through each key-value pair in the metadata and append to the panel
    Object.entries(result).forEach(([key, value]) => {
      const text = `${key.toUpperCase()}: ${value}`;
      panel.append("h6").text(text);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Samples JSON Data:", data);

    // Get the samples field
    const samples = data.samples;
    console.log("Samples:", samples);

    // Filter the samples for the object with the desired sample number
    const resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    const result = resultArray[0];
    console.log("Filtered Samples Result:", result);

    // Get the otu_ids, otu_labels, and sample_values
    const otu_ids = result.otu_ids;
    const otu_labels = result.otu_labels;
    const sample_values = result.sample_values;
    console.log("OTU IDs:", otu_ids);
    console.log("OTU Labels:", otu_labels);
    console.log("Sample Values:", sample_values);

    // Build a Bubble Chart
    const bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    }];

    const bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      margin: { t: 0 },
      hovermode: 'closest',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      margin: { t: 30}
    };

    // Render the Bubble Chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Build a Bar Chart
    const barData = [{
      y: yticks,
      x: sample_values.slice(0, 10).reverse(),
      text: otu_labels.slice(0, 10).reverse(),
      type: 'bar',
      orientation: 'h',
    }];

    const barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: { title: 'Number of Bacteria' },
      margin: { t: 30, l: 150 }
    };

    // Render the Bar Chart
    Plotly.newPlot('bar', barData, barLayout);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    console.log("Initialization JSON Data:", data);

    // Get the names field
    const sampleNames = data.names;
    console.log("Sample Names:", sampleNames);

    // Use d3 to select the dropdown with id of `#selDataset`
    const selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Get the first sample from the list
    const firstSample = sampleNames[0];
    console.log("First Sample:", firstSample);

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

// Function for event listener
function optionChanged(newSample) {
  console.log("New Sample Selected:", newSample);
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();