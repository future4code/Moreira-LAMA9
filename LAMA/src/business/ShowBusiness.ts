import { IdGenerator } from "../services/IdGenerator";
import { RegisterShowInputDTO } from "../types/registerShowInputDTO";
import { Show, WEEK_DAY } from "../model/Show"
import ShowData from "../data/ShowData";

export default class ShowBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private showData: ShowData
  ) { }

  registerShow = async (input: RegisterShowInputDTO) => {
    //validação
    const { week_day, start_time, end_time, band_id } = input

    if (!week_day || !start_time || !end_time || !band_id) {
      throw new Error("All fields are required")
    }

    //VALIDAR HORARIO DISPONIVEL PARA SHOW
    if (start_time < 8 || end_time > 23) {
      throw new Error("Shows can only be registered from 8 am to 11 pm")
    }

    //VALIDAR DIA DO SHOW 
    if (week_day !== WEEK_DAY.DOMINGO && week_day !== WEEK_DAY.SABADO && week_day !== WEEK_DAY.SEXTA) {
      throw new Error("Invalid day")
    }

    //VALIDAR HORARIO INTEIRO SHOW
    if ((Number.isInteger(start_time) && Number.isInteger(end_time)) === false) {
      throw new Error("invalid time")
    }

    //VALIDAR SE HORA E DATA COICIDEM
    const validateDayHour = await this.showData.validateDayHour(week_day, start_time)
    if (validateDayHour) {
      throw new Error("On this day and time, there is already a registered band. Please try again with a new day and time.")
    }

    //criar id do show
    const id = this.idGenerator.generateId()

    // criar show no banco 
    const show = new Show(
      id, week_day, start_time, end_time, band_id)

    //inserir no banco
    await this.showData.insertShow(show)
  }
}