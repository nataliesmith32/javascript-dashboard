// console log the data and prepare to map the id's when selected
 
d3.json('samples.json').then((data)=>{
  var id=data.names;
  console.log(data.metadata);
  var select=d3.selectAll('#selDataset');
  Object.entries(id).forEach(([i,v])=>{
      select.append('option').text(v);
  })
})
