import React, {Component, useState} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const Chart = ({displayTitle,displayLegend,legendPosition,chartData}) => {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     chartData:props.chartData
  //   }
  // }



  // static defaultProps = {
  //   displayTitle:true,
  //   displayLegend: true,
  //   legendPosition:'right',
  //   location:'City'
  // }


    return (
      <div className="chart">
        <Bar
          data={chartData}
          options={{
            title:{
              display:displayTitle,
              
              fontSize:25
            },
            legend:{
              display:displayLegend,
              position:legendPosition
            }
          }}
        />

         

        {/* <Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        /> */}
      </div>
    )
  
}

export default Chart;