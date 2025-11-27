"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type ContactType = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactType | null>(
    null
  );

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) throw new Error("Failed to fetch contacts");
      const data = await res.json();
      setContacts(data);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        toast.error(err.message);
        return;
      }
      toast.error("An error occurred while fetching contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Contact Messages</h1>

      {/* Contact Detail Card */}
      {selectedContact && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Contact Detail</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Name:</strong> {selectedContact.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p>
              <strong>Message:</strong>
            </p>
            <p className="whitespace-pre-wrap border p-2 rounded">
              {selectedContact.message}
            </p>
          </CardContent>
          <div className="flex justify-end p-2">
            <Button variant="outline" onClick={() => setSelectedContact(null)}>
              Close
            </Button>
          </div>
        </Card>
      )}

      {/* Contact List Table */}
      <div className="border rounded-md overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b cursor-pointer hover:bg-gray-50 transition"
                onClick={() => setSelectedContact(contact)}
              >
                <td className="px-6 py-4">{contact.id}</td>
                <td className="px-6 py-4">{contact.name}</td>
                <td className="px-6 py-4">{contact.email}</td>
                <td className="px-6 py-4">
                  {new Date(contact.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
