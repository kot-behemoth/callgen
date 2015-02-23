var width = 210 * 0.8;
var height = 297 * 0.8;
//var width = 210;
//var height = 297;

var holder = d3.select("body")
    .append("svg")
    .attr('class', 'page')
    .attr("width", width+'mm')
    .attr("height", height+'mm');

d3.select("#save").on("click", function(){
        var svg = d3.select("svg")
            .attr("version", 1.1)
            .attr("title", "file.svg")
            .attr("href-lang", "image/svg+xml")
            .attr("xmlns", "http://www.w3.org/2000/svg");

        var serializer = new XMLSerializer();
        var source = serializer.serializeToString(svg.node());
        //add xml declaration
        source = '<?xml version="1.0"?>' + source;

        var blob = new Blob(
            [source],
            {type: "image/svg+xml;charset=utf-8"}
        );
        saveAs(blob, "cal.svg");
    }
);

// draw d3.js text
holder.append("text")
    .attr("class", "d3js")
    .style("fill", "black")
    .style("font-size", "56px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(300,55) rotate(0)")
    .text("d3.js");

// draw d3noob.org text
holder.append("text")
    .attr("class", "d3noob")
    .style("fill", "black")
    .style("font-size", "56px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(300,130) rotate(0)")
    .text("d3noob.org");

// when the input range changes update the rectangle
d3.select("#nAngle").on("input", function() {
    update(+this.value);
});

// Initial starting height of the rectangle
update(0);

// update the elements
function update(nAngle) {

// adjust the range text
    d3.select("#nAngle-value").text(nAngle);
    d3.select("#nAngle").property("value", nAngle);

    // adjust d3.js text
    holder.select("text.d3js")
        .attr("transform", "translate(300,55) rotate("+nAngle+")");

    // adjust d3noob.org text
    holder.select("text.d3noob")
        .attr("transform", "translate(300,130) rotate("+(360 - nAngle)+")");
}
