const request = require('request-promise-native');
async function getTops(parent, args, context, info){
  console.info("GETTING TOPS!")
  const uri = `http://localhost:8818/top?user=${args.user}&time_range=${args.time_range}&type=${args.type}`
  const options = {
    uri: uri,
    json: true
  };
  const tops = await request(options);
  return tops.body.items;
}
module.exports = getTops