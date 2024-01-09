class Graph {
    constructor (width, height) {
        this.div = document.getElementsByClassName("ossop");
        this.width = this.declare_width(this.div);
        this.height = this.declare_height(this.div);;
        this.data;
        this.names;
        this.svg = this.draw_triangle(this.height, this.width);
        this.defs = svg.append("defs"); 
        this.gradient = this.add_gradient(defs);
    }

    declare_height (div) {
        var div_width = div.offsetWidth;
        var width = div_width * 0.9;

        return width;
    }

    declare_height (div) {
        var div_height = div.offsetHeight;
        var height = div_height * 0.9;

        return height;
    }

    draw_triangle (height, width) {
        // Scale
        var xScale = d3.scaleLinear().range([0, width]).domain([0, 1]);
        var yScale = d3.scaleLinear().range([height, 0]).domain([0, 1]); 
    
        // Triangle
        var trianglePoints = [[xScale(0), yScale(0)], 
                            [xScale(1), yScale(0)],
                            [xScale(0.5), yScale(1)]];
    
        svg.append('polygon')
            .attr('id', 'trojkat')
            .attr('points', trianglePoints)
            .style('fill', "url(#svgGradient)");

        return svg;
    }

    add_gradient (defs) {
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
    }

    write_corners (svg) {
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
    }

    // Very primitive and unsafe data storage
    // However I'm retarded
    print_data (svg) {
        fetch('data/opinions.json')
            .then(response => response.json())
            .then(input => {

                input.forEach(element => {
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
                
                // Print data
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


                // Subtitle points
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
    }
}

var graph = new Graph;

graph.write_corners(graph.svg);
graph.print_data(graph.svg);

function resize_graph() {
    graph.declare_height(graph.div)
    graph.declare_height(graph.div)
    graph.draw_triangle(graph.height, graph.width);
    graph.add_gradient(graph.defs);
    graph.write_corners(graph.svg);
    graph.print_data(graph.svg);
}

addEventListener("resize", resize_graph());