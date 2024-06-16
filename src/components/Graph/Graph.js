import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import GraphSelector from './GraphSelector/GraphSelector';

const Graph = ({ data }) => {
    const svgRef = useRef();
    const [selectedGraphs, setSelectedGraphs] = useState(['max', 'avg', 'min']);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const width = 960;
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 50, left: 70 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const parseDate = d3.timeParse("%Y-%m-%d");
        const formatMonth = d3.timeFormat("%B");

        const aggregatedData = d3.rollup(data,
            v => ({
                max: d3.max(v, d => +d.RH),
                avg: d3.mean(v, d => +d.RH),
                min: d3.min(v, d => +d.RH)
            }),
            d => formatMonth(parseDate(d.Date))
        );

        const formattedData = Array.from(aggregatedData, ([key, value]) => ({
            month: key,
            max: value.max,
            avg: value.avg,
            min: value.min
        }));

        formattedData.sort((a, b) => d3.ascending(parseDate(a.month), parseDate(b.month)));

        const x = d3.scaleBand()
            .domain(formattedData.map(d => d.month))
            .range([0, innerWidth])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(formattedData, d => d3.max(selectedGraphs.map(graph => d[graph])))])
            .nice()
            .range([innerHeight, 0]);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        selectedGraphs.forEach(graph => {
            chartGroup.append("path")
                .datum(formattedData)
                .attr("class", `line-${graph}`)
                .attr("d", d3.line()
                    .x(d => x(d.month) + x.bandwidth() / 2)
                    .y(d => y(d[graph])))
                .attr("fill", "none")
                .attr("stroke-width", 2)
                .attr("stroke", graphColors[graph]);
        });

        chartGroup.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll(".tick text")
            .style("text-anchor", "middle")
            .attr("dy", "1em");

        chartGroup.append("text")
            .attr("class", "axis-label")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + margin.bottom - 5)
            .attr("text-anchor", "middle")

        chartGroup.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", "12px");

        chartGroup.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -margin.left + 12)
            .attr("text-anchor", "middle")
            .text("Относительная влажность");

    }, [data, selectedGraphs]);

    const handleGraphToggle = (graph) => {
        if (selectedGraphs.includes(graph)) {
            setSelectedGraphs(selectedGraphs.filter(g => g !== graph));
        } else {
            setSelectedGraphs([...selectedGraphs, graph]);
        }
    };

    const graphColors = {
        max: 'green',
        avg: 'blue',
        min: 'red'
    };


    return (
        <div>
            <svg ref={svgRef} width="960" height="500"></svg>
            <GraphSelector
                graphs={selectedGraphs}
                handleGraphToggle={handleGraphToggle}
                graphColors={graphColors}
            />
        </div>
    );
};

export default Graph;
