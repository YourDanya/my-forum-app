import moment from "moment";
import 'moment/locale/ru'
moment.locale("ru")

export const dateFormat= (date) =>{
    return moment(date).format('DD MMMM YYYY HH:mm')
}

