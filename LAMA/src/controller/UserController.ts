import { Request, Response } from "express";
import UserBusiness from "../business/UserBusiness";
import { SignupInputDTO } from "../types/signupInputDTO";

export default class UserController{
    constructor(
        private userBusiness: UserBusiness
    ){}

    signup = async(req: Request, res: Response) =>{
        const {name, email, password, role} = req.body;

        const input: SignupInputDTO ={
            name,
            email,
            password,
            role            
        }
        try {
            const token = await this.userBusiness.signup(input)
            
            res.status(201).send({message: "Successfully registered user.", token})
            
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Sign up error.")
        }
    }

    login = async(req: Request, res: Response) =>{
        const {name, email, password} = req.body

        const input: SignupInputDTO ={
            name,
            email,
            password,            
        }    
        try{
            const token = await this.userBusiness.login(input)
            res.status(201).send({message: "User logged in.", token})
            

        }catch (error){
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Login error.")
        }
    }
}