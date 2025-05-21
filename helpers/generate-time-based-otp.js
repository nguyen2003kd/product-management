function generateTimeBasedOTP(length) {
    const now = Date.now().toString(); // thời gian hiện tại (miliseconds)
    let otp = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * now.length);
      otp += now.charAt(index);
    }
    return otp;
  }
module.exports.generateTimeBasedOTP = generateTimeBasedOTP;