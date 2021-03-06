import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const Chart = ({type,displayTitle,displayLegend,legendPosition,chartData}) => {

    return (
       <div className="chart">
        {type === 'bar' ? <Bar
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
          
        : type === 'line'
        ? <Line
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
        : <Pie
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
        }
      </div>
    )
         

    
    
  }
  
  
export default Chart;

//  <Line
//     data={this.state.chartData}
//     options={{
//       title:{
//         display:this.props.displayTitle,
//         text:'Largest Cities In '+this.props.location,
//         fontSize:25
//       },
//       legend:{
//         display:this.props.displayLegend,
//         position:this.props.legendPosition
//       }
//     }}
//   />

//   <Pie
//     data={this.state.chartData}
//     options={{
//       title:{
//         display:this.props.displayTitle,
//         text:'Largest Cities In '+this.props.location,
//         fontSize:25
//       },
//       legend:{
//         display:this.props.displayLegend,
//         position:this.props.legendPosition
//       }
//     }}
//   /> 