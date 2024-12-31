import axios from "axios";
async function fetchChar(id){
   try{
    const character=await axios.get(
        `https://rickandmortyapi.com/api/chracter/${id}`
    )
   }catch(e){
       console.log(e);
   }    
}
const characterCache ={};

const cacheHandler={
    get: async(target,id)=>{
        if(target(id)){
            return target[id];
        }

        const character=await fetchChar(id);

        characterCache[id]={...character,time: new Date()}

        return character;
    }
};

const getChar = new Proxy (characterCache , cacheHandler)

const character =await getChar(1);
console.log({character});

const character2 =await getChar(1);

console.log({character2});
