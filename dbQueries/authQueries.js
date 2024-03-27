export let getUsers="select * from users";

export const userInsertQuery=(user)=>{
    let query;
    if(user.securityKey != ""){
         query=`insert into users values('${user.userId}','${user.userName}','${user.password}','${user.securityKey}')`
    }else{
         query=`insert into users values('${user.userId}','${user.userName}','${user.password}')`
    }
    
    return query;
}

export const storeSecretToken=(user)=>{
     let query=`UPDATE users SET securityKey='${user.securityKey}' WHERE userId='${user.userId}'`
     return query
}
