export type AccountField = {
  name: string;
  label: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
};

export const accountFields: AccountField[] = [
  { name: "group", label: "Group", placeholder: "demo\\APEXADVANCEUSD" },
  { name: "leverage", label: "Leverage", type: "number", placeholder: "100" },
  { name: "first_name", label: "First Name" },
  { name: "last_name", label: "Last Name" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone" },
  { name: "country", label: "Country" },
  { name: "city", label: "City" },
  { name: "state", label: "State" },
  { name: "address", label: "Address" },
  { name: "zip_code", label: "Zip Code" },
  { name: "comment", label: "Comment" },
  { name: "main_password", label: "Main Password" },
  { name: "investor_password", label: "Investor Password" }
];

export const initialAccountFormValues = Object.fromEntries(
  accountFields.map((field) => [field.name, ""])
) as Record<string, string>;
