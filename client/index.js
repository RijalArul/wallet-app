const accountLogin = document.getElementById('account-login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const accountSubmit = document.getElementById('submit-btn')
const profileAccount = document.querySelector('profile')
const incomeAddForm = document.getElementById('add-income')
const incomeName = document.getElementById('nameincome')
const incomeAmount = document.getElementById('amountincome')
const incomeSubmit = document.getElementById('submit-income')

class Account {
  constructor (email, password, saldo) {
    this.email = email
    this.password = password
    this.saldo = saldo
  }

  static async showProfile () {
    try {
      const response = await fetch('http://localhost:3000/accounts/profile', {
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })

      const data = await response.json()

      Account.profileHtml(data)
    } catch (err) {
      console.log(err)
    }
  }

  static async profileHtml (data) {
    try {
      let output = ``
      output = `
            <img src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.mcpayment.id/wp-content/uploads/2017/07/mcpayment-logo.png"
                alt="" style="width:100%">
            <h3>${data.email}</h3>
            <p>${data.saldo}</p>
        `
      return (document.getElementById('profile').innerHTML = output)
    } catch (err) {
      console.log(err)
    }
  }
}

Account.showProfile()

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
      email.value = ''
      password.value = ''
    }
  } catch (err) {
    if (err.name === 'Error_Login') {
      alert('Invalid Email / Password')
      email.value = ''
      password.value = ''
    }
  }
})

class Income {
  constructor (name, amount, data) {
    this.name = name
    this.amount = amount
    this.data = data
  }

  static showData () {
    Income.incomeHtml(this.name, this.amount)
    return this
  }

  static storeData (income) {
    const data = this.data ?? []
    data.push(income)
  }

  static async showIncome () {
    try {
      const response = await fetch('http://localhost:3000/incomes', {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })

      const data = await response.json()
      this.data = data
      Income.incomeHtml(this.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async incomeHtml (data) {
    try {
      let output = ``
      data.forEach(income => {
        output += `
                <tr>
                    <td>${income.id}</td>
                    <td>${income.name}</td>
                    <td>${income.amount}</td>
                     <td>
                    <button class="edit" data-id=${income.id}> Edit </button> || <button class="delete" data-id=${income.id}> Delete </button>
                    </td>
                </tr>
            `
      })

      return (document.getElementById('body-income-table').innerHTML = output)
    } catch (err) {
      console.log(err)
    }
  }
}

Income.showIncome()

incomeAddForm.addEventListener('submit', async e => {
  try {
    e.preventDefault()
    const addIncome = new Income(incomeName.value, incomeAmount.value)
    const response = await fetch(`http://localhost:3000/incomes`, {
      method: 'POST',
      headers: {
        access_token: localStorage.getItem('access_token'),
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addIncome)
    })

    const newIncome = await response.json()
    Income.showData().storeData(newIncome)
  } catch (err) {
    console.log(err)
  }
})
