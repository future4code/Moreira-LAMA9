import BandBusiness from "./business/BandBusiness";
import ShowBusiness from "./business/ShowBusiness";
import UserBusiness from "./business/UserBusiness";
import { app } from "./controller/app";
import BandController from "./controller/BandController";
import ShowController from "./controller/ShowController";
import UserController from "./controller/UserController";
import BandData from "./data/BandData";
import ShowData from "./data/ShowData";
import UserData from "./data/UserData";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

const userBusiness = new UserBusiness(
    new UserData()
)

const userController = new UserController(
    userBusiness
)

const bandBusiness = new BandBusiness(
    new BandData()
)

const bandController = new BandController(
    bandBusiness
)

const showController = new ShowController(
    new ShowBusiness(
        new IdGenerator(),
        new ShowData(),
        new Authenticator()
    )
)

app.post("/user/signup", userController.signup)
app.post("/login", userController.login)
app.post("/band/signup", bandController.signup)
app.post("/show", showController.registerShow)
app.get("/show", showController.getShowByDay)