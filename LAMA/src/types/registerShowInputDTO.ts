import { WEEK_DAY } from "../model/Show";

export type RegisterShowInputDTO = {
  week_day: WEEK_DAY,
  start_time: number,
  end_time: number,
  band_id: string
}