const validator = require('validator');

function validateUser(users) {
    const results = users.map(user => {
        const errors = [];

        // Validate username
        if (!/^[A-Z]/.test(user.username)) {
            errors.push("Username must start with an uppercase letter.");
        }
        if (user.username.length < 3) {
            errors.push("Username must be at least 3 characters long.");
        }
        if (user.username.length > 20) {
            errors.push("Username must be no more than 20 characters long.");
        }

        // Validate email
        if (!validator.isEmail(user.email)) {
            errors.push("Email is not valid.");
        }

        // Validate phone
        if (!/^\d{8}$/.test(user.phone)) {
            errors.push("Phone number must be exactly 8 digits long.");
        }

        return {
            user,
            isValid: errors.length === 0,
            errors: errors
        };
    });

    return results;
}

module.exports = validateUser;

