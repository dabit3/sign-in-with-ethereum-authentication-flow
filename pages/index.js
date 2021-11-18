import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

const base_string = 'sign-in-with-ethereum'

const ConnectWallet = () => {
    const [account, setAccount] = useState('')
    const [connection, setConnection] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState('')

    async function getWeb3Modal() {
      let Torus = (await import("@toruslabs/torus-embed")).default
      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: false,
        providerOptions: {
          torus: {
            package: Torus
          },
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: "8cf3cad623da43f9a84ab5ac94230cf6"
            },
          },
        },
      });
      return web3Modal
    }

    async function connect() {
      const web3Modal = await getWeb3Modal()
      web3Modal.clearCachedProvider()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts()
      setConnection(connection)
      setAccount(accounts[0])
    }

    async function signUp() {
      setError('')
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const signature = await signer.signMessage(base_string)
      const response = await fetch(`/api/auth?address=${account}&signature=${signature}`, {
        method: 'POST'
      })
      const data = await response.json()
      setLoggedIn(data.authenticated)
    }

    async function signIn() {
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner()
      const signature = await signer.signMessage(base_string)
      const response = await fetch(`/api/auth?address=${account}&signature=${signature}`)
      const data = await response.json()
      setLoggedIn(data.authenticated)
      if (!data.authenticated) {
        setError('error... not authenticated')
      }
    }

    async function signOut() {
      setLoggedIn(false)
    }

    return(
        <div style={container}>
          {
            !connection && <button style={button} onClick={connect}> Connect Wallet</button>
          }
          {
            error && <h2>No account yet created. Please sign up!</h2>
          }
          { connection && !loggedIn && (
            <div>
              <button style={button} onClick={signUp}>Sign Up</button>
              <button style={button} onClick={signIn}>Sign In</button>
            </div>
          )}
          {
            loggedIn && (
              (
                <>
                  <h1>Welcome, {account}</h1>
                  <button style={button} onClick={signOut}>Sign Out</button>
                </>
              )
            )
          }
        </div>
    )
}

const container = {
  width: '900px',
  margin: '50px auto'
}

const button = {
  width: '400px',
  margin: '5px',
  padding: '20px',
  border: 'none',
  backgroundColor: 'black',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer'
}

export default ConnectWallet