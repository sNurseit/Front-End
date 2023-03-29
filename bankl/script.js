'use strict';


const account1 = {
  owner: 'Slam Olzhas',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 70.79, 1300],
  interestRate: 1.2, 
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2022-01-28T09:15:04.904Z',
    '2022-01-01T10:17:24.185Z',
    '2022-02-08T14:11:59.604Z',
    '2022-05-12T17:01:17.194Z',
    '2022-05-14T23:36:17.929Z',
    '2022-05-20T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', 
};

const account2 = {
  owner: 'Taimas Nurseit',
  movements: [5000, 3400, -100, -7900, -3010, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2022-01-25T14:18:46.235Z',
    '2022-02-05T16:33:06.386Z',
    '2022-03-10T14:43:26.374Z',
    '2022-05-25T18:49:59.371Z',
    '2022-04-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];


const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const formatMovementDate = function (date, locale) {
 
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
  
    return new Intl.DateTimeFormat(locale).format(date);
  }
};


const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};


const displayMovements = function (acc, sort = false) {
 
  containerMovements.innerHTML = '';

 
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

   
    const date = new Date(acc.movementsDates[i]);

   
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${type}</div>
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};


const calcDisplayBalance = function (acc) {
 
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};


const calcDisplaySummery = function (acc) {
  
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

 
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
  
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUserName = function (accounts) {
  
  accounts.forEach(function (account) {

    account.username = account.owner
      .toLowerCase()
      .split(' ') 
      .map(name => name[0]) 
      .join(''); 
  });
};
createUserName(accounts);


const updateUI = function (acc) {
 
  displayMovements(acc);

  
  calcDisplayBalance(acc);

  
  calcDisplaySummery(acc);
};


let timer;

const startLogOutTimer = function () {
  let time = 60 * 10;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(Math.trunc(time % 60)).padStart(2, 0);

    labelTimer.textContent = `${min}:${sec}`;

   
    if (time === 0) {
      clearInterval(timer);
      
      labelWelcome.textContent = `Log in to get started`;

      
      containerApp.style.opacity = 0;
    }


    time--;
  };

 

  tick();
  
  const innerTimer = setInterval(tick, 1000);
  return innerTimer;
};


let currentAccount;

btnLogin.addEventListener('click', function (e) {
 
  e.preventDefault();

 
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  
  if (currentAccount?.pin === +inputLoginPin.value) {
    
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    
    containerApp.style.opacity = 100;

    
    updateUI(currentAccount);

    
    inputLoginUsername.value = inputLoginPin.value = '';

   
    inputLoginPin.blur();

    
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'numeric',
     
      day: 'numeric',
      
      hour: 'numeric',
      minute: 'numeric',
    };
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});



btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  
  inputTransferAmount.value = inputTransferTo.value = '';

  
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
   
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

  
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    
    updateUI(currentAccount);

    
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});



btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    setTimeout(function () {
  
      currentAccount.movements.push(amount);

    
      currentAccount.movementsDates.push(new Date().toISOString());

    
      updateUI(currentAccount);

     
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
   
    );
   

    
    accounts.splice(index, 1);

    
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});



const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);


let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});