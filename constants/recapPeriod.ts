const startPeriodDate = 11
const finishedPeriodDate = 10

const setRecapPeriod = () => {
    const now = new Date()
    const currentDate = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const startPeriod = new Date(currentYear, currentMonth, startPeriodDate)
    const finishedPeriod = new Date(currentYear, currentMonth, finishedPeriodDate)
    finishedPeriod.setHours(23, 59, 59)

    if (currentDate < startPeriodDate) {
        startPeriod.setMonth(currentMonth === 0 ? 11 : (currentMonth - 1))
        startPeriod.setFullYear(currentMonth === 0 ? (currentYear - 1) : currentYear)
    } else {
        finishedPeriod.setMonth(currentMonth === 11 ? 0 : (currentMonth + 1))
        finishedPeriod.setFullYear(currentMonth === 11 ? (currentYear + 1) : currentYear)
    }

    const offsetWITA = 8 * 60 * 60 * 1000

    startPeriod.setTime(startPeriod.getTime() - offsetWITA)
    finishedPeriod.setTime(finishedPeriod.getTime() + offsetWITA)

    return { startPeriod, finishedPeriod }
}

export default setRecapPeriod