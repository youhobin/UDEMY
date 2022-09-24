const bcrypt = require('bcrypt');

const hashPassword = async(pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt); //const hash = await bcrypt.hash(pw, 12) 로 가능
    console.log(salt);
    console.log(hash);
}

const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log('Logged In');
    } else {
        console.log('Incorrect');
    }
}

hashPassword('monkey');

login('monkey', '$2b$12$leKKhUlqGD5b.nsIZ6fIlejoYeE/3bNNjk4fXB9YzJZGY4G3z6lKm')