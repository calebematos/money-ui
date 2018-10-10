export const environment = {
  production: true,
  apiUrl: 'https://trunix-money-api.herokuapp.com',

  tokenWhitelistedDomains: [new RegExp('trunix-money-api.herokuapp.com')],
  tokenBlacklistedRoutes: [new RegExp('\/oauth\/token')]
};
