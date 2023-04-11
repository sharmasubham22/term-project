import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_DaSQBDC8H",
  ClientId: "355kharkfde6mdv02b88r474nt",
};

// const poolData = {
//   UserPoolId: "us-east-1_iDCTyKw4f",
//   ClientId: "5rvl3jjhapal8slqd0s2m3j5pq",
// };


export default new CognitoUserPool(poolData);