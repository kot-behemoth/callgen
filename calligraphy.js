function mm(n){ return n*mm2px; }

// 1 px = 0.265 mm
// (pixels*25.4)/dpi
// standard inkscape setting
// 10 mm = 35.433 px
// mm = (pixels*25.4)/dpi
// px = (pixels*25.4)/dpi
// 10 px = 2.822 mm
var dpi = 90,
    mm2px = dpi/25.4,
    width_mm = 210,
    height_mm = 297,
    width = mm(width_mm),
    height = mm(height_mm),
    hmargin = width * 0.08,
    vmargin = height * 0.05,
    inner_width = width - 2*hmargin,
    inner_height = height - 2*vmargin,

    nib_width = mm(1.5),
    x_height = 5,
    cap_height = 5,
    ascender = 1,
    descender = 1,
    line_spacing = 3,

    bbh = (x_height+ascender+descender+line_spacing)*nib_width,
    n_lines = Math.floor(inner_height/bbh)
    ;

//console.log(n_lines)

var page = d3.select("#page")
    .attr("width", mm(width_mm))
    .attr("height", mm(height_mm));

function translate(x, y) {
    return "translate($$x$$, $$y$$)".replace(
        '$$x$$', x).replace('$$y$$', y)
}

var inner_page = page.append('g')
    .attr("transform", function() {
        return translate(hmargin, vmargin)
    });

//inner_page.append("rect")
//    .attr("id", "inner-page")
//    .attr('width', inner_width)
//    .attr('height', inner_height)
//    .style('stroke', '#ddd')
//    .style('stroke-width', '1px')
//    .style('fill-opacity', 0)
//;

var offsets = d3.range(0, n_lines+1).map(function(l){return l*bbh});

var lines = inner_page.selectAll('g')
    .data(offsets)
    .enter().append('g')
    .attr('transform', function(d) { return translate(0, d); })
;

var bounding_boxes = lines.append('rect')
    .attr('width', inner_width)
    .attr('height', bbh-(line_spacing*nib_width))
    .style('stroke', '#eee')
    .style('stroke-width', '1px')
    .style('fill-opacity', 0)
;

var baselines = lines.append('line')
    .attr('x1', 0)
    .attr('y1', (ascender+x_height)*nib_width)
    .attr('x2', inner_width)
    .attr('y2', (ascender+x_height)*nib_width)
    .style('stroke', '#999')
    .style('stroke-width', '1px')
;

var x_heights = lines.append('line')
        .attr('x1', 0)
        .attr('y1', (ascender)*nib_width)
        .attr('x2', inner_width)
        .attr('y2', (ascender)*nib_width)
        .style('stroke', '#999')
        .style('stroke-width', '1px')
    ;

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
//page.append("text")
//    .attr("class", "d3js")
//    .style("fill", "black")
//    .style("font-size", "56px")
//    .attr("dy", ".35em")
//    .attr("text-anchor", "middle")
//    .attr("transform", "translate(300,55) rotate(0)")
//    .text("d3.js");
//
//// draw d3noob.org text
//page.append("text")
//    .attr("class", "d3noob")
//    .style("fill", "black")
//    .style("font-size", "56px")
//    .attr("dy", ".35em")
//    .attr("text-anchor", "middle")
//    .attr("transform", "translate(300,130) rotate(0)")
//    .text("d3noob.org");

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
    page.select("text.d3js")
        .attr("transform", "translate(300,55) rotate("+nAngle+")");

    // adjust d3noob.org text
    page.select("text.d3noob")
        .attr("transform", "translate(300,130) rotate("+(360 - nAngle)+")");
}
