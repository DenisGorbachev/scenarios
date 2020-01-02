// Based on https://github.com/jorendorff/toy-calculator

export default class Calculator {
  constructor() {
    this.input = ''
  }

  send(input) {
    this.input += input
    return this.input
  }

  run() {
    if (!this.input.length) return 0

    var variables = Object.create(null)
    variables.e = Math.E
    variables.pi = Math.PI

    const evaluate = function (obj) {
      switch (obj.type) {
        case 'number':
          return parseInt(obj.value)
        case 'name':
          return variables[obj.id] || 0
        case '+':
          return evaluate(obj.left) + evaluate(obj.right)
        case '-':
          return evaluate(obj.left) - evaluate(obj.right)
        case '*':
          return evaluate(obj.left) * evaluate(obj.right)
        case '/':
          return evaluate(obj.left) / evaluate(obj.right)
      }
    }

    return evaluate(this.parse())
  }

  tokenize(code) {
    var results = []
    var tokenRegExp = /\s*([A-Za-z]+|[0-9]+|\S)\s*/g

    var m
    while ((m = tokenRegExp.exec(code)) !== null)
      results.push(m[1])
    return results
  }

  parse() {
    // Break the input into tokens.
    var tokens = this.tokenize(this.input)

    // The parser will do a single left-to-right pass over `tokens`, with no
    // backtracking. `position` is the index of the next token. Start at
    // 0. We’ll increment this as we go.
    var position = 0

    const isNumber = function (token) {
      return token !== undefined && token.match(/^[0-9]+$/) !== null
    }

    const isName = function (token) {
      return token !== undefined && token.match(/^[A-Za-z]+$/) !== null
    }

    // `peek()` returns the next token without advancing `position`.
    const peek = function () {
      return tokens[position]
    }

    // `consume(token)` consumes one token, moving `position` to point to the next one.
    const consume = function (token) {
      if (token !== tokens[position]) throw new Error(`Token ${token} is not equal to token ${tokens[position]} (at position ${position})`)
      position++
    }

    // Now we have the functions that are actually responsible for parsing.
    // This is the cool part. Each group of syntax rules is translated to one
    // function.

    // Parse a *PrimaryExpr*—that is, tokens matching one of the three syntax
    // rules below. Whatever kind of expression we find, we return the corresponding
    // JS object.
    //
    // <div style="margin-left: 2em">
    //  <div>*PrimaryExpr* **:**</div>
    //  <div style="margin-left: 2em">
    //   <div>*Number*</div>
    //   <div>*Name*</div>
    //   <div><b><code>(</code></b> *Expr* <b><code>)</code></b></div>
    //  </div>
    // </div>
    const parsePrimaryExpr = function () {
      var t = peek()
      console.log('t', t)

      if (isNumber(t)) {
        consume(t)
        return { type: 'number', value: t }
      } else if (isName(t)) {
        consume(t)
        return { type: 'name', id: t }
      } else if (t === '(') {
        consume(t)
        var expr = parseExpr()
        if (peek() !== ')')
          throw new SyntaxError('expected )')
        consume(')')
        return expr
      } else {
        // If we get here, the next token doesn’t match any of the three
        // rules. So it’s an error.
        throw new SyntaxError('expected a number, a variable, or parentheses')
      }
    }

    const parseMulExpr = function () {
      var expr = parsePrimaryExpr()
      var t = peek()
      while (t === '*' || t === '/') {
        consume(t)
        var rhs = parsePrimaryExpr()
        expr = { type: t, left: expr, right: rhs }
        t = peek()
      }
      return expr
    }

    // <div style="margin-left: 2em">
    //  *Expr* **:**
    //  <div style="margin-left: 2em">
    //   <div>*MulExpr* ( <b><code>+</code></b> *MulExpr* | <b><code>-</code></b> *MulExpr* )<sup>\*</sup></div>
    //  </div>
    // </div>
    const parseExpr = function () {
      var expr = parseMulExpr()
      var t = peek()
      while (t === '+' || t === '-') {
        consume(t)
        var rhs = parseMulExpr()
        expr = { type: t, left: expr, right: rhs }
        t = peek()
      }
      return expr
    }

    // Now all that remains, really, is to call `parseExpr()` to parse an *Expr*.
    var result = parseExpr()

    // Well, one more thing. Make sure `parseExpr()` consumed *all* the
    // input. If it didn’t, that means the next token didn’t match any syntax
    // rule, which is an error.
    if (position !== tokens.length)
      throw new SyntaxError('unexpected \'' + peek() + '\'')

    return result
  }

}
