import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, {PaginationListStandalone, PaginationProvider} from 'react-bootstrap-table2-paginator';

export const RemotePagination = ({data, rowEvents, page, sizePerPage, onTableChange, totalSize, columns, keyField = "id"}) => (
  <div>
    <PaginationProvider
      pagination={
        paginationFactory({
          custom: true,
          page,
          sizePerPage,
          totalSize
        })
      }
    >
      {
        ({
           paginationProps,
           paginationTableProps
         }) => (
          <div>
            <BootstrapTable
              striped
              hover
              bordered={false}
              bootstrap4
              keyField={keyField}
              data={data}
              rowEvents={rowEvents}
              noDataIndication={() => (<div>No Data available</div>)}
              remote
              columns={columns}
              onTableChange={onTableChange}
              {...paginationTableProps}
            />
            <div>
              <PaginationListStandalone
                {...paginationProps}
              />
            </div>
          </div>
        )
      }
    </PaginationProvider>
  </div>
);
