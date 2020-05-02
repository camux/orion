
import React from 'react'

function Footer({ ...props }) {
  return (
    <footer style={styles.footer}>
      <div style={styles.div}>
        <p style={styles.text}>
          <span>
            Copyright {1900 + new Date().getYear()}{' '}
            <a href='http://www.presik.com'>
              PRESIK SAS
            </a>
            , made for managers
          </span>
        </p>
      </div>
    </footer>
  )
}


const styles = {
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    marginBottom: 20,
    paddingTop: 40
  },
  div: {
    marginTop: 30,
    textAlign: 'center'
  },
  text: {
    paddingBottom: 20
  }
}

export default Footer
