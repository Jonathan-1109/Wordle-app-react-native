import users from "../models/usersModel.js" 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { HASH_NUMBER, REFRESH_TOKEN, SECRET_KEY_JWT } from "../config/config_env.js"

export const register_account = async (req,res) => {
  try {

    const temp = Object.values(req.body)

    temp.map((data) => {
      if (!data) throw new Error('missing data')
    })

    const {password, ...data} = req.body;
          
    if (password !== data.confirmPassword) throw new Error('Passwords do not match')   

    const newUser = new users({
      ...data,
      password: await bcrypt.hash(password,parseInt(HASH_NUMBER))
    });

    const refreshToken = await generateRefresh(newUser)

    const accessToken = await generateAccess(newUser)

    await newUser.save()
    return res.status(201).json({message: "Created user", accessToken, refreshToken})

  } catch (err) {
    console.error(err.message)
    return res.status(400).json({ error: "error creating user"})
  }
}

export const login_account = async (req, res) => {
  try {
  
    const {password, name} = req.body;
    if (!password || !name) throw new Error('missing data')
    
    const user = await users.findOne({name: name})
    
    if (!user) throw new Error('username does not exist')
    
    const isValid = await bcrypt.compare(password,user.password)
    if (!isValid) throw new Error("Password invalid")

    const accessToken = await generateAccess(user)
    const refreshToken = await generateRefresh(user)
    await user.save()
    
    return res.status(200).json({accessToken, refreshToken})
  } catch (err) {
    console.error(err.message)
    return res.status(400).json({error: 'error when logging in'})

  }
}

export const refresh = async (req,res) => {
  try {
    const refreshToken = req.body.refreshToken || ""
    if (!refreshToken) {
      return res.status(401).send({message: 'Invalid refresh token'})
    }
    const decode = jwt.verify(refreshToken, REFRESH_TOKEN)
    if (!decode) {
      return res.status(401).send({message: 'Invalid refresh token'})
    }
    const user = await users.findOne({name: decode.name})
    if (!user) {
      return res.status(401).send({message: 'Invalid user'})          
    }
    const newAccesstoken = await generateAccess(user)
    return res.status(200).send({accessToken: newAccesstoken})

  }  catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token error'});
    }
    return res.status(400).send({error: "error"})
  }
}

export const generateRefresh = async (user) => {
    const refreshToken = jwt.sign({id: user._id, name: user.name, mail: user.mail}, REFRESH_TOKEN, {
      expiresIn: '7d'
    })
    return refreshToken
}

export const generateAccess = async (user) => {
    const accessToken = jwt.sign({id: user._id, name: user.name, mail: user.mail}, SECRET_KEY_JWT, {
      expiresIn: '1h'
    })
    return accessToken
}