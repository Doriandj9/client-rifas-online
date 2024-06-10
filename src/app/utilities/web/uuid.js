import moment from "moment";

const uuid = () => {
    const unix =  moment().unix();
    let id = String(unix);
    if(id.length > 15){
        const rand = Math.round(Math.random() * 99);
        id = id.substring(0,11) + rand;
        return id;
    }

    
    return getRandomKey(id);

}


const getRandomKey = (text) => {
    if(text.length === 15) return text;
    text += Math.round(Math.random() * 8);
    return getRandomKey(text);
}

export {uuid};