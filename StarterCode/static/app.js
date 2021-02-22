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
        var samples=data.samples;
        var testNum=samples.map(row=>row.id).indexOf(testId);
        // Make bar plot
        var otuValueTen=samples.map(row=>row.sample_values);
        var otuValueTen=otuValueTen[testNum].slice(0,10).reverse();
        var otuIdTen=samples.map(row=>row.otu_ids);
        var otuIdTen=otuIdTen[testNum].slice(0,10);
        var otuLabelTen=samples.map(row=>row.otu_labels); 
        var otuLabelTen=otuLabelTen[testNum].slice(0,10); 
        var trace={
            x: otuValueTen,
            y: otuIdTen.map(r=>`UTO ${r}`),
            text: otuLabelTen,
            type:'bar',
            orientation:'h'
        }
        Plotly.newPlot('bar',[trace]);
        // make bubble chart
        var otuValue=samples.map(row=>row.sample_values);
        var otuValue=otuValue[testNum];
        var otuId=samples.map(row=>row.otu_ids);
        var otuId=otuId[testNum];
        var otuLabel=samples.map(row=>row.otu_labels); 
        var otuLabel=otuLabel[testNum];
        var minIds=d3.min(otuId);
        var maxIds=d3.max(otuId);
        var mapNr = d3.scaleLinear().domain([minIds, maxIds]).range([0, 1]);
        var bubbleColors = otuId.map( val => d3.interpolateRgbBasis(["royalblue", "greenyellow", "goldenrod"])(mapNr(val)));
        var trace1={
            x: otuId,
            y: otuValue,
            text: otuLabel,
            mode: 'markers',
            marker: {
                color: bubbleColors,
                size: otuValue.map(x=>x*10),
                sizemode: 'area'
            }
        };
        var data1=[trace1];
        var bubbleLayout={
            xaxis:{
                autochange: true,
                height: 600,
                width: 1000,
                title: {
                    text: 'OTU ID'
                }
            },
        };
        Plotly.newPlot('bubble',data1,bubbleLayout);   
   
      
