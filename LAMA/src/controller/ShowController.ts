import { Request, Response } from "express";
import ShowBusiness from "../business/ShowBusiness";
import { Authenticator } from "../services/Authenticator";
import { RegisterShowInputDTO } from "../types/registerShowInputDTO";

export default class ShowController {
  constructor(
    private showBusiness: ShowBusiness) { }

  registerShow = async (req: Request, res: Response) => {

    const { week_day, start_time, end_time, band_id } = req.body

    const input: RegisterShowInputDTO = {
      week_day,
      start_time,
      end_time,
      band_id
    }

    const token = req.headers.authorization

    if (!token) {
      res.status(422).send({ message: "required token" })
    }

    const authenticator = new Authenticator()
    const tokenData = authenticator.getTokenData(token)

    try {
      const token = await this.showBusiness.registerShow(input)
      if (tokenData.role !== "ADMIN") {
        res.status(401).send('Access to admins only.')
      }

      res.status(201).send({ message: "Registration successfully Complete" })

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).send(error.message)
      }
      res.status(500).send("Error in registration")
    }
  }
}