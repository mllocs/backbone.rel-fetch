# Backbone.rel-fetch

Backbone.rel-fetch extends your Backbone Models with the `relFetch` method.

## Dependencies

- [Backbone.rel](https://github.com/masylum/Backbone.Rel)
- [Backbone.partial-fetch](https://github.com/masylum/backbone.partial-fetch)

It uses the Backbone.rel `hasMany` and `belongsTo` relations.

## Usage

The `relFetch` method allows you to partially fetch a collection to update the related Model/Collection.

### Example in 1-1 relation (belongsTo)

Where you normally would use:

```js
task.rel('user');
```

using `relFetch` you would be able to use:

```js
task.relFetch('user', {success: onSuccess, error: onError});
```

In this example `relFetch` would make an HTTP request to fetch the user model.

### Example in 1-n relation (hasMany)

Where you normally would use:

```js
task.rel('comments');
```

using `relFetch` you would be able to use:

```js
task.relFetch('comments', {success: onSuccess, error: onError});
```

In this example `relFetch` would make an HTTP request to fetch the task' comments.

## Tests

You must have node installed in order to run the tests.

```
npm install
make
```

## License

(The MIT License)

Copyright (c) 2012 Màxim Colls <collsmaxim@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
