import React, {useState, useEffect} from 'react';
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar} from 'recharts';
import _ from 'lodash';

export default function Statistics({link}) {

    const [trainings, setTrainings] = useState([]);

    useEffect(()=> getData(), []);

    const getData =() => {
      fetch(link)
      .then(response=>response.json())
      .then(data=>setTrainings(data.content))
    }
  

    const Stats = trainings.map((training) => {
        return {
            name: training.activity,
            mins: parseInt(training.duration)
        }
    })

    const data = _(Stats)
    .groupBy('name')
    .map((activity, id)=> ({
        name: id,
        mins: _.sumBy(activity, 'mins')

    }))
    .value()

return (
    <div className="ag-theme-material"
    style=  {{
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center' 
             }}>
    <BarChart 
    width={1000} 
    height={700} 
    data={data}>
        <CartesianGrid strokeDasharray="1" />
        <XAxis dataKey="name" />
        <YAxis label= {{ 
            value: 'Minutes', 
            angle: -90, 
            position: 'insideLeft' 
                      }}/>
        <Tooltip />
        <Bar dataKey="mins" fill="#287FDE" opacity={0.7} />
    </BarChart>
    </div>
  );
}