import React  from "react";
import { ResponsivePie } from "@nivo/pie";
export default function ExampleChart(props) {
    let press = props.press;
    let professional = props.professional;
    let social = props.social;
    let qualifications = props.qualifications;
    let socialactivity = props.socialactivity;
    let trials= props.trials;
    let publications = props.publications;
    let conference = props.conference;
    const data = [
        {
          id: "press",
          label: "press",
          value: press,
          color: "hsl(271, 70%, 50%)"
        },
        {
          id: "profession",
          label: "profession",
          value: professional,
          color: "hsl(292, 70%, 50%)"
        },
        {
          id: "social",
          label: "social",
          value: social,
          color: "hsl(47, 70%, 50%)"
        },
        {
          id: "qualifications",
          label: "qualifications",
          value: qualifications,
          color: "hsl(33, 70%, 50%)"
        },
        {
          id: "socialactivity",
          label: "socialactivity",
          value: socialactivity,
          color: "hsl(268, 70%, 50%)"
        },
        {
          id: "trials",
          label: "trials",
          value: trials,
          color: "hsl(20, 70%, 50%)"
        },
        {
          id: "publications",
          label: "publications",
          value: publications,
          color: "hsl(283, 70%, 50%)"
        },
        {
          id: "conference",
          label: "conference",
          value: conference,
          color: "hsl(33, 70%, 50%)"
        },
      ];
      
    return (
      <div style={{ width: 400, height: 300 }}>
        <MyResponsivePie data={data} />
      </div>
    );
  }

const MyResponsivePie = ({ data }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "nivo" }}
    borderWidth={1}
    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextColor="#333333"
    radialLabelsLinkColor={{ from: "color" }}
    sliceLabelsSkipAngle={10}
    sliceLabelsTextColor="#333333"
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        size: 4,
        padding: 1,
        stagger: true
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "rgba(255, 255, 255, 0.3)",
        rotation: -45,
        lineWidth: 6,
        spacing: 10
      }
    ]}
    fill={[
      {
        match: {
          id: "profession"
        },
        id: "dots"
      },
      
      {
        match: {
          id: "press"
        },
        id: "lines"
      }
     
    ]}
    
    
  />
);
