const rnd = (num) => Math.round(Math.random() * num);

module.exports = {
    rnd: (num) => rnd(num),
    generate_id: () => {
        const letters = "abcdefghijklmnoprstuvz";
        const numbers = "0123456789";

        let result = "";

        for (let i = 0; i < 10; i++) {
            const symbol = rnd(1);

            if (symbol) {
                result += letters[rnd(letters.length - 1)];
            } else {
                result += numbers[rnd(numbers.length - 1)];
            }
        }

        return result;
    }
};