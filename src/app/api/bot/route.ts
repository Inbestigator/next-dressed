import { createHandlers, handleRequest } from "@dressed/dressed/server";
import { commandData, componentData } from "@/../bot.gen";
import type { NextFetchEvent } from "next/server";

const { runCommand, runComponent } = createHandlers(commandData, componentData);

export async function POST(
    req: Request,
    event: NextFetchEvent,
) {
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
        (i) => event.waitUntil(runCommand(i) as Promise<unknown>),
        (i) => event.waitUntil(runComponent(i) as Promise<unknown>),
    );
}
