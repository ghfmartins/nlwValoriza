import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserSendedComplimentsService {
    async execute(user_id: string) { //<- Essa função execute não é padrão do node (poderia receber qualquer nome)
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                userSender: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        });

        return compliments;
    }

}
export { ListUserSendedComplimentsService };