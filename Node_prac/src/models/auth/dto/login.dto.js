const bcrypt = require('bcrypt'); // npm install bcrypt

 class LoginDTO {
  email;
  password;

  constructor(props) {
    this.email = props.email;
    this.password = props.password;
  }

  async comparePassword(password) {
    const isCorrect = await bcrypt.compare(this.password, password);
    return isCorrect;
  }
}

module.exports = LoginDTO;