import {createConnection} from "../dbConnection.js"
export const runQuery=async (query)=>{
    const pool=await createConnection()
    return new Promise((resolve, reject) => {
        pool.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                console.log("results", results);
                resolve(results);
            }
        });
    });
    //  pool.query(query,(error,results,feilds)=>{
    //     console.log("results",results)
    //     console.log("error",error)
    //     return results
    // })
}