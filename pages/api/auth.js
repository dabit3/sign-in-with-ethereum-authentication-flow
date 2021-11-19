import { users } from '../../utils/users'

export default function auth(req, res) {
  const {address} = req.query
  let user = users[address]
  if (!user) {
    user = {
      address,
      nonce: Math.floor(Math.random() * 10000000)
    }
    users[address] = user
  } else {
    const nonce = Math.floor(Math.random() * 10000000)
    user.nonce = nonce
    users[address] = user
  }
  res.status(200).json(user)  
}