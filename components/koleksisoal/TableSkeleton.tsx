import { Skeleton } from "../ui/skeleton"
import { TableCell, TableRow } from "../ui/table"

const TableSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((item, index) => (
        <TableRow key={index}>
          <TableCell className="w-10">
            <Skeleton  className="h-4 w-full"/>
          </TableCell>
          <TableCell className="md:w-6/12 w-8/12">
            <Skeleton className="h-4 w-full"/>
          </TableCell>
          <TableCell className="md:w-2/12 w-1/12">
            <Skeleton className="h-4 w-full"/>
          </TableCell>
          <TableCell className="w-2/12">
          <Skeleton className="h-4 w-full"/>
            </TableCell>
          <TableCell className="md:w-2/12 w-1/12">
            <Skeleton className="h-4 w-full"/>
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}

export default TableSkeleton