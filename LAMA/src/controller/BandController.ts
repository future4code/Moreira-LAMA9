import { Request, Response } from "express";
import BandBusiness from "../business/BandBusiness";
import { Authenticator } from "../services/Authenticator";
import { SignupBandDTO } from "../types/signupBandDTO";



export default class BandController{
    constructor(
        private bandBusiness: BandBusiness
    ){}

    signup = async(req: Request, res: Response) =>{
        const token = req.headers.authorization

        if(!token) {
          res
            .status(422)
            .send("This endpoint requires a token.")
        }        
        const authenticator = new Authenticator()
        const tokenData = authenticator.getTokenData(token)

        if(tokenData.role !== 'ADMIN') {
            res.status(401).send('Access to admins only.')
        }
        const {name, music_genre, responsible} = req.body;

        const input: SignupBandDTO ={
            name,
            music_genre,
            responsible                        
        }
        try {
            const token = await this.bandBusiness.signup(input)
            
            res.status(201).send({message: "Successfully registered band"})
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Signup error.")
        }
    }
}