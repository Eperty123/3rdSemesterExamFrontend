export const environment = {
  production: true,
  useHttps: true,
  domain: "localhost",
  port: 5000,
  timeZone: 1,
  encryptionKey: "Team AC Booking System",

  getApiAddress() {
    let useHttps = environment.useHttps;
    let domain = environment.domain;
    let port = environment.port;

    return (useHttps ? "https://" : "http://") + domain + ":" + port + "/";
  }
};
