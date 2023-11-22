import { PlayerListType } from "../../../data/TeamType";

export default interface CreatingTeamOptionUseCase {
  creatingTeams(teamList: string);
  randomize(teamList: PlayerListType[]);
  splitValues(teamList: string);
  creatingOptions(teamList: PlayerListType[]);
}
