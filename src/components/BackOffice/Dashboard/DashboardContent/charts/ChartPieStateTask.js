import React from 'react';
import Chart from 'react-apexcharts';

class ChartPieStateTask extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            options: {
                labels: props.dataLabels
            },
            series: props.dataSeries
        }
    }

    render(){
        return(
            <div id="chart-task">
                <h2 className="p-2"> Pourcentage State of Tasks</h2>
                <Chart  options={this.state.options} 
                        series={this.state.series}
                        labels={this.state.labels}
                        type="donut" width="100%" height={350} />
            </div>
        )
    }
}

export default ChartPieStateTask;