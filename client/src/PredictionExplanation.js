import './App.css';
import React from "react";

function PredictionExplanation() {
    const [expanded, setExpanded] = React.useState(false);

    function handleClick() {
        setExpanded(!expanded);
    }

    const explanationText = (
        `The ELO system assigns every team a power rating. 
        These ratings are used to generate win probabilities for games, based on the difference in quality between the two teams, with an adjusted advantage for the home team.
        ELO system does not factor in chance to draw, so you should consider win % to be equal to (chance to win + (chance to draw / 2)) for each team. 
        After each game, the teams ratings are adjusted based on the result, with a more unexpected result resulting in a larger ratings change.
        For example, a higher rated team beating a lower rated team at home would result in a low change, whereas the reverse result would result in a larger rating change.
        This process happens for every league game of the season, with ratings being adjusted after every result. See "Simulate a Game" to see how any result would affect the teams ratings.
        Exact formula for home team win %: (home advantage in this model is 68 points) \n(1 / (1 + 10 ^ ((Away Rating - (Home Rating + Home Advantage)) / 400)))) * 100`
    );

    let linkText = expanded ? "How Does This Work? \u25B2" : "How Does This Work? \u25BC";

    return (
        <div>
            <button className="explanation-dropdown" onClick={handleClick} style={{cursor: 'pointer'}}>{linkText}</button>
            <br />
            {expanded ? explanationText.split(`\n`).map(str=> <p className='explanation-text'>{str}</p>) : null}
            {/*This renders each line of the text as its own paragraph for spacing*/}
        </div>
    );
}
export default PredictionExplanation;