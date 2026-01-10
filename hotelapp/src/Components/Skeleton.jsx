import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const SkeletonCard = ({key}) => {
  // width={40} height={40} 
  // width={510} height={80} 
  // width={510} height={80}
  return (
    <div key={key}>
      <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={510} height={80} />
      <Skeleton variant="rounded" width={510} height={80}  />
    </Stack>
    </div>
  )
}

export default SkeletonCard
