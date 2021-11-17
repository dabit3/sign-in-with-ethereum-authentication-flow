import { ethers } from "ethers";
import User from "../../utils/users";

export default function auth(req, res){
  if (req.method === 'POST') {
    let authenticated = false;
    const {address, signature} = req.query;
    const decodedAddress = ethers.utils.verifyMessage(address, signature)
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
    const {address, signature} = req.query;
    const decodedAddress = ethers.utils.verifyMessage(address, signature)
    if(address.toLowerCase() === decodedAddress.toLowerCase()) {
        const user = User.users.find(u => u.address = address)
        if (user) {
          authenticated = true
        }        
    }
    res.status(200).json({ authenticated })
  }
}