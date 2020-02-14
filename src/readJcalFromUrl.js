const fetch = require('node-fetch')
const ical = require('ical.js')

const BACKEND = "https://mrsimpson.o6s.io/ical-interceptor" // TODO: Configuration

export default async function readJcalFromUrl(url) {
    if (!url) {
        throw new Error('Supply a URL at which the ical can be retrieved')
    }
    let jCal
    const proxyUrl = url.match(new RegExp(BACKEND))
        ? url
        : BACKEND + '/?url=' + url
    try {
        const resource = await fetch(proxyUrl)
        jCal = ical.parse(await resource.text())
        // jCal = await ical.fromURL(url)
    } catch (err) {
        console.warn(url, err)
    }
    if (!jCal || Object.keys(jCal).length === 0) {
        throw new Error('URL supplied does not yield a valid iCal calendar')
    }

    return jCal
}
