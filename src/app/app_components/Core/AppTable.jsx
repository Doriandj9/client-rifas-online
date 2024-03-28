import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,Button ,Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetch } from "../../utilities/hooks/data/useFetch";
import { withAPIFeedbackTable } from "../../utilities/web/withFeedback";
import { LuRefreshCcw } from "react-icons/lu";
import AppButton from "./AppButon";
import PaginateButtons from "./PaginateButtons";
import { application } from "../../config/app";
import noData from '@app/assets/imgs/no_data.svg';

const AppTable = ({columns, actionColumns,data,error,loading,total=0,pagePaginate=0,setPagePaginate =() => {},refetch = () => {}}) => {
  // const [pagePaginate,setPagePaginate] = useState(1);

  // const {data,error,loading,total,refetch} = useFetch(url,options,keyData,auth,token,[pagePaginate],paginate,pagePaginate);
  const FillTableWithFeedback = withAPIFeedbackTable(FillTable);

  const handleClick = () => {
    refetch()
  }
  useEffect(() => {
    document.addEventListener('reload.table', (e) => {
      refetch();
    })
  },[])
  return (
    <>
    <div className="text-end">
          <AppButton className="mb-2" 
           onClick={handleClick}  leftIcon={<LuRefreshCcw />}> Refrescar </AppButton>        
         <FillTableWithFeedback {...{data:{data,columns,actionColumns}}} hasError={error} isLoading={loading} type='table' />
         <div className="mt-5">
          { total > application.paginateCount && <PaginateButtons total={total} page={pagePaginate} setPage={setPagePaginate}  />}
         </div>
    </div>
    </>
  );
};



const FillTable =  ({data,columns, actionColumns}) => {
  const sizeIcon = 1.75; //1.75rem = 28px
  const sizeAccions = (actionColumns.list.length * sizeIcon);

    return (
        <>
        <TableContainer>
        <Table variant="striped" colorScheme="telegram">
        <Thead>
            <Tr>
                {columns.map((info,index) => {
                    const {header,render} = info;
                    return(
                    <Th key={index}>
                        {header}
                    </Th>
                )})
                }
                {
                  actionColumns && (
                    <Th style={{width:`${sizeAccions}rem`}}>
                      {actionColumns.header}
                    </Th>
                  )
                }
            </Tr>
          </Thead>

          <Tbody>
                {data.map((item,i) => {                  
                    return (
                        <Tr key={item.id ?? i}>
                            {columns.map((column,num) => {
                              const {render} = column;
                              return (
                                <Td key={num} dangerouslySetInnerHTML={{ __html: render(item,(i + 1)) }}>
                                </Td>
                              );
                            })}

                            { actionColumns &&
                            (
                              <Td style={{width:`${sizeAccions}rem`}}>
                                <div className="flex gap-4">
                                  {
                                      actionColumns.list.map((col,index) => {
                                        return (
                                            <span
                                            key={index} 
                                            className={`inline-block cursor-pointer 
                                              ${ col.validation ? col.validation(item) : '' }
                                            `} 
                                            title={col.name}
                                            onClick={col.onclick(item,(i+ 1))}
                                            >
                                                <Icon
                                                  color={col.color ?? 'green.400'} 
                                                  as={col.icon} 
                                                  boxSize={6} 
                                                />
                                            </span>
                                        );
                                      })
                                  }
                                </div>
                              </Td>
                            ) 
                            }
                        </Tr>
                    );
                })}
                {data.length <= 0 &&
                <Tr>
                  <Td colSpan={columns.length + 1}>
                    <img className="w-full h-40" src={noData} alt="" />
                    <h3 className="text-primary text-2xl text-center">No hay información</h3>
                    <h4 className="text-primary text-md text-center">There is no information</h4>
                  </Td>
                </Tr>
                }
          </Tbody>
          </Table>
      </TableContainer>
        </>
    );
}

export default AppTable;
