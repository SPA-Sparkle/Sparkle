import React from 'react';

const Inputform = ({ genre, setGenre, characterName, setCharacterName, branchingCount, setBranchingCount, handleStartGame }) => {
    return (
        <div className="input-group">
            <input
                type="text"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Character Name"
                value={characterName}
                onChange={(e) => setCharacterName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Branching Count"
                value={branchingCount}
                onChange={(e) => setBranchingCount(e.target.value)}
            />
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

export default Inputform;
