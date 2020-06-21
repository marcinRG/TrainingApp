import React, {useRef,useEffect} from 'react';
import {createChart} from '../utilsAndSettings/d3.utils';

export function PieChartComponent(props) {

        const  svgRef = useRef();

        useEffect(
            ()=>{
                // svgRef.current = createChart(svgRef.current,
                //     transformInputData(props.values), props.chartProperties, createPieChart);
            },[]
        );

        return (
            <div className="chart-component">
                <label className="chart-title">Chart title</label>
                <svg ref={svgRef} className="chart-svg" xmlns="http://www.w3.org/2000/svg" width="500"
                     height="500" viewBox="0 0 500 500">
                </svg>
            </div>
        )
}
