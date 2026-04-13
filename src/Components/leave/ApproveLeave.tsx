import { useEffect, useRef, useState } from "react";
import { SupabaseClient } from "../../Helper/Supabase";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import styles from "./ApproveLeave.module.css";

type Person = {
  id: number;
  Name: string;
  Email: string;
  start_date: string;
  end_date: string;
  total_days: string;
  reason: string;
  status: string;
};

interface props{
 email:string;
}
const ApproveLeave = ({email}:props) => {
  const [rows, setRows] = useState<Person[]>([]);
  const remarksRef = useRef<{ [key: number]: string }>({});

  async function fetchData() {
    const { data, error } = await SupabaseClient
      .from("leave_requests")
      .select("*");

    if (error) {
      toast.error(error.message);
    } else {
      setRows(data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function handleApprove(leave: Person) {
    const remark = remarksRef.current[leave.id] || "";

    const { error } = await SupabaseClient
      .from("leave_approvals")
      .insert({
        leave_request_id: leave.id,
        approved_by:email,
        decision: "approved",
        remarks: remark,
      });

    if (error) {
      toast.error("Approval failed");
      return;
    }

    await SupabaseClient
      .from("leave_requests")
      .update({ status: "approved" })
      .eq("id", leave.id);

    toast.success("Approved ");
    remarksRef.current[leave.id] = "";
    fetchData();
  }

  async function handleReject(leave: Person) {
    const remark = remarksRef.current[leave.id] || "";

    const { error } = await SupabaseClient
      .from("leave_approvals")
      .insert({
        leave_request_id: leave.id,
        approved_by:email,
        decision: "rejected",
        remarks: remark,
      });

    if (error) {
      toast.error("Rejection failed");
      return;
    }

    await SupabaseClient
      .from("leave_requests")
      .update({ status: "rejected" })
      .eq("id", leave.id);

    toast.success("Rejected ");
    remarksRef.current[leave.id] = "";
    fetchData();
  }

  const columns: ColumnDef<Person>[] = [
    {
      id: "index",
      header: "S.No",
      cell: ({ row }) => row.index + 1,
    },
    { accessorKey: "Name", header: "Name" },
    { accessorKey: "Email", header: "Email" },
    { accessorKey: "start_date", header: "Start Date" },
    { accessorKey: "end_date", header: "End Date" },
    { accessorKey: "total_days", header: "Days" },
    { accessorKey: "reason", header: "Reason" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span
            className={`${styles.status} ${
              status === "approved"
                ? styles.approved
                : status === "rejected"
                ? styles.rejected
                : styles.pending
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const leave = row.original;
        return (
          <div className={styles.actions}>
            <input
              type="text"
              placeholder="Remarks..."
              className={styles.input}
              defaultValue={remarksRef.current[leave.id] || ""}
              onChange={(e) => {
                remarksRef.current[leave.id] = e.target.value;
              }}
            />
            <div className={styles.buttonGroup}>
              <button
                className={styles.approveBtn}
                onClick={() => handleApprove(leave)}
                disabled={leave.status === "approved"}
              >
                Approve
              </button>
              <button
                className={styles.rejectBtn}
                onClick={() => handleReject(leave)}
                disabled={leave.status === "rejected"}
              >
                Reject
              </button>
            </div>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Leave Approval Dashboard</h2>
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.th}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.td}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApproveLeave;