
import React from 'react'
import { Pagination } from 'semantic-ui-react'

function PaginationTable (props) {
  if (!props.visible) return null

  return (
    <Pagination
      boundaryRange={0}
      defaultActivePage={props.activePage}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={props.totalPages}
      onPageChange={props.onPageChange}
    />
  )
}


export default PaginationTable
