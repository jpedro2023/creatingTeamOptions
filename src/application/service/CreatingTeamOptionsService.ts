import { PlayerListType } from "../../../data/TeamType";
import CreatingTeamOptionUseCase from "../input/CreatingTeamOptionUseCase";

export class CreatingTeamOptionsService implements CreatingTeamOptionUseCase {
  creatingTeams(teamList: string) {
    const filteredTeamList = this.splitValues(teamList);
    const players = this.randomize(filteredTeamList);
    const team = this.creatingOptions(players);
    const optionTeams = {
      TimeAzul: team.Azul,
      NotaTimeAzul: this.sumTeamRating(team.Azul),
      TimeBranco: team.Azul,
      NotaTimeBranco: this.sumTeamRating(team.Branco),
      TimeLaranja: team.Azul,
      NotaTimeLaranja: this.sumTeamRating(team.Laranja),
    };
    return optionTeams;
  }
  randomize(teamList: PlayerListType[]) {
    for (let i = teamList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [teamList[i], teamList[j]] = [teamList[j], teamList[i]];
    }
    return teamList;
  }
  sumTeamRating(players: PlayerListType[]) {
    let totalSum = 0;
    for (let i = 0; i < players.length; i++) {
      totalSum += players[i].rating;
    }
    return totalSum;
  }
  splitValues(teamList: string) {
    const regex = /(\d+)\.\s(.*?)\s\((.*?)\)\s-\s(.*?)(?=\s\d|$)/g;

    const playersArray: PlayerListType[] = [];
    let match;

    while ((match = regex.exec(teamList)) !== null) {
      const playerObject = {
        name: match[2].toString(),
        position: match[3].toString(),
        rating: parseInt(match[4]),
      };
      playersArray.push(playerObject as PlayerListType);
    }
    return playersArray;
  }
  creatingOptions(teamList: PlayerListType[]): {
    [key: string]: PlayerListType[];
  } {
    const times: { [key: string]: PlayerListType[] } = {
      Azul: [],
      Branco: [],
      Laranja: [],
    };

    const posicoesNecessarias = ["GOL", "ZAG", "MEI", "ATA"];

    const jogadoresOrdenados = [...teamList].sort(
      (a, b) => b.rating - a.rating
    );

    const distribuirTeamListType = (
      jogador: PlayerListType,
      timeMenorNota = "Azul"
    ) => {
      let menorNota = calcularNotaTime(times.Azul);

      for (const time in times) {
        const notaAtual = calcularNotaTime(times[time]);
        if (notaAtual < menorNota) {
          menorNota = notaAtual;
          timeMenorNota = time;
        }
      }
      times[timeMenorNota].push(jogador);
    };

    const calcularNotaTime = (time: PlayerListType[]): number => {
      return time.reduce((total, jogador) => total + jogador.rating, 0);
    };

    for (let i = 0; i < posicoesNecessarias.length; i++) {
      const jogadoresPosicao = jogadoresOrdenados.filter(
        (jogador) => jogador.position === posicoesNecessarias[i]
      );

      for (const jogador of jogadoresPosicao) {
        distribuirTeamListType(jogador);
      }
    }
    return times;
  }
}
