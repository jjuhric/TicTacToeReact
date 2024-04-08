export function GameBoard({setActivePlayer, board}) {
    return <ol id="game-board">
        {board.map((row, rowIndex) => {
            return <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, cellIndex) => {
                        return <li key={cellIndex} className="cell">
                            <button onClick={() => setActivePlayer(rowIndex, cellIndex)} disabled={!!playerSymbol}>{playerSymbol}</button>
                        </li>
                    })}
                </ol>
            </li>
        })}
    </ol>
}