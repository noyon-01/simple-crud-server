"use client";

import { Button, Table } from "@heroui/react";
import Link from "next/link";

export default function UserTable({ users, deleteUserAction }) {
  console.log(users);

  const handleDeleteUser = async (userId) => {
    await deleteUserAction(userId);
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {users.map((user) => (
              <Table.Row key={user._id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>
                  <Link href={`users/${user._id}`}>
                    <Button variant="outline" className="mr-4">
                      Detials
                    </Button>
                  </Link>
                  <Link href={`users/${user._id}/edit`}>
                    <Button variant="primary">Edit</Button>
                  </Link>
                  <Button
                    onClick={() => handleDeleteUser(user._id)}
                    className="ml-4"
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
