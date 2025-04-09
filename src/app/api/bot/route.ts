import {
    createHandlers,
    runInteraction,
    verifySignature,
} from "@dressed/dressed/server";
import { commandData, componentData } from "@/../bot.gen";

const { runCommand, runComponent } = createHandlers(
    commandData,
    componentData,
);

// Having a fastify server on top of a Next server is just gonna slow too much, so I've extracted the handler logic from createServer()
// Will probably eventually separate the Fastify part from the handler part in the actual library server
export async function POST(req: Request) {
    const body = await req.text();
    if (
        !(verifySignature(
            body,
            req.headers.get("x-signature-ed25519") ?? "",
            req.headers.get("x-signature-timestamp") ?? "",
        ))
    ) {
        console.error(" └ Invalid signature");
        return new Response("", { status: 401 });
    }

    try {
        const status = runInteraction(
            runCommand,
            runComponent,
            JSON.parse(body),
        );

        if (status === 200) {
            return new Response(JSON.stringify({ type: 1 }), { status });
        }
        return new Response(null, { status });
    } catch (error) {
        console.error(" └ Error processing request:", error);
        return new Response(null, { status: 500 });
    }
}
