import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ReactNode } from "react";

export type TColumn<T> = {
  header: string;
  key: string;
  render?: (item: T) => ReactNode;
};

interface IProps<T> {
  columns: TColumn<T>[];
  data: T[];
}

const DataTable = <T,>({ columns, data }: IProps<T>) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.key}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTable;
