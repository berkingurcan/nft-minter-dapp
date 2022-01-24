import './App.css';
import mintExampleAbi from "./mintExampleJsonAbi.json"
import { ethers, BigNumber} from "ethers"
import { useEffect, useState } from 'react'

const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

function App() {

  //CONNECTING
  const [accounts, setAccounts] = useState([])
  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })
      setAccounts(accounts)
    }
  }

  useEffect(() => {
    connectAccounts()
  }, [])

  //MINTING
  const [mintAmount, setMintAmount] = useState(1)

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      )
      try {
        const response = await contract.mint(BigNumber.from(mintAmount))
        console.log(response)
      } catch(err) {
        console.log(err)
      }
      
    }
  }


  return (
    <div className="App">
      This is how you create mint button
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
            {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>

        </div>
      )}
    </div>
  )
}

export default App
