const mapJcalToFullCalendarEvents = function (jCalEvents) {
    return jCalEvents.map((item) => {

        if (item.getFirstPropertyValue("class") === "PRIVATE") {
            return null;
        }
        else {
            var toreturn = {
                "title": item.getFirstPropertyValue("summary"),
                "location": item.getFirstPropertyValue("location"),
            };
            var rrule = item.getFirstPropertyValue("rrule");
            if (rrule != null) { //event recurs
                toreturn.rrule = {};
                if (rrule.freq) toreturn.rrule.freq = rrule.freq;
                if (rrule.parts.BYDAY) toreturn.rrule.byweekday = rrule.parts.BYDAY;
                if (rrule.until) toreturn.rrule.until = rrule.until.toString();
                if (rrule.until) toreturn.rrule.until = rrule.until.toString();
                if (rrule.interval) toreturn.rrule.interval = rrule.interval;
                var dtstart = item.getFirstPropertyValue("dtstart").toString();
                var dtend = item.getFirstPropertyValue("dtend").toString();
                toreturn.rrule.dtstart = dtstart;
                //count duration ms
                var startdate = new Date(dtstart);
                var enddate = new Date(dtend);
                toreturn.duration = enddate - startdate;
            } else {
                toreturn.start = item.getFirstPropertyValue("dtstart").toString();
                toreturn.end = item.getFirstPropertyValue("dtend").toString();
            }
            return toreturn;
        }
    })
}

export default mapJcalToFullCalendarEvents