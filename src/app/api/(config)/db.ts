import mongoose from "mongoose"
export const connection=()=>mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
    console.log('mongodb connected')
}).catch((error)=>{
    console.log({error})
})
 