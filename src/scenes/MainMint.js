import { useState } from 'react';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
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
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="600px">
        <div>
          <Text fontSize="60px" textShadow="0 5px #000000">RoboPunks</Text>
          <Text
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000000"
          >
            Mint RoboPunks and Enter the Future!
          </Text>
        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#DA53C3"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#DA53C3"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
                backgroundColor="#DA53C3"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0F0F0F"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10"
                onClick={handleMint}
              >
                MINT NOW
              </Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#DA53C3"
          >
            You must be connected to Mint.
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default MainMint;