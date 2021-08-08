import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListUserReceivedComplimentsService {
    async execute(user_id: string) { //<- Essa função execute não é padrão do node (poderia receber qualquer nome)
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: {
                user_receiver: user_id
            },
            relations: ["userSender", "userReceiver", "tag"],
        });

        return compliments;
    }

}
export { ListUserReceivedComplimentsService };