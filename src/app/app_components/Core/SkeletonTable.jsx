import { Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const SkeletonTable = () => {

    return (
        <Stack className='border-2 border-black/25'>
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
            <Skeleton  height="3rem" />
        </Stack>
    );
}


export default SkeletonTable;