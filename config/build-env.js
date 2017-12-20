const replace = require("replace");
const analyticsId = process.env.GA_PROJECTID;
const youtubeApiKey = process.env.YT_API_KEY;
const youtubeClientId = process.env.YT_CLIENT_ID;

replace({
  regex: '{GA_PROJECTID}',
  replacement: analyticsId,
  paths: ['./src'],
  recursive: true
});
[{
  regex: '{YT_API_KEY}',
  replacement: youtubeApiKey,
  paths: ['./src/environments'],
  recursive: true
},
{
  regex: '{YT_CLIENT_ID}',
  replacement: youtubeClientId,
  paths: ['./src/environments'],
  recursive: true
}].forEach(options => replace(options));