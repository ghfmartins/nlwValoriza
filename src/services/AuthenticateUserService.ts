import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}


class AuthenticateUserService {

    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            email
        });

        if (!user) {
            throw new Error("Email or Password incorrect")
        }

        const passwordIsValid = await compare(password, user.password);

        if (!passwordIsValid) {
            throw new Error("Email or Password incorrect");
        }
        //Gerar o token
        const token = sign(
            {
                email: user.email
            },
            "fba0c363fb347d4859c5ea379ee46569",
            {
                subject: user.id,
                expiresIn: "1d" //-> tempo de expiração de 1 dia. Pesquisar sobre refresh token
            }
        );
        return token;
    }
}
export { AuthenticateUserService };