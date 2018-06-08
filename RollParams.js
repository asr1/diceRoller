module.exports = class Parameter {
    constructor(numTrials, numDice, diceSize, addEach, addTotal, reRolls)
    {
        this.numTrials = numTrials;
        this.numDice = numDice;
        this.diceSize = diceSize;
        this.addEach = addEach;
        this.addTotal = addTotal;
        this.reRolls = reRolls;
    }
}