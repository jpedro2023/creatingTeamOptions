import { teamList } from "../../data/teamList";
import CreatingTeamOptionUseCase from "../application/input/CreatingTeamOptionUseCase";

export class ApiHandler {
  constructor(
    private readonly creatingTeamOptionUseCase: CreatingTeamOptionUseCase
  ) {}

  handler() {
    for (let i = 1; i < 3; i++) {
      const result = this.creatingTeamOptionUseCase.creatingTeams(teamList);
      console.log(`=================Opção${i}========================`);
      console.log(result);
    }
  }
}
