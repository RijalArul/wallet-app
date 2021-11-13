const accountLogin = document.getElementById('account-login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const accountSubmit = document.getElementById('submit-btn')

class Account {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}

accountLogin.addEventListener('submit', async e => {
  try {
    e.preventDefault()
    const loginAccount = new Account(email.value, password.value)
    const response = await fetch('http://localhost:3000/accounts/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginAccount)
    })
    if (response.status === 401) {
      throw { name: 'Error_Login' }
    } else {
      const data = await response.json()
      localStorage.setItem('access_token', data.access_token)
    }
  } catch (err) {
    if (err.name === 'Error_Login') {
      alert('Invalid Email / Password')
      email.value = ''
      password.value = ''
    }
  }
})
