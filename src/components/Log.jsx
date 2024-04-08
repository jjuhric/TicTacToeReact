export default function Log({ gameTurns}) {
    
    return <ol id="log">
        {gameTurns.map(turn => {
            return <li key={`${turn.square.row},${turn.square.col}`}>{`Player ${turn.player} marked row ${turn.square.row  + 1}, col ${turn.square.col  + 1}`}</li>
        })}
    </ol>
}