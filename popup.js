// import { ethers } from "./ethers.umd.min.js";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("accountList").addEventListener("click", changeAccount);
  document.getElementById("userAddress").addEventListener("click", copyAddress);
  document.getElementById("transferFund").addEventListener("click", handler);
  document.getElementById("header_network").addEventListener("click", getOpenNetwork);
  document.getElementById("network_item").addEventListener("click", getSelectedNetwork);
  document.getElementById("add_network").addEventListener("click", setNetwork);
  document.getElementById("loginAccount").addEventListener("click", loginUser);
  document.getElementById("accountCreate").addEventListener("click", createUser);
  document.getElementById("openCreate").addEventListener("click", openCreate);
  document.getElementById("sign_up").addEventListener("click", signUp);
  document.getElementById("login_up").addEventListener("click", login);
  document.getElementById("logout").addEventListener("click", logout);
  document.getElementById("open_Transfer").addEventListener("click", openTransfer);
  document.getElementById("goBack").addEventListener("click", goBack);
  document.getElementById("goBack_import").addEventListener("click", importGoBack);
  document.getElementById("open_Import").addEventListener("click", openImport);
  document.getElementById("open_assets").addEventListener("click", openAssets);
  document.getElementById("open_activity").addEventListener("click", openActivity);
  document.getElementById("goHomePage").addEventListener("click", goHomePage);
  document.getElementById("openAccountImport").addEventListener("click", openImportModel);
  document.getElementById("add_new_token").addEventListener("click", addToken);
  document.getElementById("close_import_account").addEventListener("click", closeImportModel);
  document.getElementById("add_New_Account").addEventListener("click", addAccount);
});

//State Variables
let providerURL =
  "https://polygon-amoy.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";

let privateKey;
let address;

//function 
function handler() {
  //display loader
  document.getElementById("transfer_center").style.display = "flex";

  const amount = document.getElementById("amount").value;
  address = document.getElementById("address").value;
//   const private_key = document.getElementById("private_key").value;
  // const private_key = "c31f7ef7384419859659c691ac72a84500143b21be1bfde31165f678acd75614";
  // const testAccount = "0x1D9e26033fa2cBEf118EDfAE3361Ec5BF738C16A";


  //Provider
  const provider = new ethers.providers.JsonRpcProvider(providerURL);

  //Wallet
  let wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
    // gasLimit: 21000,
    // gasPrice: ethers.utils.parseUnits('9', 'gwei'),
  };

  //txn verification
  let a = document.getElementById("link");
  a.href = "#";

  //send txn
  wallet.sendTransaction(tx).then((txObj) => {
    console.log("txHash: ", txObj.hash);
    document.getElementById("transfer_center").style.display = "none";
    const a = document.getElementById("link");
    a.href = `https://polygonscan.com/tx/${txObj.hash}`;
    document.getElementById("link").style.display = "block";
  });
}

function checkBalance(address) {
  // Provider
  const provider = new ethers.JsonRpcProvider(providerURL);
  
  provider.getBalance(address).then((balance) => {
    const balanceInEth = ethers.formatEther(balance);
    document.getElementById(
      "account_balance"
    ).innerHTML = `${balanceInEth} MATIC`;
    document.getElementById(
      "userAddress"
    ).innerHTML = `${address.slice(0,15)}...`;
  });
}

function getOpenNetwork() {
  document.getElementById("network").style.display = "block";
}

function getSelectedNetwork(e) {
  const element = document.getElementById("selected_network");
  element.innerHTML = e.target.innerHTML;

  if (e.target.innerHTML === "Polygon Amoy") {
    providerURL = "https://polygon-amoy.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Ethereum Mainnet") {
    providerURL = "https://eth-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Polygon PoS") {
    providerURL = "https://polygon-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Solana") {
    providerURL = "https://solana-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "OP Mainnet") {
    providerURL = "https://opt-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Arbitrum") {
    providerURL = "https://arb-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Linea") {
    providerURL = "https://linea-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
  else if (e.target.innerHTML === "Avalanche") {
    providerURL = "https://avax-mainnet.g.alchemy.com/v2/iZxSf_B6FkbG4Q76H19Essc_hxN2s0rI";
    document.getElementById("network").style.display = "none";
  }
}

function setNetwork() {
  document.getElementById("network").style.display = "none";
}

function loginUser() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("LoginUser").style.display = "block";
}

function createUser() {
  document.getElementById("createAccount").style.display = "block";
  document.getElementById("LoginUser").style.display = "none";
}

function openCreate() {
  document.getElementById("createAccount").style.display = "none";
  document.getElementById("create_popUp").style.display = "block";
}

function signUp(event) {
  event.preventDefault();  // Prevent default form submission

  const name = document.getElementById("sign_up_name").value;
  const email = document.getElementById("sign_up_email").value;
  const password = document.getElementById("sign_up_password").value;
  const passwordConfirm = document.getElementById("sign_up_passwordConfirm").value;

  document.getElementById("field").style.display = "none";
  document.getElementById("center").style.display = "block";

  const wallet = ethers.Wallet.createRandom();

  if(wallet.address) {
    console.log(wallet);

    // API CALL
    const url = 'http://localhost:3000/api/v1/user/signup';

    const data = {
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      address: wallet.address,
      private_key: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase
    };
    console.log(data);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      return response.json();
    })
    .then((wallet) => {
      document.getElementById("createAddress").innerHTML = wallet.address;
      document.getElementById("createPrivateKey").innerHTML = wallet.privateKey; // You might want to mask this or handle it carefully
      document.getElementById("createMnemonic").innerHTML = wallet.mnemonic; // Same for mnemonic

      document.getElementById("center").style.display = "none";
      document.getElementById("sign_up").style.display = "none";

      const userWallet = {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic
      };

      const jsonObj = JSON.stringify(userWallet);
      localStorage.setItem('userWallet', jsonObj);

      document.getElementById("goHomePage").style.display = "block";
    })
    .catch((error) => console.log("Error:", error));
  }
}

