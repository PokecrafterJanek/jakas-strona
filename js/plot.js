// Dane

var data = [
    { axisA: 0.3, axisB: 0.5, axisC: 1 },
    { axisA: 0.6, axisB: 0.1, axisC: 0.3 },  
];
  
// Kontener

var margin = { top: 40, right: 60, bottom: 40, left: 60 };
var width = (window.innerWidth * 0.6) - margin.left - margin.right;
var height = (window.innerHeight * 0.75) - margin.top - margin.bottom;
  
var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
// Skala

var xScale = d3.scaleLinear().range([0, width]).domain([0, 1]);
var yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]);
  
// Kreski

svg.append("line")
    .attr("x1", xScale(0))
    .attr("y1", yScale(0))
    .attr("x2", xScale(1))
    .attr("y2", yScale(0))
    .attr("stroke", "black")
    .attr("stroke-width", 2);
  
svg.append("line")
    .attr("x1", xScale(1))
    .attr("y1", yScale(0))
    .attr("x2", xScale(0.5))
    .attr("y2", yScale(1))
    .attr("stroke", "black")
    .attr("stroke-width", 2);
  
svg.append("line")
    .attr("x1", xScale(0.5))
    .attr("y1", yScale(1))
    .attr("x2", xScale(0))
    .attr("y2", yScale(0))
    .attr("stroke", "black")
    .attr("stroke-width", 2);
  
// Podpisy

svg.append("text")
    .attr("x", xScale(-0.02))
    .attr("y", yScale(0) + 15)
    .text("Baza");
  
svg.append("text")
    .attr("x", xScale(1))
    .attr("y", yScale(0) + 15)
    .text("Nuda");
  
svg.append("text")
    .attr("x", xScale(0.495))
    .attr("y", yScale(1) - 10)
    .text("SS");
  
// Wypisz Dane

svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return xScale(d.axisA * (1 - d.axisC / 2));
    })
    .attr("cy", function (d) {
        return yScale(d.axisB * (1 - d.axisC / 2));
    })
    .attr("r", 5);


// Podpisy punktow

svg.selectAll("text.data-label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "data-label")
    .attr("x", function (d) {
        return xScale(d.axisA * (1 - d.axisC / 2));
    })
    .attr("y", function (d) {
        return yScale(d.axisB * (1 - d.axisC / 2)) - 10;
    })
    .text(function (d, i) {
        return "Point " + i;
    });  