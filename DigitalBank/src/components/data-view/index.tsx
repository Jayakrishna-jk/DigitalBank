import { useState, useMemo } from "react"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { CalendarIcon, Download, Share2 } from "lucide-react"
import { format } from "date-fns"
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const DataView = ({ data, columns, search = false, paginations = false, dateRange = false }: any) => {
    const [searchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [dateFrom, setDateFrom] = useState<Date | undefined>()
    const [dateTo, setDateTo] = useState<Date | undefined>()
    const itemsPerPage = 5

    const filteredData = useMemo(() => {
        let filtered = data

        if (search && searchText) {
            filtered = filtered.filter((row: any) =>
                columns.some((col: any) =>
                    String(row[col.key]).toLowerCase().includes(searchText.toLowerCase())
                )
            )
        }

        if (dateRange && dateFrom && dateTo) {
            filtered = filtered.filter((row: any) => {
                const rowDate = new Date(row.creationDate || row.date)
                return rowDate >= dateFrom && rowDate <= dateTo
            })
        }

        return filtered
    }, [data, searchText, columns, search, dateFrom, dateTo, dateRange])

    const paginatedData = useMemo(() => {
        if (!paginations) return filteredData
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredData.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredData, currentPage, paginations])

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Transactions")
        XLSX.writeFile(wb, "transactions.xlsx")
    }

    const exportToPDF = () => {
        const doc = new jsPDF()
        const tableData = filteredData.map((row: any) =>
            columns.map((col: any) => row[col.key])
        )
        const headers = columns.map((col: any) => col.text)

            ; (doc as any).autoTable({
                head: [headers],
                body: tableData,
                startY: 20
            })
        doc.save('transactions.pdf')
    }

    const shareData = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Transaction Data',
                    text: `Found ${filteredData.length} transactions`,
                    url: window.location.href
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Link copied to clipboard!')
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-4 p-6">
            <div className="flex md:flex-row flex-col gap-4 items-center justify-between">
                {search && (
                    <Input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-100"
                    />
                )}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="flex gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={exportToExcel}>
                                    Export to Excel
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={exportToPDF}>
                                    Export to PDF
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" size="sm" onClick={shareData}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                        </Button>
                    </div>
                    {dateRange && (
                        <div className="flex gap-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-40">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateFrom ? format(dateFrom, "PPP") : "From date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateFrom}
                                        onSelect={setDateFrom}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-40">
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateTo ? format(dateTo, "PPP") : "To date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={dateTo}
                                        onSelect={setDateTo}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    )}
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {
                                columns?.map((column: any) => (
                                    <TableHead key={column.id}>{column.text}</TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            paginatedData.length > 0 ? paginatedData?.map((row: any) => (
                                <TableRow key={row.id}>
                                    {
                                        columns?.map((column: any) => (
                                            <TableCell key={column.id}>{row[column.key]}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={columns?.length} className="text-center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            {paginations && totalPages > 1 && (
                <div className="flex justify-between items-center">
                    <span className="text-sm">
                        Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default DataView