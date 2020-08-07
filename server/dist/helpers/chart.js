function timestampToString(timestamp) {
    const h = new Date(timestamp).getHours();
    const m = new Date(timestamp).getMinutes();
    const hours = h < 10 ? "0" + h : h;
    const minutes = m < 10 ? "0" + m : m;
    return hours + ":" + minutes;
}
function serieObjToArr(serieObj, chartSpan) {
    const serieArr = [];
    const chartSpanFilter = (datum) => {
        return (isNumber(datum.x) &&
            datum.x <= chartSpan.end &&
            datum.x >= chartSpan.begin);
    };
    const chartSpanMap = (datum) => {
        return Object.assign(Object.assign({}, datum), { x: isNumber(datum.x) ? timestampToString(datum.x) : datum.x });
    };
    for (const key of Object.keys(serieObj)) {
        const serieData = serieObj[key].data
            .filter(chartSpanFilter)
            .map(chartSpanMap);
        if (serieData.length === 0)
            continue;
        const serie = {
            id: key,
            data: serieData,
        };
        serieArr.push(serie);
    }
    return serieArr;
}
function generateChartData(events) {
    let serieObj = {};
    let hasStarted = false;
    let selections = [];
    let groups = [];
    const span = { begin: 0, end: 0 };
    for (const event of events) {
        const { type, timestamp } = event;
        if (!timestamp || !isNumber(timestamp))
            return {
                message: `Invalid event format.`,
            };
        if (type === "start" && !hasStarted) {
            const { select, group } = event;
            if (!Array.isArray(select) || select.length === 0)
                return {
                    message: `Select field on event of type 'start' is invalid or empty.`,
                };
            if (!Array.isArray(group) || group.length === 0)
                return {
                    message: `Group field on event of type 'start' is invalid or empty.`,
                };
            serieObj = {};
            selections = select;
            groups = group;
            hasStarted = true;
        }
        if (type === "span" && hasStarted) {
            const { begin, end } = event;
            if (!begin || !end)
                return { message: "Invalid span event." };
            span.begin = begin;
            span.end = end;
        }
        if (type === "data" && hasStarted) {
            let baseEventId = "";
            groups.forEach((group) => (baseEventId += `${event[group] ? event[group] : "n/a"} `));
            baseEventId = baseEventId.trimEnd();
            selections.forEach((select) => {
                const eventId = `${baseEventId} ${select}`;
                if (!Object.keys(serieObj).includes(eventId))
                    serieObj[eventId] = { data: [] };
                serieObj[eventId].data.push({
                    x: timestamp,
                    y: event[select] ? event[select] : null,
                });
            });
        }
        if (type === "stop" && hasStarted) {
            hasStarted = false;
            selections = [];
            groups = [];
        }
    }
    const serieArr = serieObjToArr(serieObj, span);
    if (serieArr.length === 0)
        return { message: "No chart generated from events." };
    return serieArr;
}
module.exports.generateChartData = generateChartData;
//# sourceMappingURL=chart.js.map