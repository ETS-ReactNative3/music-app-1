
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationListStandalone, PaginationProvider } from 'react-bootstrap-table2-paginator';

export const RemotePagination = ({ data, page, sizePerPage, onTableChange, totalSize, columns }) => (
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
                        
                        <div>
                            <PaginationListStandalone
                                {...paginationProps}
                            />
                        </div>
                        <BootstrapTable
                            striped
                            hover
                            bordered={false}
                            bootstrap4
                            keyField="id"
                            data={data}
                            noDataIndication={() => (<div>No Data available</div>)}
                            remote
                            columns={columns}
                            onTableChange={onTableChange}
                            {...paginationTableProps}
                        />
                    </div>
                )
            }
        </PaginationProvider>
    </div>
);