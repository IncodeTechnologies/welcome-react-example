// import { create } from "@incodetech/welcome";
const apiURL = import.meta.env.VITE_USER_SERVER;
const clientId = import.meta.env.VITE_CLIENT_ID;

const incode = OnBoarding.create({
  clientId: clientId,
  apiURL: apiURL,
  lang: "en",
  translations: {
    tutorial: {
      front1: "Show the front of id",
      front2: " front ",
      back1: "show the back of id",
      back2: " abcd ",
      selfie1: "take the selfie",
      selfie2: "remove hats, glasses etc",
      selfie3: "Give netural expersssions",
      passport1: "Passport capture1",
      passport2: "passport",
    },
  },
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
