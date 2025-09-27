export const dayOfWeekTitles = [
    ['Пн', 'понедельник'],
    ['Вт', 'вторник'],
    ['Ср', 'среда'],
    ['Чт', 'четверг'],
    ['Пт', 'пятница'],
    ['Сб', 'суббота'],
    ['Вс', 'воскресенье'],
]

export const monthTitles = [
    ['Январь', 'января', 'Янв'],
    ['Февраль', 'февраля', 'Фев', ],
    ['Март', 'марта', 'Мар'],
    ['Апрель', 'апреля', 'Апр'],
    ['Май', 'мая', 'Май'],
    ['Июнь', 'июня', 'Июн'],
    ['Июль', 'июля', 'Июл'],
    ['Август', 'августа', 'Авг'],
    ['Сентябрь', 'сентября', 'Сен'],
    ['Октябрь', 'октября', 'Окт'],
    ['Ноябрь', 'ноября', 'Ноя'],
    ['Декабрь', 'декабря', 'Дек'],
]

export const getTitle = (d: Date) => {
    return dayOfWeekTitles[d.getDay() - 1][1] + ', ' + d.getDate() + ' ' + monthTitles[d.getMonth()][1]
}

export const getSubtitle = (m: number, y: number, mode: 'Month' | 'Year') => {
    return mode === 'Month' ? monthTitles[m][0] + ' ' + y : y + ' г.'
}

export const getMonthLength = (m: number, y: number) => {
    return new Date(y, m + 1, 0).getDate()
}

export const getPrevMonthLength = (m: number, y: number) => {
    let prevMonth = m - 1
    let prevYear = y
    if (prevMonth === -1) {
        prevMonth = 11
        prevYear = y - 1
    }
    return getMonthLength(prevMonth, prevYear)
}