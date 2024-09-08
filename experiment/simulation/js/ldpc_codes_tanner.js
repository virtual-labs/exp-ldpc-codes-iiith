// set of H matrices for LDPC codes

const setOfH = [
    [
        [1, 0, 1, 0, 1],  // Parity-check 1
        [0, 1, 1, 1, 0],  // Parity-check 2
        [1, 1, 0, 1, 0],  // Parity-check 3
    ],
    [
        [1, 0, 1, 0, 1, 1, 0],  // Parity-check 1
        [0, 1, 1, 1, 0, 0, 1],  // Parity-check 2
        [1, 1, 0, 1, 0, 0, 0],  // Parity-check 3
    ],
    [
        [1, 0, 1, 0, 1, 1, 0, 0, 0],  // Parity-check 1
        [0, 1, 1, 1, 0, 0, 1, 0, 0],  // Parity-check 2
        [1, 1, 0, 1, 0, 0, 0, 1, 0],  // Parity-check 3
        [1, 0, 0, 0, 1, 0, 0, 0, 1],  // Parity-check 4
    ],
];

// select a random H matrix

const H = setOfH[Math.floor(Math.random() * setOfH.length)];

// SVG dimensions
const width = 600;
const height = 400;
const nodeRadius = 10;
const bitXShiftLabel = 40;
const checkXShiftLabel = 15;
const yLabelShift = 5;

// Append an SVG element to the #sentCodeword element
const svg = d3.select("#sentCodeword")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Define layout variables
const bitNodeStartX = 100;
const bitNodeSpacingY = 80;
const checkNodeStartX = 500;
const checkNodeSpacingY = 100;
const verticalOffset = 50;

// Define variable nodes (bits) and check nodes (parity checks)
const bitNodes = H[0].map((_, j) => ({
    id: "bit" + j,
    type: "bit",
    x: bitNodeStartX,
    y: j * bitNodeSpacingY + verticalOffset
}));

const checkNodes = H.map((_, i) => ({
    id: "check" + i,
    type: "check",
    x: checkNodeStartX,
    y: i * checkNodeSpacingY + verticalOffset
}));

const nodes = [...bitNodes, ...checkNodes];


// Create links (edges) between bits and checks based on H matrix
const links = [];
H.forEach((row, i) => {
    row.forEach((val, j) => {
        if (val === 1) {
            links.push({ source: "bit" + j, target: "check" + i });
        }
    });
});

// Add the links to the SVG
const link = svg.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
    .attr("stroke-width", 2)
    .attr("stroke", "#999");

// Add the nodes to the SVG
const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", nodeRadius)
    .attr("fill", d => d.type === "bit" ? "blue" : "green")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

// Add labels for the nodes
const labels = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter().append("text")
    .attr("x", d => d.type === "bit" ? d.x - nodeRadius - bitXShiftLabel : d.x + nodeRadius + checkXShiftLabel) // Shift labels based on node type
    .attr("y", d => d.y + yLabelShift)
    .text(d => d.id);

// Update the positions of the links
function updateLinks() {
    link.attr("x1", d => bitNodes.find(n => n.id === d.source).x)
        .attr("y1", d => bitNodes.find(n => n.id === d.source).y)
        .attr("x2", d => checkNodes.find(n => n.id === d.target).x)
        .attr("y2", d => checkNodes.find(n => n.id === d.target).y);
}

// Drag behavior functions
function dragstarted(event, d) {
    if (!event.active) {
        d3.select(this).raise().attr("stroke", "black");
    }
}

function dragged(event, d) {
    // Update x and y positions freely as the node is dragged
    d.x = event.x;
    d.y = event.y;

    // Update node positions
    d3.select(this)
        .attr("cx", d.x)
        .attr("cy", d.y);

    // Update labels positions
    labels.filter(l => l.id === d.id)
        .attr("x", d.type === "bit" ? d.x - nodeRadius - bitXShiftLabel : d.x + nodeRadius + checkXShiftLabel)
        .attr("y", d.y + yLabelShift);

    // Update the links connected to this node
    updateLinks();
}

function dragended(event, d) {
    d3.select(this).attr("stroke", null);
}

function adjustSVGSize() {
    // Get minimum and maximum x and y coordinates of the nodes
    const xValues = nodes.map(d => d.x);
    const yValues = nodes.map(d => d.y);
    
    const minX = Math.min(...xValues) - nodeRadius;
    const maxX = Math.max(...xValues) + nodeRadius;
    const minY = Math.min(...yValues) - nodeRadius;
    const maxY = Math.max(...yValues) + nodeRadius;

    // Calculate the width and height of the bounding box around the nodes
    const graphWidth = maxX - minX;
    const graphHeight = maxY - minY;

    // Ensure minimum SVG dimensions (so it doesn't shrink too much)
    const newWidth = Math.max(graphWidth, width);
    const newHeight = Math.max(graphHeight, height);

    // Calculate the offset to center the graph
    const offsetX = (newWidth - graphWidth) / 2;
    const offsetY = (newHeight - graphHeight) / 2;

    // Adjust the SVG width and height based on new dimensions
    svg.attr("width", newWidth).attr("height", newHeight);

    // Translate all elements to center the graph within the viewBox
    svg.attr("viewBox", `${minX - offsetX} ${minY - offsetY} ${newWidth} ${newHeight}`);
}


// Initial call to update links based on static positions
updateLinks();
adjustSVGSize();
