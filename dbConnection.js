import mysql2 from "mysql2";
export const createConnection=()=>{
    let pool;
if(pool){
return pool
}else{
    pool=mysql2.createPool({
        connectionLimit:10,
        host:"localhost",
        user:"root",
        password:"siva",
        database:"practiceWithNode"
    })
    return pool;
}
    // pool.query('select * from users;',(error,results,feilds)=>{
    //     console.log("error",error)
    //     console.log("results",results)
    //     console.log("feilds",feilds)
    // })
}
