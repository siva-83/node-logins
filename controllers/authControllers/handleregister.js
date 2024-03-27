import {getUsers,userInsertQuery,storeSecretToken} from "../../dbQueries/authQueries.js"
import {runQuery} from "../../utils/executeQuery.js"
import { v4 as uuidv4 } from 'uuid';
import jwt from "jsonwebtoken"
import bcrypt from"bcrypt";
const saltRounds = 10;
export const handleRegistration=async(req,res)=>{
    const usersArray=await runQuery(getUsers)
    let find=[]
    find=usersArray.filter((each)=>{
       if( each.userName===req.body.userName){
        return each
       }
    })
    if(find.length==0){
        // console.log("unique id",uuidv4())
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPwd = bcrypt.hashSync(req.body.password, salt);
        let user={
            userId:uuidv4(),
            userName:req.body.userName,
            password:hashPwd,
            securityKey:"null"
        }
       
        try{
            const query=userInsertQuery(user)
            const result=await runQuery(query)
            res.status(201).json({"message":"account created"})
        }
        catch(err){
            res.status(500).json(err)
        }
        
    }else{
        res.status(400).json({"message":"Duplicate username"})
    }

   
}

export const handleLogin=async(req,res)=>{
    const usersArray=await runQuery(getUsers)
    const {userName,password}=req.body
    console.log("user details",req.body)
    if(!userName || !password){
        res.status(400).json({"message":"userName and Password is required"})
    }
    let finduser=usersArray.find(each=>each.userName==req.body.userName)
    if(finduser){
        let authStatus=bcrypt.compareSync(req.body.password, finduser.password);
        if(authStatus){
            let accessToken=jwt.sign({user:userName},process.env.access_secret_key,{expiresIn:'30s'})
            let refreshToken=jwt.sign({user:userName},process.env.refresh_secret_key,{expiresIn:'1d'})
            let storeQuery=storeSecretToken({
                userId:finduser.userId,
            securityKey:refreshToken
            })
            const results=await runQuery(storeQuery)
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        }
    }else{
        res.status(400).json({"message":"unauthorized person"})
        console.log("user not found")
    }
}


export const handleRefresh=async(req,res)=>{
    const cookies=req.cookies
    if(!cookies?.jwt){
       return res.status(401).json({"message":"unauthorized person"})
    }
    const refreshToken=cookies.jwt
    const usersArray=await runQuery(getUsers)
    const findPerson=usersArray.find((each)=>
        each.securityKey==refreshToken
    )
    console.log("find in refresh",findPerson)
    if (findPerson){
        jwt.verify(
            refreshToken,
            process.env.refresh_secret_key,
            (err, decoded) => {
                console.log(findPerson.userName,"decode",decoded.user)
                if (err || findPerson.userName !== decoded.user) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    { "user": decoded.userName },
                    process.env.access_secret_key,
                    { expiresIn: '30s' }
                );
                res.json({ accessToken })
            }
        );
            // let accessToken=jwt.sign({user:findPerson.userName},process.env.access_secret_key,{expiresIn:'30s'})
            // let refreshToken=jwt.sign({user:userName},process.env.refresh_secret_key,{expiresIn:'1d'})
            // let storeQuery=storeSecretToken({
            //     userId:finduser.userId,
            // securityKey:refreshToken
            // })
            // const results=await runQuery(storeQuery)
            // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            // res.json({ accessToken });
        
    }else{
        res.status(400).json({"message":"unauthorized person"})
    }


}
