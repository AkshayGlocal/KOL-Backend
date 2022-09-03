import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
class PieRechartComponent extends React.Component {
   COLORS = [" #FFF1C9", " #F7B7A3", "#EA5F89", " #9B3192", "#57167E",
"#286AB0","#2B0B3F","#F48B94"];
   
   pieData = [
      {
         name: "Press",
         value: 5
      },
      {
         name: "Professional",
         value: 6
      },
      {
         name: "Qualifications",
         value: 3
      },
      {
         name: "Social",
         value: 2
      },
      {
         name: "SocialActivity",
         value: 5
      },
      {
         name:"Trials",
         value: 7
      },
      {
         name:"Publications",
         value:3
      },
      {
         name:"Conference",
         value:5
      }
   ];
   CustomTooltip = ({ active, payload, label }) => {
      if (active) {
         return (
         <div
            className="custom-tooltip"
            style={{
               backgroundColor: "#ffff",
               padding: "5px",
               border: "1px solid #cccc"
            }}
         >
            <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
         </div>
      );
   }
   return null;
};
render() {
   return (
      <PieChart width={530} height={300}>
      <Pie
         data={this.pieData}
         color="#000000"
         dataKey="value"
         nameKey="name"
         cx="50%"
         cy="50%"
         outerRadius={120}
         fill="#8884d8"
      >
         {this.pieData.map((entry, index) => (
            <Cell
               key={`cell-${index}`}
               fill={this.COLORS[index % this.COLORS.length]}
            />
         ))}
      </Pie>
      <Tooltip content={<this.CustomTooltip />} />
      <Legend />
      </PieChart>
      );
   }
}
export default PieRechartComponent;