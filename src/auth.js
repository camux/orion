
class AppStorage {
  static setUser (data) {
    const res = JSON.stringify(data)
    localStorage.setItem('user', res)
  }

  static isUserAuthenticated () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      return true
    }
  }

  static deauthenticateUser () {
    localStorage.removeItem('user')
  }

  static getToken () {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.token
  }

  static getUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default AppStorage
