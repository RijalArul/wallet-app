const accountLogin = document.getElementById('account-login')
const email = document.getElementById('email')
const password = document.getElementById('password')
const accountSubmit = document.getElementById('submit-btn')
const profileAccount = document.querySelector('profile')
const listIncome = document.querySelector('#example tbody')
const incomeAddForm = document.getElementById('add-income')
const incomeName = document.getElementById('nameincome')
const incomeAmount = document.getElementById('amountincome')
const incomeSubmit = document.getElementById('submit-income')
const editIncome = document.getElementById('editIncomeSubmit')
const expendAddForm = document.getElementById('add-expend')
const expendName = document.getElementById('nameexpend')
const expendAmount = document.getElementById('amountexpend')
const expendSubmit = document.getElementById('submit-expend')
const editExpend = document.getElementById('editExpendSubmit')
const listExpend = document.querySelector('#expends tbody')

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
            <p>Rp. ${data.saldo.toLocaleString()},-</p>
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
    return this.data
  }

  static updateIncomes (id) {
    const newIncome = {
      id: +id,
      name: this.name,
      amount: this.amount
    }

    const updateIncome = this.data.map(income => {
      if (income.id === +id) {
        return newIncome
      }
      return income
    })

    return updateIncome
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
    if (!editIncome.value) {
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
      Income.showData().push(newIncome)
    } else {
      const id = editIncome.value
      const incomeEdit = new Income(incomeName.value, incomeAmount.value)
      const response = await fetch(`http://localhost:3000/incomes/${id}`, {
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(incomeEdit)
      })

      const data = await response.json()
      Income.updateIncome(data.id)
      listIncome.innerHTML = ''
      Income.showData()
    }
  } catch (err) {
    console.log(err)
  }
})

listIncome.addEventListener('click', async e => {
  const incomes = Income.showData()
  try {
    if (e.target.classList.contains('delete')) {
      const id = e.target.getAttribute('data-id')
      await fetch(`http://localhost:3000/incomes/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      incomes.filter(income => income.id !== +id)
      e.target.parentElement.parentElement.remove()
    }

    if (e.target.classList.contains('edit')) {
      const id = e.target.getAttribute('data-id')
      const income = incomes.find(income => income.id === +id)
      incomeName.value = income.name
      incomeAmount.value = income.amount
      editIncome.value = +id
      incomeSubmit.value = 'Edit this Income'
    }
  } catch (err) {
    console.log(err)
  }
})

class Expend {
  constructor (name, amount, data) {
    this.name = name
    this.amount = amount
    this.data = data
  }

  static showData () {
    return this.data
  }

  static async showExpends () {
    try {
      const response = await fetch('http://localhost:3000/expends', {
        method: 'GET',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })

      const data = await response.json()
      this.data = data
      Expend.expendHtml(this.data)
    } catch (err) {
      console.log(err)
    }
  }

  static async expendHtml (data) {
    try {
      let output = ``
      data.forEach(expend => {
        output += `
                <tr>
                    <td>${expend.id}</td>
                    <td>${expend.name}</td>
                    <td>${expend.amount}</td>
                     <td>
                    <button class="edit" data-id=${expend.id}> Edit </button> || <button class="delete" data-id=${expend.id}> Delete </button>
                    </td>
                </tr>
            `
      })
      return (document.getElementById('body-expend-table').innerHTML = output)
    } catch (err) {
      console.log(err)
    }
  }
}

Expend.showExpends()

expendAddForm.addEventListener('submit', async e => {
  try {
    e.preventDefault()
    if (!editExpend.value) {
      const addExpend = new Income(expendName.value, expendAmount.value)
      const response = await fetch(`http://localhost:3000/expends`, {
        method: 'POST',
        headers: {
          access_token: localStorage.getItem('access_token'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addExpend)
      })

      const newExpends = await response.json()
      Expend.showData().push(newExpends)
    } else {
      const id = editExpend.value
      const expendEdit = new Income(editExpend.value, editExpend.value)
      const response = await fetch(`http://localhost:3000/incomes/${id}`, {
        method: 'PUT',
        headers: {
          access_token: localStorage.getItem('access_token'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(expendEdit)
      })
      const data = await response.json()
      Income.updateIncome(data.id)
      listIncome.innerHTML = ''
      Income.showData()
    }
  } catch (err) {
    console.log(err)
  }
})

listExpend.addEventListener('click', async e => {
  const expends = Expend.showData()
  try {
    if (e.target.classList.contains('delete')) {
      const id = e.target.getAttribute('data-id')
      await fetch(`http://localhost:3000/expends/${id}`, {
        method: 'DELETE',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
      expends.filter(expend => expend.id !== +id)
      e.target.parentElement.parentElement.remove()
    }

    if (e.target.classList.contains('edit')) {
      const id = e.target.getAttribute('data-id')
      const expend = expends.find(expend => expend.id === +id)
      expendName.value = expend.name
      expendAmount.value = expend.amount
      editExpend.value = +id
      expendSubmit.value = 'Edit this Expend'
    }
  } catch (err) {
    console.log(err)
  }
})
