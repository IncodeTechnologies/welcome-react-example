const apiURL = process.env.REACT_APP_USER_SERVER;
const clientId = process.env.REACT_APP_CLIENT_ID;

const incode = window.OnBoarding.create({
  clientId: clientId,
  apiURL: apiURL,
  lang: "en",
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
