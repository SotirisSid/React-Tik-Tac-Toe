export default function GameOver({winner,onRestartGame}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>

            {winner && <p> {winner} wins!</p>}
            {!winner && <p>It's a draw!</p>}
            <p>
                <button id="restart-button" onClick={onRestartGame}>Restart Game</button>
            </p>
        </div>
    );
}
