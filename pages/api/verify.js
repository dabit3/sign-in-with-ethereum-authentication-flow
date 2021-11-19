import { ethers } from 'ethers'
import { users } from '../../utils/users'

export default function verify(req, res) {
  let authenticated = false
  const {address, signature} = req.query
  const user = users[address]
  const decodedAddress = ethers.utils.verifyMessage(user.nonce.toString(), signature)
  if(address.toLowerCase() === decodedAddress.toLowerCase()) authenticated = true
  res.status(200).json({authenticated})
}