import * as React from 'react';
import PlayerTable from './TableView';
import { Player } from '../api/models';
import { getPlayers } from '../api/service';


interface IProps {
}

interface IState {
  players?: Player[];
}

class PlayerPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            players: [],
        };
    }

    handlePlayer(player: Player) {
        console.log("clicked", player)
    };

    async loadPlayersToState() {
        const players = await getPlayers();
        this.setState({
            players
        });
    }

    componentDidMount(): void {
        console.log("Loading Players", this.state.players)
        this.loadPlayersToState()
    }

    render() {
        return(
            <div>
                Welcome to the player page! Click into a player to see their full stats:
                {
                    this.state.players ?
                        <PlayerTable players={this.state.players} onSelect={this.handlePlayer} />
                        : <div>Loading...</div>
                }
            </div>
        )
    }
}

export default PlayerPage;