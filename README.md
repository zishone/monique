# monique [![NPM](https://img.shields.io/npm/v/@zishone/monique)](https://www.npmjs.com/package/@zishone/monique) [![Build](https://github.com/zishone/monique/workflows/build/badge.svg)](https://github.com/zishone/monique/actions?query=workflow%3Abuild) [![Coverage](https://codecov.io/gh/zishone/monique/branch/main/graph/badge.svg?token=XAWytg6M0z)](https://codecov.io/gh/zishone/monique) [![License](https://img.shields.io/github/license/zishone/monique)](https://github.com/zishone/monique/blob/master/LICENSE)
A middleware that utilized [rsql-mongodb](https://www.npmjs.com/package/rsql-mongodb) to parse url queries into mongodb filter and options. Who's monqique? It is not a who, it's just short for **Mongo I Query**.

## Installation
```shell
$ npm i @zishone/monique
```
## Usage
```javascript
const express = require('express');
const { mquery } = require('@zishone/monique');
const MongoClient = require('mongodb').MongoClient;

const app = express();

// Use Middleware
app.use(mquery());
 
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  const db = client.db('myDB');

  app.get('/get', async (req, res) => {
    // FilterQuery and FindOneOptions should be available here
    const { filter, options } = req.mquery;

    const cursor = db.collection('myCollection').find(filter, options);
    const data = await cursor.toArray();

    res.send({ data });
  });

  app.listen(port, () => {
    console.log('Listening at port 3000')
  })
});
```

## Queries
* **filter**
  * To filters list of objects.
  * Example:
    ```
    /get?filter=key==value
    ```
    More at [rsql-mongodb](https://www.npmjs.com/package/rsql-mongodb)
* **fields**
  * To specify which fields of the objects to be returned.
  * Example:
    ```
    /get?fields=key1;key2
    ```
* **sort**
  * To sort list of objects.
  * Example:
    ```
    /get?sort=key1==asc;key2==desc;key3
    ```
    Defaults to `asc` if not specified.
* **page**
  * To skip elements in list of objects based on the given limit.
  * Example:
    ```
    /get?page=1&limit=10
    ```
* **skip**
  * To skip elements in list of objects.
  * Example:
    ```
    /get?skip=1
    ```
* **limit**
  * To limit elements in list of objects.
  * Example:
    ```
    /get?limit=1
    ```

## Authors
* **Zishran Garces**

See also the list of [contributors](https://github.com/zishone/monique/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE](https://github.com/zishone/monique/blob/master/LICENSE) file for details.
