import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmins";
import { AutheticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendedComplimentsController } from "./controllers/ListUserSendedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AutheticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserReceivedComplimentsController = new ListUserSendedComplimentsController();
const listUserSendedComplimentsController = new ListUserSendedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post("/compliments",
    ensureAuthenticated,
    createComplimentController.handle
);
router.post("/tags",
    ensureAuthenticated,
    ensureAdmin,
    createTagController.handle
);

router.get("/compliments/sended",
    ensureAuthenticated,
    listUserSendedComplimentsController.handle
);
router.get("/compliments/received",
    ensureAuthenticated,
    listUserReceivedComplimentsController.handle
);
router.get("/tags",
    ensureAuthenticated,
    listTagsController.handle
);
router.get("/users",
    ensureAuthenticated,
    listUsersController.handle
);

export { router };
