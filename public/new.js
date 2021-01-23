window.addEventListener( "load", function () {
  function fetchProjectData() {
    const projectId = projectIdElt.value;
    console.log("projectId: ", projectId);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var res = JSON.parse(this.responseText);
        console.log(res);
        showData(res);
      }
    };
    xmlhttp.open("GET", "/categories/" + projectId, true);
    xmlhttp.send();
  }

  // Access the form element...
  const projectIdElt = document.getElementById("projectId");
  const projectIdForm = document.getElementById("projectIdForm");

  if (projectIdElt.value != "enter project id") {
    fetchProjectData();
  }

  // ...and take over its submit event.
  projectIdForm.addEventListener( "submit", function ( event ) {
    event.preventDefault();
    fetchProjectData();
  } );

} );

function showData(alldata) {
  const data = alldata.categories;
  const total = 'Total blocks: ' + alldata.total;
  d3.selectAll("svg").remove();

 const width = 600,
        height = 400,
        radius = Math.min(width, height) / 2;

    const svg = d3
        .select('#container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Set the category colors
    const color = d3.scaleOrdinal().domain(["motion", "looks", "sound", "event",   "control", "sensing", "operator", "data", "procedures", "music", "videoSensing", "tts", "translate"])
                                   .range(["#4c97ff", "#9966ff", "#d65cd6", "#ffbf00", "#ffab19", "#4cbfe6", "#40bf4a", "#ff8c1a", "#ff6680", "#0fbd8c", "#0fbd8c", "#0fbd8c", "#0fbd8c"]);

    const pie = d3
        .pie()
  //      .padAngle(0.005)
        .sort(null)
        .value(d => d.count);

    const arc = d3
        .arc()
        .outerRadius(radius - 20)
        .innerRadius(radius - 100);

    const arcs = pie(data.filter(d => d.count > 0));

    /* ------- PIE SLICES -------*/
    const tip = d3
        .tip()
        .attr('class', 'd3-tip')
        .html(function(d) {
            return d;
        });
    svg.call(tip);

    var g = svg
        .selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'normal')
        .attr('font-size', 16)
        .text(total);

    var scratchblocks = window.scratchblocks;

    g.append('path')
        .attr('d', arc)
        .style('fill', function(d) {
            return color(d.data.name);
        })
        .on('mouseover', d => {
            console.log(d.data.name);
            const blockContainer = document.getElementById('blocks');
            const shapeBlocks = data.filter(b => b.name === d.data.name).pop();
            shapeBlocksHTMLString = `<h2 style="font-family: sans-serif;">${d.data.name} </h2>`;
            Object.entries(shapeBlocks.blocks).forEach(([k, v]) => {
                //var blockscode = opcode2sb[k];
                var blockscode = k;
                shapeBlocksHTMLString += `<div style="display: flex; align-items: top;clear:both"><div style="font-family: sans-serif; font-size: large; float:left; margin-top:10px; font-weight: bold;">${v}&nbsp;*&nbsp;</div><pre class="blocks" style="margin: 0px; padding: 0px; float:left; margin-right:20px;">${blockscode}</pre> </div>`;
            });
            blockContainer.innerHTML = shapeBlocksHTMLString;
            scratchblocks.renderMatching('pre.blocks', {
              style:     'scratch3',   // Optional, defaults to 'scratch2'.
              languages: ['en'], // Optional, defaults to ['en'].
            });
          
        });

    /* ------- TEXT IN PIE SLICES -------*/

    svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .selectAll('text')
        .data(arcs)
        .join('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .call(text =>
            text
                .append('tspan')
                .attr('y', '-0.4em')
                .attr('font-weight', 'bold')
                .attr('fill', 'white')
                .text(d => d.data.name),
        )
        .call(text =>
            text
                .filter(d => d.endAngle - d.startAngle > 0.25)
                .append('tspan')
                .attr('x', 0)
                .attr('y', '0.7em')
                .attr('fill-opacity', 0.7)
                .attr('font-weight', 'bold')
                .attr('font-size', 14)
                .attr('fill', 'white')
                .text(d => d.data.count),
        );

    // Show project title
    const project = alldata.project;
    // json does not include project name
    // Can get it if you know username: https://api.scratch.mit.edu/users/drgardner/projects/474838099
    const title = document.getElementById('projecttitle');
    title.innerHTML = `${project}`;

    // Show embedded project
    
    document.getElementById("seeinside").innerHTML = `<a href="https://scratch.mit.edu/projects/${project}/editor/" target="_blank">See Inside</a>` ;

    document.getElementById("scratchembed").innerHTML = `<iframe src="https://scratch.mit.edu/projects/${project}/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
    
    // Show scripts for project
    const scripts = alldata.scripts;
    const scriptcode = document.getElementById('scripts');
   // const scriptblocks = document.getElementById('scriptblocks');
    var blockscode = "";

    console.log(scripts);

    for (const script in scripts) {
      sprite = scripts[script]['name'];
      scriptscode = scripts[script]['scripts'];
      blockscode += `<h2>${sprite}</h2><div style="display: flex"><pre class="defaultblocks" id="scriptblocks" style="padding-right: 30px;">${scriptscode}</pre><pre style="font-size: 16px; font-family: monospace;" >${scriptscode}</pre></div>`;
    }

    scriptcode.innerHTML = blockscode;

    scratchblocks.renderMatching('pre.defaultblocks', {
              //inline: true,
              style:     'scratch3',   // Optional, defaults to 'scratch2'.
              languages: ['en'], // Optional, defaults to ['en'].
            });
    
}