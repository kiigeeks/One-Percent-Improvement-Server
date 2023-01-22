export const getLastWeeks = (endDate) => {
    const dateNow = new Date()

    const dates = []

    while (endDate <= dateNow) {
        dates.push({time: getDate(endDate)});
        endDate.setDate(endDate.getDate() + 1);
    }
    
    return dates;
}

export const getRangeMonths = (endMonth) => {
    const dateNow = new Date()

    const months = []

    while (endMonth <= dateNow) {
        months.push({
            months: endMonth.getMonth()+1,
            years: endMonth.getFullYear()
        });
        endMonth.setMonth(endMonth.getMonth() + 1);
    }

    return months;
}

export const getDate = (timeStamp) => {
    let date = ("0" + timeStamp.getDate()).slice(-2)
    let month = ("0" + (timeStamp.getMonth() + 1)).slice(-2)
    let year = timeStamp.getFullYear()

    const dateFix = year + "-" + month + "-" + date

    return dateFix
}