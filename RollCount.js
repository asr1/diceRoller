module.exports = class RollCount {
    constructor(max)
    {
        this.count = [];
        
        //Prefill with 0s to prevent a bug where it can't differentiate between the number n and the nth element, which may move.
        for(var i = 0; i < max; i++)
        {
            this.count.push({"sum": i+1, "amount": 0})
        }
    }

    add(roll)
    {
        this.count[roll-1].amount++; //arrays start at 0, sums start at 1
    }

    //Removes the left values lower than the theoretical min 
    trim(therMin)
    {
        this.count.splice(0,therMin-1);
    }
}