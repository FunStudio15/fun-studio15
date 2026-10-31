export default {
    async fetch(request, env) {
        const origin = request.headers.get("Origin");

        const headers = {
            "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
            "Cache-Control": "no-store",
            "Vary": "Origin"
        };

        if (!env.ALLOWED_ORIGIN || !env.DISCORD_WEBHOOK_URL) {
            return new Response("Not configured", { status: 500 });
        }

        if (origin !== env.ALLOWED_ORIGIN) {
            return new Response("Forbidden", { status: 403 });
        }

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers });
        }

        if (request.method !== "POST") {
            return new Response("Method not allowed", { status: 405, headers });
        }

        let data;

        try {
            data = JSON.parse(await request.text());
        } catch {
            return new Response("Bad request", { status: 400, headers });
        }

        const cf = request.cf || {};
        const countryCode = cf.country || "Unknown";
        const city = cf.city || "";

        let country = countryCode;

        try {
            country = new Intl.DisplayNames(["en"], {
                type: "region"
            }).of(countryCode) || countryCode;
        } catch {}

        const page = typeof data.page === "string" && data.page.startsWith("/")
            ? data.page.slice(0, 160)
            : "/";

        const now = new Date();

        const time = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Europe/Berlin",
            dateStyle: "medium",
            timeStyle: "medium"
        }).format(now);

        const location = city
            ? `${city}, ${country} (estimated)`
            : `${country} (estimated)`;

        const response = await fetch(env.DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                embeds: [{
                    title: "New Website Visit",
                    color: 5197647,
                    fields: [
                        {
                            name: "Estimated Location",
                            value: location,
                            inline: true
                        },
                        {
                            name: "Time",
                            value: time,
                            inline: true
                        },
                        {
                            name: "Page",
                            value: page
                        }
                    ],
                    timestamp: now.toISOString()
                }],
                allowed_mentions: {
                    parse: []
                }
            })
        });

        if (!response.ok) {
            return new Response("Discord error", { status: 502, headers });
        }

        return new Response(null, { status: 204, headers });
    }
};
