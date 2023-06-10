// Dane

var data = [];
var names = [];

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
                return xScale(d.axisB + (d.axisA / 2));
            })
            .attr("y", function (d) {
                return yScale(d.axisA) - 10;
            })
            .text(function (d, i) {
                return names[i];
            });
                
    })

    .catch(error => {
        console.error('Error:', error);
    });