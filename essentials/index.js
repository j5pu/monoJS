new URL("https://jose:passwd@subdomain.mnopi.com:8000/api/py?param=1&arg=2#!Introduction")

function Foo1(bar1, bar2) {
    this.bar1 = bar1;
    this.bar2 = bar2;
  }

const myFoo1 = new Foo1('Bar 1', 2021);

class Foo {
    constructor(bar1, bar2) {
        this.bar1 = bar1;
        this.bar2 = bar2;
    }
}

const myFoo = new Foo('Bar 1', 2021);

const o = {x: 1, y: 2, z: 3};
const {x, ...yz} = o;
// > yz
// { y: 2, z: 3 }
const [a, b, ...other] = [10, 20, 30, 40, 50];

function Car() {}
car1 = new Car();
car2 = new Car();

console.log(car1.color);    // undefined

Car.prototype.color = 'original color';
console.log(car1.color);    // 'original color'

car1.color = 'black';
console.log(car1.color);    // 'black'

console.log(Object.getPrototypeOf(car1).color); // 'original color'
console.log(Object.getPrototypeOf(car2).color); // 'original color'
console.log(car1.color);   // 'black'
console.log(car2.color);   // 'original color'


function parse() {
    return 1
}

const call = "parse"
const funcs = {parse: parse}
funcs[call]()
eval(call)()

// in matches also the "prototype chain" better use hasOwnProperty
if (call in funcs) { funcs[call](); }
if (funcs.hasOwnProperty(call)) { funcs[call](); } 
Object.prototype.hasOwnProperty.call(funcs, call);


function first() {
    return functions[first.name]
}

function second() {
    return functions[second.name]
}
const functions = {first: first, second: second}

function main(func) {
    if (functions.hasOwnProperty(func)) { return functions[func](); }
}

main('first') 

// https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics
// https://www.w3schools.com/js/tryit.asp?filename=tryjs_win_inner
// https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics

// https://expressjs.com/en/5x/api.html
req.app.get
req.baseUrl
req.geo
req.host
req.hostname
req.ip
req.ips
req.method
// path 
req.params.name
req.params[0] 
req.path
req.protocol
req.route
req.secure
req.signedCookies
req.stale
req.subdomains
// https://vercel.com/features/edge-functions
// https://nextjs.org/docs/middleware
// https://nextjs.org/docs/api-reference/next/server
req.ua
req.get('Content-Type')
// With Content-Type: text/html; charset=utf-8
req.is('html') // => 'html'
req.is('text/html') // => 'text/html'
req.is('text/*') // => 'text/*'

// When Content-Type is application/json
req.is('json') // => 'json'
req.is('application/json') // => 'application/json'
req.is('application/*') // => 'application/*'

req.is('html')
// => false

// response supports built-in fields and methods
// https://nodejs.org/api/http.html#http_class_http_serverresponse
res.app
res.headersSent
res.locals
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.attachment()
// Content-Disposition: attachment
res.attachment('path/to/logo.png')
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png

res.download('/report-12345.pdf')

res.download('/report-12345.pdf', 'report.pdf')

res.download('/report-12345.pdf', 'report.pdf', function (err) {
  if (err) {
    // Handle error, but keep in mind the response may be partially-sent
    // so check res.headersSent
  } else {
    // decrement a download credit, etc.
  }
})
res.format(object)
res.format({
    text: function () {
      res.send('hey')
    },
  
    html: function () {
      res.send('<p>hey</p>')
    },
  
    json: function () {
      res.send({ message: 'hey' })
    },

    default: function () {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable')
    }
  })
res.get('Content-Type')
// => "text/plain"
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
res.send(Buffer.from('whoop'))
res.send({ some: 'json' })
res.send('<p>some html</p>')
res.status(404).send('Sorry, we cannot find that!')
res.status(500).send({ error: 'something blew up' })
res.set('Content-Type', 'text/html')
// When the parameter is a Buffer object, the method sets the Content-Type response header field to “application/octet-stream”, unless previously defined as shown below:
res.send(Buffer.from('<p>some html</p>'))
// When the parameter is a String, the method sets the Content-Type to “text/html”:
res.send('<p>some html</p>')
// When the parameter is an Array or Object, Express responds with the JSON representation:
res.send({ user: 'tobi' })
res.send([1, 2, 3])
app.get('/file/:name', function (req, res, next) {
    const options = {
      root: path.join(__dirname, 'public'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    const fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  })

  if (typeof body === 'string') {
    response.status(code).end(body);
  } else {
    response.status(code).json(body);
  }