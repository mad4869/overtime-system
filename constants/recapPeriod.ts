const startPeriodDate = 11
const finishedPeriodDate = 10

const setRecapPeriod = () => {
    const now = new Date()
    const currentDate = now.getDate()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const startPeriod = new Date(currentYear, currentMonth, startPeriodDate)
    const finishedPeriod = new Date(currentYear, currentMonth, finishedPeriodDate)

    if (currentDate < startPeriodDate) {
        startPeriod.setMonth(currentMonth === 0 ? 11 : (currentMonth - 1))
        startPeriod.setFullYear(currentMonth === 0 ? (currentYear - 1) : currentYear)
    } else {
        finishedPeriod.setMonth(currentMonth === 11 ? 0 : (currentMonth + 1))
        finishedPeriod.setFullYear(currentMonth === 11 ? (currentYear + 1) : currentYear)
    }

    return { startPeriod, finishedPeriod }
}

export default setRecapPeriod