import React from 'react';
import ReactApexChart from "react-apexcharts";

class ChartTaskByProjects extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            series: [{
              name: 'Task\'s number',
              data: props.dataCountTasks
            }],
            options: {
              chart: {
                height: 350,
                type: 'bar',
                events: {
                  click: function(chart, w, e) {
                    // console.log(chart, w, e)
                  }
                }
              },
              plotOptions: {
                bar: {
                  columnWidth: '45%',
                  distributed: true
                }
              },
              dataLabels: {
                enabled: false
              },
              legend: {
                show: false
              },
              xaxis: {
                categories: props.dataProjectName,
                labels: {
                  style: {
                    fontSize: '12px'
                  }
                }
              }
            }
        };
    }

    render(){
        return(
            <div id="chart-task">
                <h2 className="p-2"> Tasks number by project </h2>
                <ReactApexChart 
                    options={this.state.options} 
                    series={this.state.series} 
                    type="bar" height={350} />
            </div>
        )
    }
}

export default ChartTaskByProjects;