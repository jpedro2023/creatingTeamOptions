import { PlayerListType } from "../../../data/TeamType";

export default interface CreatingTeamOptionUseCase {
  creatingTeams(teamList: string);
  randomize(teamList: PlayerListType[]);
  sumTeamRating(players: any);
  splitValues(teamList: string);
  creatingOptions(teamList: PlayerListType[]);
}
