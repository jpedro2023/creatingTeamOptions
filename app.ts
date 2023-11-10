import { ApiHandler } from "./src/adapter/ApiHandler";
import { CreatingTeamOptionsService } from "./src/application/service/CreatingTeamOptionsService";

const creatingTeamOptionsService = new CreatingTeamOptionsService();
const apiHandler = new ApiHandler(creatingTeamOptionsService);

apiHandler.handler();
