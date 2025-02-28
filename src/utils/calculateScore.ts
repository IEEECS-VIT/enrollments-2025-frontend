import CryptoJS from "crypto-js";

const secretKey: string = "vqMy46xKCuErcyXrxbBiMNF7nkZ26Rve9kCqzQ8lbUA=";

const findCorrectAnswerIndex = (question: any): number => {
  for (let i = 0; i < question.options.length; i++) {
    const dataToHash = `${secretKey}${i}${question.salt}`;
    const generatedHash = CryptoJS.SHA256(dataToHash).toString(
      CryptoJS.enc.Hex
    );

    if (generatedHash === question.correctIndexHash) {
      console.log("Correct answer index:", i);
      return i;
    }
  }
  return -1;
};

export default findCorrectAnswerIndex;
