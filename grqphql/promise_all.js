
//Compare the number of successful promise resolutions
//to unsuccessful. Then print the sorted successful promise results if
//there are more successful promises than unsuccessful... Otherwise,
//print the sorted i values of the unsuccessful promises.

const { asyncOperation } = require('./bugg');

const iterations = 53;
const promises = [];
for (let i = 0; i < iterations; i++) {
	const promise = asyncOperation(i);
	promises.push(promise);
}

Promise.all(promises).then(results => {});