const ical = require('ical.js')

export default function retrieveEvents(jcal) {
    const component = new ical.Component(jcal)
    const events = component.getAllSubcomponents('vevent')
    return events
}