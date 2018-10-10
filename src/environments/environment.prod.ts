export const environment = {
  production: true,
  apiUrl: 'https://trunix-money-api.herokuapp.com',

  tokenWhitelistedDomains: [ /trunix-money-api.herokuapp.com/ ],
  tokenBlacklistedRoutes: [/\/oauth\/token/]
};
