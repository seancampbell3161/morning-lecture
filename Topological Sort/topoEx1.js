const Deque = require('./collections/deque');

function topological_sort(vertices, edges) {
    const sortedOrder = [];
    if(vertices <= 0) {
        return sortedOrder;
    }

    // a. initialize the graph
    const inDegree = Array(vertices).fill(0); // count of incoming edges
    const graph = Array(vertices).fill(0).map(() => Array()); // adjacency list graph

    // b. build the graph
    edges.forEach((edge) => {
        let parent = edge[0],
            child = edge[1];
        graph[parent].push(child);
        inDegree[child]++;
    });

    // c. inc al asources i.e. all vertices with 0 in-degrees
    const sources = new Deque();
    for(i = 0; i < inDegree.length; i++) {
        if(inDegree[i] === 0) {
            sources.push(i);
        }
    }

    // d. for each source, add it to the sortedOrder and subtract one from all of its children's
    // in-degrees. If a child's in-degree becomes 0, add it to the sources queue
    while(sources.length > 0) {
        const vertex = sources.shift();
        sortedOrder.push(vertex);
        graph[vertex].forEach((child) => {
            inDegree[child] -= 1;
            if(inDegree[child] === 0) {
                sources.push(child);
            }
        });
    }

    // topological sort is not possible as the graph has a cycle
    if(sortedOrder.length !== vertices) {
        return [];
    }

    return sortedOrder;
}