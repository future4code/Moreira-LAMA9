import { Show } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export default class ShowData extends BaseDatabase {
  protected TABLE_NAME = "NOME_TABELA_SHOWS"

  insertShow = async (show: Show): Promise<void> => {
    try {
      await this.connection(this.TABLE_NAME).insert(show)

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("Database error!")
      }
    }
  }

  validateDayHour = async (weekDay: string, startTime: number): Promise<Show> => {
    try {
      const queryResult = await this
        .connection(this.TABLE_NAME)
        .select()
        .where({ week_day: weekDay, start_time: startTime })
      return queryResult[0]

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("Database error!")
      }
    }
  }

  getShowByDay = async (day: string) => {
    try {
      const filteredShow = await this.connection.raw(`
      SELECT start_time, name, music_genre FROM NOME_TABELA_BANDAS
      JOIN NOME_TABELA_SHOWS 
      ON NOME_TABELA_BANDAS.id = NOME_TABELA_SHOWS.band_id
      WHERE week_day = "${day}"
      ORDER BY start_time ASC;
      `);

      return filteredShow[0]

    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error("Database error!")
      }
    }

  }
}