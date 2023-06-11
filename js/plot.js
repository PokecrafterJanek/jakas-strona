// Dane

var data = [];
var names = [];

var margin = { top: 40, right: 60, bottom: 40, left: 60 };
var width = (window.innerWidth * 0.6) - margin.left - margin.right;
var height = (window.innerWidth * 0.4) - margin.top - margin.bottom;
        
var svg = d3
    .select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        

var defs = svg.append("defs");

// Gradient

var gradient = defs.append("radialGradient")
    .attr("id", "svgGradient")
    .attr("cx", "0%")
    .attr("cy", "100%")
    .attr("r", "70%");

gradient.append("stop")
.attr('class', 'start')
.attr("offset", "60%")
.attr("stop-color", "blue");

gradient.append("stop")
    .attr('class', 'end')
    .attr("offset", "100%")
    .attr("stop-color", "red");

// Skala

var xScale = d3.scaleLinear().range([0, width]).domain([0, 1]);
var yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]); 

// Trojkat

var trianglePoints = [[xScale(0), yScale(0)], [xScale(1), yScale(0)],[xScale(0.5), yScale(1)]];

console.log(trianglePoints);

svg.append('polygon')
    .attr('id', 'trojkat')
    .attr('points', trianglePoints)
    .style('fill', "url(#svgGradient)");
    
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

fetch('data/opinions.json')
    .then(response =>  response.json())
    .then(input => {

        Object.values(input).forEach(element => {
            const name = element.Name;
            var baza = element.Baza;
            var nuda = element.Nuda;
            var ss = element.SS;
        
            if (baza == 0 && nuda == 0 && ss == 0) {
                data.push({axisA: 0, axisB: 0, axisC: 0});
            } else {
                data.push({axisA: ss/(baza + nuda + ss), axisB: nuda/(baza + nuda + ss), axisC: baza/(baza + nuda + ss)});
            }

            names.push(name);
        });
        
        // Wypisz Dane

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return xScale(d.axisB + (d.axisA / 2));
            })
            .attr("cy", function (d) {
                return yScale(d.axisA);
            })
            .attr("r", 5);


        // Podpisy punktow

        svg.selectAll("text.data-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "data-label")
            .attr("x", function (d) {
                return xScale(d.axisB + (d.axisA / 2) + 0.01);
            })
            .attr("y", function (d) {
                return yScale(d.axisA) + 5;
            })
            .text(function (d, i) {
                return names[i];
            });
                
    })

    .catch(error => {
        console.error('Error:', error);
    });