import { create } from "@incodetech/welcome";
const apiURL = import.meta.env.VITE_USER_SERVER;
const clientId = import.meta.env.VITE_CLIENT_ID;

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
