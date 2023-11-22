import { PlayerListType } from "../../../data/TeamType";
import CreatingTeamOptionUseCase from "../input/CreatingTeamOptionUseCase";

export class CreatingTeamOptionsService implements CreatingTeamOptionUseCase {
  creatingTeams(teamList: string) {
    const filteredTeamList = this.splitValues(teamList);
    const players = this.randomize(filteredTeamList);
    const team = this.creatingOptions(players);

    const optionTeams = {
      TimeAzul: team.Azul,
      NotaTimeAzul: team.Azul.reduce(
        (total, player) => total + player.rating,
        0
      ),
      TimeBranco: team.Branco,
      NotaTimeBranco: team.Branco.reduce(
        (total, player) => total + player.rating,
        0
      ),
      TimeLaranja: team.Laranja,
      NotaTimeLaranja: team.Laranja.reduce(
        (total, player) => total + player.rating,
        0
      ),
    };

    return optionTeams;
  }

  randomize(teamList: PlayerListType[]) {
    const shuffledTeams: { [key: string]: PlayerListType[] } = {
      GOL: [],
      ZAG: [],
      MEI: [],
      ATA: [],
    };

    for (const player of teamList) {
      if (!shuffledTeams[player.position]) {
        shuffledTeams[player.position] = [];
      }
      shuffledTeams[player.position].push(player);
    }

    // Embaralha cada subgrupo
    for (const position in shuffledTeams) {
      shuffledTeams[position] = this.shuffle(shuffledTeams[position]);
    }

    // Concatena os subgrupos e retorna a lista final
    return [].concat(
      ...Object.keys(shuffledTeams).map((position) => shuffledTeams[position])
    );
  }

  // Função para embaralhar um array
  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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

    const distribuirEquitativamente = (jogadoresPosicao: PlayerListType[]) => {
      let timeIndex = 0;

      for (const jogador of jogadoresPosicao) {
        const currentTime = Object.keys(times)[timeIndex];

        if (times[currentTime].length < 7) {
          times[currentTime].push(jogador);
        } else {
          // Encontre o próximo time disponível
          let nextTimeIndex = (timeIndex + 1) % Object.keys(times).length;
          while (times[Object.keys(times)[nextTimeIndex]].length >= 7) {
            nextTimeIndex = (nextTimeIndex + 1) % Object.keys(times).length;
          }

          times[Object.keys(times)[nextTimeIndex]].push(jogador);
        }

        timeIndex = (timeIndex + 1) % Object.keys(times).length;
      }
    };

    for (let i = 0; i < posicoesNecessarias.length; i++) {
      const jogadoresPosicao = jogadoresOrdenados.filter(
        (jogador) => jogador.position === posicoesNecessarias[i]
      );

      distribuirEquitativamente(jogadoresPosicao);
    }

    return times;
  }
}
