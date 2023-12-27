import mongoose from "mongoose";
// export const connection=()=>mongoose.connect(`${process.env.MONGO_URI}`).then(()=>{
//     console.log('mongodb connected')
// }).catch((error)=>{    console.log({error})
// })

const MONGODB_URI = process.env.MONGO_URI;
type CachedConnection = {
  conn: null | typeof import("mongoose");
  promise: null | Promise<typeof import("mongoose")>;
};
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached: CachedConnection = { conn: null, promise: null };

async function connection() {
  if (cached.conn) {
    // console.log('returning cached connection')
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(`${MONGODB_URI}`, opts);
    console.log('new connection for mongodb')
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export  {connection};
