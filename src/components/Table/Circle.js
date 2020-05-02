
import React from 'react'

class Eval {
  safeEval(args) {
    this.eval(args)
  }
  eval() {
  }
}

function Circle (props) {
  let color = '#717171'
  // const _eval = new Eval ()
  if (props.value) {
    for (const val of props.color) {
      let operator = val[0]
      let operand = val[1]

      const ctx_domain = `'${props.value}' ${operator} '${operand}'`
      // FIXME: use (_eval.safeEval(ctx_domain)) {
      if (eval(ctx_domain)) {
        color = val[2]
        break
      }
    }
  }

  return (
    <div id='circle' style={stylesCtx(color)} title={props.value}>
    </div>
  )
}

function stylesCtx (color) {
  return {
    borderRadius: '50%',
    width: 30,
    height: 30,
    backgroundColor: color,
    boxSizing: 'border-box',
    margin: 'auto'
  }
}

// Example domain colors
//
// [['<',  -10, '#f45252'], ['<',  10, '#4e81d9']]
// [
//   ['===', 'quotation', '#b0b0b0'],
//   ['===', 'confirmed', '#ff4984'],
//   ['===', 'processing', '#49a7ff'],
//   ['===', 'done', '#ff4984']
// ]

export default Circle
