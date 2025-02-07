<<<<<<< HEAD
import React from "react";
import List from "./List";

export default function Page() {
    return (
        <div>
            <List />
        </div>
    );
}
=======
"use client";
import React, { useEffect, useState } from "react";
import List from "./List";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch data dari API
    const fetchData = async () => {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      {/* <List /> */}
    </div>
  );
}
>>>>>>> 50078bb6bc35d290e3fcfebc619bfced7f0c452a
