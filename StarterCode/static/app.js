// console log the data and prepare to map the id's when selected
 
d3.json('samples.json').then((data)=>{
  var id=data.names;
  console.log(data.metadata);
  var select=d3.selectAll('#selDataset');
  Object.entries(id).forEach(([i,v])=>{
      select.append('option').text(v);
  })
})

// make the plot with selected test id and pull in data
function makePlot(testId){
    d3.json('samples.json').then((data)=>{
        // This is the array
        var samples=data.samples;
        var testNum=samples.map(row=>row.id).indexOf(testId);
        // Make bar plot
        var otuValueTen=samples.map(row=>row.sample_values);
        var otuValueTen=otuValueTen[testNum].slice(0,10).reverse();
        var otuIdTen=samples.map(row=>row.otu_ids);
        var otuIdTen=otuIdTen[testNum].slice(0,10);
      
