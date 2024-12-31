import axios from "axios";
async function fetchChar(id){
   try{
    const character=await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
    )
    return character.data;
   }catch(e){
       console.log(e);
   }    
}
const characterCache ={};

const cacheHandler={
    get: async(target,id)=>{
        if(target[id]){
            return target[id];
        }

        const character=await fetchChar(id);

        //characterCache[id]={...character,time: new Date()}

        return character;
    },
    has:(target,key)=>{
        return key in target;
    },
    set:(target,property,value)=>{
        console.log(`Setting Porprrty ${property} to cache`);
       return target[property]={...value,time:new Date()};
    }
};

const getCharacter = new Proxy (characterCache , cacheHandler)

const character =await getCharacter[1];

console.log('has character in cache',1 in getCharacter);
if(!Boolean(1 in getCharacter)){
    getCharacter[1]=character;
}
console.log({character});;
const character2 =await getCharacter[1];
console.log({character2});