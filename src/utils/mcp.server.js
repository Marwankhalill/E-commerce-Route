import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const BASE_URL = `http://localhost:${process.env.port}/api`;

const server = new McpServer({ name: "e-commerce-api", version: "1.0.0" });

// ─── Categories ───────────────────────────────────────────

server.tool("add_category", { name: z.string() }, async ({ name }) => {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  const data = await res.json();
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});
server.tool(
  "add_sub_category",
  { name: z.string(), category: z.string() },
  async ({ name, category }) => {
    const res = await fetch(`${BASE_URL}/subcategories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category }),
    });
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  },
);

server.tool("get_categories", {}, async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  const data = await res.json();
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});

server.tool("get_category", { id: z.string() }, async ({ id }) => {
  const res = await fetch(`${BASE_URL}/categories/${id}`);
  const data = await res.json();
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});

server.tool(
  "update_category",
  { id: z.string(), name: z.string() },
  async ({ id, name }) => {
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  },
);

server.tool("delete_category", { id: z.string() }, async ({ id }) => {
  const res = await fetch(`${BASE_URL}/categories/${id}`, { method: "DELETE" });
  const data = await res.json();
  return { content: [{ type: "text", text: JSON.stringify(data) }] };
});

// ─── Start Server ─────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
// console.log("MCP Server running...");
