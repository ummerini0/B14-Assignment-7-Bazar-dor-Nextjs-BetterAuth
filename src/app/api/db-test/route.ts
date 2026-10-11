import dns from "node:dns";
import { MongoClient } from "mongodb";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGODB_URL!, {
      serverSelectionTimeoutMS: 8000,
    });
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    await client.close();
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}