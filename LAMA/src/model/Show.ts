export enum WEEK_DAY {
  SEXTA = "SEXTA",
  SABADO = "SABADO",
  DOMINGO = "DOMINGO"
}

export class Show {
  constructor(
    private id: string,
    private week_day: WEEK_DAY,
    private start_time: number,
    private end_time: number,
    private band_id: string
  ) { }
}