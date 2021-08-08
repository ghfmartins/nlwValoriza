import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";



class AutheticateUserController {
    async handle(request: Request, response: Response) { //<- Essa função handle não é padrão do node (poderia receber qualquer nome)
        const { email, password } = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const token = await authenticateUserService.execute({
            email,
            password,
        });

        return response.json(token);

    }
}
export { AutheticateUserController }