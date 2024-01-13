import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,Button ,Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useFetch } from "../../utilities/hooks/data/useFetch";
import { withAPIFeedbackTable } from "../../utilities/web/withFeedback";
import { LuRefreshCcw } from "react-icons/lu";
import AppButton from "./AppButon";
import PaginateButtons from "./PaginateButtons";
import { application } from "../../config/app";

const AppTable = ({ url, options={},columns, actionColumns,keyData=null, auth=false, token='', refresh = () => {},paginate =false }) => {
  const [pagePaginate,setPagePaginate] = useState(1);

  const {data,error,loading,total,refetch} = useFetch(url,options,keyData,auth,token,[pagePaginate],paginate,pagePaginate);
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
                                <Td key={num}>
                                    {render(item,(i + 1))}
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
                                            className="inline-block cursor-pointer"  
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

          </Tbody>
          </Table>
      </TableContainer>
        </>
    );
}

export default AppTable;
