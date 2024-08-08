import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Player} from '../api/models'

const PlayerColumns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Player',
        width: 160
    },
    {
        field: 'position',
        headerName: 'Position',
        width: 200
    },
    {
        field: 'nhl_team_code',
        headerName: 'Team',
        width: 90,
    },
    {
        field: 'salary',
        headerName: 'Current Cap Hit',
        type: 'number',
        width: 160,
    },
];

interface PlayerTableProps {
    players: Player[],
    onSelect: (Player) => void
}

function PlayerTable(props: PlayerTableProps): JSX.Element {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.players}
        columns={PlayerColumns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}

export default PlayerTable;