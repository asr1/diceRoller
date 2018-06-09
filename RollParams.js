module.exports = class Parameter {
    constructor(numTrials, numDice, diceSize, addEach, addTotal, reRolls, therMin, therMax)
    {
        this.numTrials = numTrials;
        this.numDice = numDice;
        this.diceSize = diceSize;
        this.addEach = addEach;
        this.addTotal = addTotal;
        this.reRolls = reRolls;
        this.therMin = therMin;
        this.therMax = therMax;
    }
}