import { ethers } from 'ethers'
import User from '../../utils/users'

const base_string = 'sign-in-with-ethereum'

export default function auth(req, res) {
  const {address, signature, action} = req.query
  if (action === 'signup') {
    let authenticated = false
    const decodedAddress = ethers.utils.verifyMessage(base_string, signature)
    if(address.toLowerCase() === decodedAddress.toLowerCase()) {
      authenticated = true
      const user = User.users.find(u => u.address = address)
      if (!user) {
        User.addUser({
          address
        })
      }
    }
    res.status(200).json({authenticated})
  } else {
    let authenticated = false
    const decodedAddress = ethers.utils.verifyMessage(base_string, signature)
    if(address.toLowerCase() === decodedAddress.toLowerCase()) {
        const user = User.users.find(u => u.address = address)
        if (user) {
          authenticated = true
        }        
    }
    res.status(200).json({ authenticated })
  }
}