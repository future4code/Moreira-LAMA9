import { Request, Response } from "express";
import ShowBusiness from "../business/ShowBusiness";
import { RegisterShowInputDTO } from "../types/registerShowInputDTO";

export default class ShowController {
  constructor(
    private showBusiness: ShowBusiness) { }

  registerShow = async (req: Request, res: Response) => {

    const { week_day, start_time, end_time, band_id } = req.body
    const token = req.headers.authorization

    const input: RegisterShowInputDTO = {
      week_day,
      start_time,
      end_time,
      band_id,
      token
    }

    if (!token) {
      res.status(422).send({ message: "required token" })
    }

    try {
      await this.showBusiness.registerShow(input)

      res.status(201).send({ message: "Registration successful." })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      }
      res.status(500).send("Error in registration")
    }
  }

  getShowByDay = async (req: Request, res: Response) => {
    try {
      const day = req.query.week_day as string

      const filteredShow = await this.showBusiness.getShowByDay(day)
      console.log(filteredShow)
      res.status(202).send(filteredShow)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      }
      res.status(500).send("Wrong location.")
    }
  }
}