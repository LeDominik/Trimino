// Trimino :-)
(function() {
    'use strict';
    
    var width  = 	document.getElementById('chart').offsetWidth;
    var height = 	(window.innerHeight	|| html.clientHeight || body.clientHeight || screen.availHeight) - document.getElementById('footer').offsetHeight - 30;
    var s =  Math.min(height, width); 	//triangle side length
    
    var yhigh = Math.pow(3,1/2);

    var scalex = width / 8;
    var scaley = height / 8;
    
    scalex = Math.min(width/10, height/yhigh/5);
    scaley = scalex;
    
    width = scalex * 5;
    height = scaley * yhigh * 5;
    
    /* 
     * triangle with left "edge" at cx, cy 
     */
    function triangle(cx, cy, up) {
        svg.append('polygon')
           .attr('fill', 'white')
           .attr('stroke', 'black')
           .attr('points', (cx) + ',' + (cy) + ' ' +
                           (cx + scalex*2) + ',' + (cy) + ' ' +
                           (cx + scalex*1) + ',' + 
                           (up ? (cy - scaley*yhigh) : (cy + scaley*yhigh)));
    }


    //adds svg & g elements to page so zooming will work
    var svg = d3.select("#chart")
      .append("svg:svg")
        .attr("width", width)
        .attr("height", height);

    svg.append('svg:rect')
        .attr('width', width)
        .attr('height', height)
        .attr('fill', 'white');
    
    function full(cx, cy, alpha, texts) {
        var g = svg
            .append('g')
                .attr('transform', 'translate(' + cx + ', ' + cy + ')')
            .append('g')
                .attr('transform', 'rotate(' + alpha + ')');
        
        g.append('svg:polygon')
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .attr('points', (-scalex) + ',' + (+scaley*yhigh/3) + ' ' +
                            (+scalex) + ',' + (+scaley*yhigh/3) + ' ' +
                            (0)       + ',' + (-scaley*yhigh/3*2) );               
        
        g.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', yhigh / 3 *scaley - 10)
            .text(texts[0])
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(0)');
        g.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', yhigh / 3 *scaley - 10)
            .text(texts[1])
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(120)');
        g.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', yhigh / 3 *scaley - 10)
            .text(texts[2])
            .attr('text-anchor', 'middle')
            .attr('transform', 'rotate(-120)');
        
        g.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .text('o')
            .attr('text-anchor', 'middle');
    }
    
    var pairs = [
        ['uno', 'eins'],
        ['dos', 'zwei'],
        ['tres', 'drei'],
        ['cuatro', 'vier'],
        ['cinco', 'fünf'],
        ['seis', 'sechs'],
        ['siete', 'sieben'],
        ['ocho', 'acht'],
        ['nueve', 'neun'],
        ['diez', 'zehn'],
        ['once', 'elf'],
        ['doce', 'zwölf']
    ];

    var left = scalex / 2;
    var top = scaley / yhigh / 2;
    
    svg.append('text')
        .attr('x', left + 2*scalex)
        .attr('y', top  - scaley/10*yhigh)
        .text('Alles Gute zum Muttertag!')
        .attr('text-anchor', 'middle');
    
    // up, starting in the middle with 180° rotation, clockwise
    full(left + 2*scalex, top + 0*scaley*yhigh + scaley*1*yhigh/3, 180, [pairs[0][0], pairs[1][0], pairs[2][0]]);
    full(left + 3*scalex, top + 0*scaley*yhigh + scaley*2*yhigh/3,   0, [pairs[3][1], pairs[1][1], pairs[4][1]]);
    full(left + 3*scalex, top + 1*scaley*yhigh + scaley*1*yhigh/3, 180, [pairs[3][0], pairs[5][0], pairs[6][0]]);
    full(left + 2*scalex, top + 1*scaley*yhigh + scaley*2*yhigh/3,   0, [pairs[7][1], pairs[8][1], pairs[6][1]]);
    full(left + 1*scalex, top + 1*scaley*yhigh + scaley*1*yhigh/3, 180, [pairs[9][0], pairs[8][0], pairs[10][0]]);
    full(left + 1*scalex, top + 0*scaley*yhigh + scaley*2*yhigh/3,   0, [pairs[9][1], pairs[10][1], pairs[2][1]]);

    top = top + 2*scaley*yhigh;
    full(left + 2*scalex, top + 0*scaley*yhigh + scaley*1*yhigh/3, 180, [pairs[7][0], ''         , ''         ]);
    full(left + 3*scalex, top + 0*scaley*yhigh + scaley*2*yhigh/3,   0, [''         , ''         , pairs[5][1]]);
    full(left + 3*scalex, top + 1*scaley*yhigh + scaley*1*yhigh/3, 180, [''         , pairs[4][0], ''         ]);
    full(left + 2*scalex, top + 1*scaley*yhigh + scaley*2*yhigh/3,   0, [pairs[0][1], ''         , ''         ]);
    full(left + 1*scalex, top + 1*scaley*yhigh + scaley*1*yhigh/3, 180, [''         , ''         , pairs[11][0]]);
    full(left + 1*scalex, top + 0*scaley*yhigh + scaley*2*yhigh/3,   0, [''         , pairs[11][1], ''         ]);
    
}());
