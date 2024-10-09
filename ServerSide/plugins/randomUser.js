const Chance = require("chance")
const chance = new Chance()
module.exports = (num) => {
    const result = []
    for (let i=0; i< num; i++) {
        const item = {
            name:chance.first(),
            surname: chance.last(),
            age:chance.age(),
            gender:chance.gender(),
            avatar:chance.avatar(),
            postcode:chance.postcode(),
            email:chance.email(),
            city: chance.city(),
        }
        result.push(item)
    }
    return result
}