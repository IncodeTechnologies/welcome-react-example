import { create } from "@incodetech/welcome";
const apiURL = import.meta.env.VITE_INCODE_API_URL;
const clientId = import.meta.env.VITE_INCODE_CLIENT_ID;

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
