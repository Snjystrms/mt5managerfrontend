export type AccountField = {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
};

export const accountFields: AccountField[] = [
  { name: "group", label: "Group", placeholder: "demo\\APEXADVANCEUSD" },
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "middle_name", label: "Middle Name" },
  { name: "main_password", label: "Main Password" },
  { name: "investor_password", label: "Investor Password" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "country", label: "Country" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "address", label: "Address" },
  { name: "zip_code", label: "Zip Code" },
  { name: "company", label: "Company" },
  { name: "account", label: "Account" },
  { name: "id_value", label: "ID Value" },
  { name: "language", label: "Language" },
  { name: "lead_source", label: "Lead Source" },
  { name: "lead_campaign", label: "Lead Campaign" },
  { name: "client_id", label: "Client ID" },
  { name: "status", label: "Status" },
  { name: "rights", label: "Rights" },
  { name: "comment", label: "Comment" },
  { name: "leverage", label: "Leverage", type: "number", placeholder: "100" }
];

export const initialAccountFormValues = Object.fromEntries(
  accountFields.map((field) => [field.name, ""])
) as Record<string, string>;
