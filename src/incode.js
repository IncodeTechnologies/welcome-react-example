import { create } from "@incodetech/welcome";
const apiURL = process.env.REACT_APP_USER_SERVER;
const clientId = process.env.REACT_APP_CLIENT_ID;

const incode = create({
  clientId: clientId,
  apiURL: apiURL,
  theme: {
    // main: "",
    // mainButton: {
    //   borderRadius: "",
    //   color: "",
    //   border: "",
    // },
  },
});
export default incode;
