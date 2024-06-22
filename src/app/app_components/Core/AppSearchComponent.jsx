import { IconButton, Select } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDynamicUrl } from "../../store/app/queriesStore";
const AppSearchComponent = ({columns = []}) => {

    const url_base = useDynamicUrl(state => state.url_base);
    const urlUpdate = useDynamicUrl(state => state.update);
    const [change,setChange] = useState(null);
    

    const [inputs, setInputs] = useState({
        key_search: '',
        data: ''
    })
    const handleSelect = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value
            }
        ) 
        
    }

    const handleInput = (e) => {
        setInputs(
            {
                ...inputs,
                [e.target.name]: e.target.value
            }
        ) 

        if(e.target.name === 'data' && e.target.value === ''){
            resetSearch();
        }
    }

    const resetSearch = () => {
        urlUpdate(url_base);
    }

    const search = (e) => {
        const filters = {key:inputs.key_search, value:inputs.data};
        let newUrl = `${url_base}?filters=${JSON.stringify(filters)}`;
        urlUpdate(newUrl);
    }

    const keyEnter = (e) => {
        if(e.key === 'Enter'){
            search(e);
        }
    }

    useEffect(() => {
            const self = columns.filter((item) => item.selected);
            if(self.length > 0){
                setInputs({...inputs, key_search: self[0].value});
            }
    },[columns.length])

    useEffect(() => {

    },[change])
    

    return (
        <>
        <div className="flex items-center gap-2">
            <div className="flex items-center bg-white rounded-xl shadow-md">
            <span className="bg-primary p-[0.75rem] rounded-tl-xl rounded-bl-xl">
                <FaFilter className="text-white" />
            </span>
            <Select className="app-select-search" value={inputs.key_search} onChange={handleSelect} name="key_search">
                    {columns.map((item, i) => {
                        return (
                            <option selected={item.selected ? true : false} key={i} value={item.value}>{item.name}</option>
                        );
                    })}
            </Select>
            </div>
            <div className="app-search">
                <input className="app-input-search" onKeyDown={keyEnter} id="app-input-search" onInput={handleInput} name="data" value={inputs.data} type="search"/>
                <button className="btn-search" onClick={search}>
                    <IoIosSearch className="w-6 h-6 text-white pointer-events-none" />
                </button>
            </div>

        </div>
        </>
    );
}


export default AppSearchComponent;