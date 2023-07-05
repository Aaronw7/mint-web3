import { useState } from 'react';
import { ethers } from 'ethers';
import roboPunksNFT from '../RoboPunksNFT.json';

const roboPunksNFTAddress = "0x468223c7750E789Ea25ED63A55177aA1355B125E";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        roboPunksNFTAddress,
        roboPunksNFT.abi,
        signer
      );
      try {
        const response = await contract.mint(mintAmount);
        console.log('response: ', response);
      } catch (err) {
        console.log("error: ", err)
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  }

  return (
    <div>
      <h1>RoboPunks</h1>
      <p>Mint RoboPunks!</p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>You must be connected to Mint.</p>
      )}
    </div>
  )
}

export default MainMint;