function login() {
  document.getElementById("login_form").style.display = "none";
  document.getElementById("center").style.display = "block";

  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  //API CALL
  const url = 'http://localhost:3000/api/v1/user/login';
  const data = {
    email: email,
    password: password
  };

  fetch(url,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json()).then((result) => {
    console.log(result);
    const userWallet = {
      address: result.data.user.address,
      privateKey: result.data.user.private_key,
      mnemonic: result.data.user.mnemonic
    }
    console.log(userWallet);

    const jsonObj = JSON.stringify(userWallet);
    localStorage.setItem('userWallet', jsonObj);
    window.location.reload();
  }).catch((error) => {
    console.error('Error:', error);
  });
}

function logout() {
  localStorage.removeItem('userWallet');
  window.location.reload();
}

function openTransfer() {
  document.getElementById("transfer_form").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function goBack() {
  document.getElementById("transfer_form").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImport() {
  document.getElementById("import_token").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function importGoBack() {
  document.getElementById("import_token").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openActivity() {
  document.getElementById("activity").style.display = "block";
  document.getElementById("assets").style.display = "none";
}

function openAssets() {
  document.getElementById("activity").style.display = "none";
  document.getElementById("assets").style.display = "block";
}

function goHomePage() {
  document.getElementById("create_popUp").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function openImportModel() {
  document.getElementById("import_account").style.display = "block";
  document.getElementById("home").style.display = "none";
}

function closeImportModel() {
  document.getElementById("import_account").style.display = "none";
  document.getElementById("home").style.display = "block";
}

function addToken() {
  const name = document.getElementById("token_name").value;
  const address = document.getElementById("token_address").value;
  const symbol = document.getElementById("token_symbol").value;

  //API CALL 

  const url = 'http://localhost:3000/api/v1/tokens/createtoken';
  const data = {
    name: name,
    address: address,
    symbol: symbol
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json()).then((result) => {
    console.log(result);
    window.location.reload();
  }).catch((error) => {
    console.error('Error:', error);
  });
}

function addAccount() {
  const privateKey = document.getElementById("add_account_private_key").value;
  const provider = new ethers.JsonRpcProvider(providerURL);

  let wallet = new ethers.Wallet(privateKey, provider);

  console.log(wallet);

  const url = 'http://localhost:3000/api/v1/accounts/createaccount';

  const data = {
    address: wallet.address,
    privateKey: privateKey,
    // mnemonic: wallet.mnemonic.phrase
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json()).then((result) => {
    console.log(result);
    window.location.reload();
  }).catch((error) => {
    console.error('Error:', error);
  }); 
}

function myFunction() {
  console.log(ethers);
    const str = localStorage.getItem('userWallet');
    const parseObj = JSON.parse(str);

    if(parseObj?.address){
      document.getElementById("LoginUser").style.display = "none";
      document.getElementById("home").style.display = "block";

      privateKey = parseObj.private_key;
      address = parseObj.address;
      console.log(privateKey);

      checkBalance(address); 
    }

    const tokenRender = document.querySelector(".assets");
    const accountRender = document.querySelector(".accountList");

    const url = 'http://localhost:3000/api/v1/tokens/alltoken';
    fetch(url).then((response) => response.json()).then((data) => {
      let element = "";

      data.data.tokens.forEach((token) => (
        element += `<div class="assets_items">
        <img class="assets_items_img"
        src="./assets/icons/favicon.png"
        alt=""
        />
        <span>${token.address.slice(0,15)}...</span>
        <span>${token.symbol}</span>
        </div>`)
      );
      tokenRender.innerHTML = element;
    }).catch((error) => {
      console.log('Error:', error);
    });

    fetch('http://localhost:3000/api/v1/accounts/allaccounts').then((response) => response.json()).then((data) => {
      let accounts = "";

      data.data.accounts.map((account, i) => (
        accounts += `<div class="lists">
        <p>${i + 1}</p>
        <p class="accountValue" data-address=${account.address} data-privateKey=${account.privateKey}>${account.address.slice(0,25)}...</p>
        </div>)
        `)
      );
      accountRender.innerHTML = accounts;
    }).catch((error) => {
      console.error('Error:', error);
    });

    console.log(privateKey);
}

function copyAddress() {
  navigator.clipboard.writeText(address);
  alert("Address copied to clipboard");
}

function changeAccount(event) {
  event.preventDefault();

  const data = event.currentTarget;
  const address = data.getAttribute("data-address");
  const privateKey = data.getAttribute("data-privateKey");

  if (!address || !privateKey) {
    console.error("Missing account details");
    return;
  }

  console.log("Switching to account:", address);

  let accounts = JSON.parse(localStorage.getItem("userWallets")) || [];

  accounts = accounts.filter(account => account.address !== address);

  accounts.push({ address, privateKey, mnemonic: "Changed" });

  localStorage.setItem("userWallets", JSON.stringify(accounts));

  window.location.reload();
}

window.onload = myFunction;
