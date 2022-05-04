import React, {useEffect, useState} from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment)

export default function EventCalendar({link}) {

    const [trainings, setTrainings] = useState([]);

    const allEvents = trainings.map((training) => {
        return {
            title: training.activity,
            start: new Date(training.date),
            end: moment(training.date).add(parseInt(training.duration), 'm').toDate()
        }
    })

    useEffect(()=> {
        const fetchData =() => {
            fetch(link)
            .then(response=>response.json())
            .then(data=>setTrainings(data.content))
        };
        fetchData();
     }, []);

    return (
        <div>
        <Calendar
            style={{height:750}}
            startAccessor="start"
            endAccessor="end"
            localizer={localizer}
            events={allEvents}
        />
        </div>
    )


}