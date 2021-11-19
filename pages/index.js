import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const ConnectWallet = () => {
    const [account, setAccount] = useState('')
    const [connection, setConnection] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    async function getWeb3Modal() {
      let Torus = (await import('@toruslabs/torus-embed')).default
      const web3Modal = new Web3Modal({
        network: 'mainnet',
        cacheProvider: false,
        providerOptions: {
          torus: {
            package: Torus
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: '8cf3cad623da43f9a84ab5ac94230cf6'
            },
          },
        },
      })
      return web3Modal
    }

    async function connect() {
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts()
      setConnection(connection)
      setAccount(accounts[0])
    }

    async function signIn() {
      const authData = await fetch(`/api/authenticate?address=${account}`)
      const user = await authData.json()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const signature = await signer.signMessage(user.nonce.toString())
      const response = await fetch(`/api/verify?address=${account}&signature=${signature}`)
      const data = await response.json()
      setLoggedIn(data.authenticated)
    }

    return(
        <div style={container}>
          {
            !connection && <button style={button} onClick={connect}> Connect Wallet</button>
          }
          { connection && !loggedIn && (
            <div>
              <button style={button} onClick={signIn}>Sign In</button>
            </div>
          )}
          {
            loggedIn && <h1>Welcome, {account}</h1>
          }
        </div>
    )
}

const container = {
  width: '900px',
  margin: '50px auto'
}

const button = {
  width: '100%',
  margin: '5px',
  padding: '20px',
  border: 'none',
  backgroundColor: 'black',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer'
}

export default ConnectWallet