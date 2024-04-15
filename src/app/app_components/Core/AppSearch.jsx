import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
const AppSearch = ({placeholder='Búsqueda...', data , setData, filters,dependencies = []}) => {
    const [dataOriginal,setDataOriginal] = useState(data);
    useEffect(() => {
        setDataOriginal(data);
    },dependencies)   
    

const handleSearch = (e) => {
    let dataFilterFinal = [];
    const mapFilter = filters?.map((item) => item.split('.'));

    for(let filter of mapFilter){
        const filterData = [...dataOriginal];
        const dataFilter = filterData.filter((item) => {
            let obj = item;
            for(let key of filter){
                obj =  Reflect.get(obj,key)
            }
            return obj.toLowerCase().includes(e.target.value.toLowerCase());
        });
        dataFilterFinal.push(...dataFilter);
    }
    const keysMaps = dataFilterFinal.map(item => ([item.id,item]));

    const finalMap = [...new Map(keysMaps)];
    let dataEnd = [];
    finalMap.forEach(item => dataEnd.push(item[1]));
    
    setData(dataEnd);
}


    return (
        <>
            <div>
            <InputGroup className="shadow">
                <InputLeftElement pointerEvents='none'>
                <LuSearch color='gray.300' />
                </InputLeftElement>
                <Input onInput={handleSearch} type='search' placeholder={placeholder} />
            </InputGroup>
                
            </div>
        </>
    );
}

export default AppSearch;