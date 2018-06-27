# at

## install
```sh
pnpm install michaelrhodes/at#0.0.0
```

## use
```js
var at = require('at')

var date = new Date(Date.now() + 1000)
var cmd = 'echo hello > greeting.txt'
at(date, cmd, function (err) {})
```

## obey
[MIT](https://opensource.org/licenses/MIT)
