import { createHandlers, handleRequest } from "@dressed/dressed/server";
import { commandData, componentData } from "@/../bot.gen";
import { waitUntil } from "@vercel/functions";

const { runCommand, runComponent } = createHandlers(commandData, componentData);

export async function POST(req: Request) {
    return handleRequest(
        {
            headers: {
                "x-signature-ed25519": req.headers.get("x-signature-ed25519"),
                "x-signature-timestamp": req.headers.get(
                    "x-signature-timestamp",
                ),
            },
            text: await req.text(),
        },
        (i) => waitUntil(runCommand(i) as Promise<unknown>),
        (i) => waitUntil(runComponent(i) as Promise<unknown>),
    );
}
