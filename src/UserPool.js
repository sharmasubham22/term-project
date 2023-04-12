import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_DaSQBDC8H",
  ClientId: "355kharkfde6mdv02b88r474nt",
};

export default new CognitoUserPool(poolData);