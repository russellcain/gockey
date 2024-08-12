import * as React from 'react';
import { League, Team, Player } from '../api/models';
import { getLeagues, getTeamById, getTeams } from '../api/service';
import PlayerTable from '../player/TableView'
import './LeagueStyles.css'

interface IProps {
    null: undefined  // currently dont need to pass anything into this page
}

interface IState {
    leagues?: League[];
    selected_league_id?: number;
    // and for when someone clicks in:
    teams?: Team[];
    loading_teams: boolean;

    selected_team_id?: number;
    players?: Player[];
    loading_players: boolean;
}

class LeaguePage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            leagues: [],
            selected_league_id: undefined,
            teams: undefined,
            selected_team_id: undefined,
            loading_teams: false,
            loading_players: false
        };
    }

    handleLeague(league: League) {
        console.log("clicked", league)
        if (league.id != this.state.selected_league_id) {
            this.setState({
                loading_teams: true,
                loading_players: true
            })
        }
        this.loadTeamsToState(league.id)
    };

    handleTeam(team: Team) {
        console.log("clicked", team)
        this.loadPlayersToState(team)
    };

    async loadLeaguesToState() {
        const leagues = await getLeagues();
        this.setState({
            leagues
        });
    }

    async loadTeamsToState(league_id: number) {
        this.setState({
            loading_teams: true
        })
        const teams = await getTeams(league_id);
        this.setState({
            selected_league_id: league_id,
            teams: teams,
            loading_teams: false
        });
    }

    async loadPlayersToState(team: Team) {
        const players = await getTeamById(team.league_id, team.id);
        this.setState({
            selected_team_id: team.id,
            players: players.players,
            loading_players: false
        });
    }

    componentDidMount(): void {
        console.log("Loading Leagues", this.state.leagues)
        this.loadLeaguesToState()
    }

    clickPlayer(player: Player): void {
        console.log("hubba hubba", player.name)
    }


    removePlayer(player_id: number): void {
        console.log("Removing ", player_id, "from league:", this.state.selected_league_id, "& team:", this.state.selected_team_id)
    }

    render() {
        return (
            <div>
                <span>
                    <div className='Column left'>
                    {
                        this.state.leagues ?
                            this.state.leagues.map((league, index) => {
                                return <div
                                    className={league.id == this.state.selected_league_id ? 'Entry selected': 'Entry'}
                                    key={index}
                                    onClick={() => this.handleLeague(league)}
                                >
                                    {league.name}
                                </div>
                            })
                            : <div>...loading</div>
                        }
                    </div>

                    {
                        this.state.teams ?
                            <span>
                                    <div className='Column middle'>
                                        {
                                            !this.state.loading_teams ?
                                                this.state.teams.map((team, index) => {
                                                    return <div
                                                        className={team.id == this.state.selected_team_id ? 'Entry selected': 'Entry'}
                                                        key={index}
                                                        onClick={() => this.handleTeam(team)}
                                                    >
                                                        {team.name}
                                                    </div>
                                                })
                                            :<></>
                                        }
                                    </div>
                            </span>
                    : <></>
                    }

                    <div className='Column right'>
                    {
                        (this.state.players && !this.state.loading_players) ?
                                <PlayerTable players={this.state.players} onSelect={this.clickPlayer} onDelete={(id) => this.removePlayer(id)} canDelete={true} />
                        : <></>
                        }
                    </div>
                </span>
            </div>
        )
    }
}

export default LeaguePage;