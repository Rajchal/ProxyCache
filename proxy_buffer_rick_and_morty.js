import axios from "axios";
async function fetchChar(id){
   try{
    const character=await axios.get(
        `https://rickandmortyapi.com/api/chracter/${id}`
    )
   }
}
const characterCache ={};

const cacheHandler={
    get: async(id){
        if(target(id)){
            return target[id];
        }

        const character=await fetchChar(id);

        characterCache[id]={...character,time: new Date()}

        return character;
    }
};

const getChar = new Proxy (charachterCache , cacheHandler)
