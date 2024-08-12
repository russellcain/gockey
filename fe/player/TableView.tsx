import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import {Player} from '../api/models'
import { Button } from '@mui/material';
interface PlayerTableProps {
    players: Player[],
  onSelect: (player: Player) => void,
  onDelete: (player_id: number) => void | undefined,  // this method should only be defined on the league view
  canDelete: boolean
}

interface PlayerCardProps {
  player: Player,
  key: number,
  onSelect: (player: Player) => void,
  onDelete: (player_id: number) => void | undefined,  // this method should only be defined on the league view
  canDelete: boolean
}


function PlayerCard(props:PlayerCardProps): JSX.Element {
  return (
    <Card onClick={() => props.onSelect(props.player)} sx={{ minWidth: 345 }}>
        <CardMedia
          component="img"
          height="240"
          image={props.player.photo}
          alt={props.player.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.player.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             {props.player.position} for the {props.player.nhl_team_name}
        </Typography>
        {
          props.canDelete ?
            <Button onClick={() => props.onDelete(props.player.id)}>
              Remove
              </Button>
            : <></>
        }
        </CardContent>
    </Card>
  );
}

function PlayerTable(props: PlayerTableProps): JSX.Element {
  return (
    <div style={{ height: "100%", width: "100%", flexWrap: "wrap", display: "flex", justifyContent: "space-between"}}>
      {props.players.map((player, index) => (
        <PlayerCard key={index} player={player} onSelect={props.onSelect} onDelete={props.onDelete} canDelete={props.canDelete} />
      ))}
    </div>
  );
}

export default PlayerTable;