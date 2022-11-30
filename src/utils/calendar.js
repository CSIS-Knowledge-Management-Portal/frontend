import ApiCalendar from "react-google-calendar-api";

const config = {
  clientId:
    "980575440299-7v5ap704i43iao1v61atqs3872f1mifr.apps.googleusercontent.com",
  apiKey: "AIzaSyANhGX9tlvk-MNFY4J01R-FuA262AjBALk",
  scope: "https://www.googleapis.com/auth/calendar",
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
};

async function Test() {
  const apiCalendar = new ApiCalendar(config);

  apiCalendar.handleAuthClick();

  apiCalendar.listUpcomingEvents(10, "primary").then(({ result }) => {
    console.log(result.items);
  });
}

export default Test;
