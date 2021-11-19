import { ethers } from 'ethers'
import { users } from '../../utils/users'

export default function verify(req, res) {
  let authenticated = false;
  const {address, signature, nonce} = req.query;
  const user = users[address]
  if (user && user.nonce.toString() !== nonce) {
    res.status(200).json({authenticated})
  } else {
    const decodedAddress = ethers.utils.verifyMessage(nonce, signature)
    if(address.toLowerCase() === decodedAddress.toLowerCase()) authenticated = true
    res.status(200).json({authenticated})
  }
}