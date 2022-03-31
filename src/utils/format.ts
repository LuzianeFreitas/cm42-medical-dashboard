export const formatDate = (date: string) => {
    let arrayDate = date.split('T');
    let dateString = arrayDate[0];
    arrayDate = dateString.split('-');

    let dateFormated = arrayDate[2]+"/"+arrayDate[1]+"/"+arrayDate[0];

    return dateFormated;
}

export const formatTime = (startTime: string, endTime: string | null) => {
    let startTimeArray = startTime.split('T');
    startTimeArray = startTimeArray[1].split('.');
    let statTimeFormat = startTimeArray[0].substring(0,5);

    if(!endTime) {
        let endTimeArray = startTime.split('T');
        endTimeArray = endTimeArray[1].split('.');
        let endTimeFormat = endTimeArray[0].substring(0,5);

        return `${statTimeFormat} - ${endTimeFormat}`;
    }

    return statTimeFormat;
}

export const formatDateCalendar = (date: string) => {
    let dateFormatted = date.replace('T', ' ').replace('.592Z', '');
    return dateFormatted;
}

export const formatHourCalendar = (hour: number, min: number) => {
    let newHour = "";
    let newMinute = "";

    if(hour >= 1 && hour <= 9) {
        newHour = '0'+hour;
    } else {
        newHour = hour.toString();
    }

    if(min == 0) {
        newMinute = '0'+ min;
    } else {
        newMinute = min.toString();
    }

    let hourFormat = newHour + ":" + newMinute;

    return hourFormat;
}