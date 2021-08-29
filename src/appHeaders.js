
module.exports = [
  // Website you wish to allow to connect
  { 'active': true, 'role': 'Access-Control-Allow-Origin', 'value': '*' },
  // Request methods you wish to allow
  { 'active': true, 'role': 'Access-Control-Allow-Methods', 'value': 'GET, POST, OPTIONS, PUT, PATCH, DELETE' },
  // Request headers you wish to allow
  { 'active': true, 'role': 'Access-Control-Allow-Headers', 'value': 'X-Requested-With, content-type, x-access-token, Authorization' },
  // { 'active': true, 'role': 'Access-Control-Allow-Headers', 'value': '*' },
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  { 'active': true, 'role': 'Access-Control-Allow-Credentials', 'value': true },

  { 'active': false, 'role': 'Access-Control-Request-Method', 'value': '*' },
  { 'active': false, 'role': 'Access-Control-Request-Headers', 'value': 'X-Requested-With, content-type' },
  { 'active': false, 'role': 'Cache-Control', 'value': '*' }, //HTTP 1.1
  { 'active': false, 'role': 'Pragma', 'value': 'no-cache' }, //HTTP 1.0
  { 'active': false, 'role': 'Expires', 'value': '0' }, //proxies
]
