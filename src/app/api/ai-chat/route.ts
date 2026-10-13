import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are BuildWatch AI Assistant, an intelligent assistant for a construction site monitoring platform called BuildWatch AI.

You have knowledge about:
- Construction project progress (walls 55%, columns 65%, slabs 58%, beams 62%, overall 67% complete)
- Active safety alerts (Helmet violation at Camera 5, Unauthorized entry detected, Rain alert in 4 hours)
- Live camera feeds (Camera 1-6 across the site)
- Weather conditions (28°C, partly cloudy, rain expected in 4 hours)
- Workers on site (42 workers today)
- Equipment (91 units)
- Materials status
- 3D Digital Twin of "Skyline Tower Phase II" and "Bandra Kurla Complex Hub"
- Safety compliance (67%)
- Reports and analytics

Always respond helpfully, concisely, and in a professional tone about construction monitoring. 
If asked about something unrelated to construction monitoring, politely redirect to your area of expertise.
Keep responses under 3 sentences unless detailed info is specifically requested.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    // Build conversation history
    const contents: { role: string; parts: { text: string }[] }[] = [
      { role: "user", parts: [{ text: "System instructions: " + SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Understood! I'm BuildWatch AI Assistant, ready to help with construction site monitoring." }] },
    ];

    // Add previous messages
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === "user") {
          contents.push({ role: "user", parts: [{ text: msg.content }] });
        } else if (msg.role === "assistant") {
          contents.push({ role: "model", parts: [{ text: msg.content }] });
        }
      }
    }

    // Add current message
    contents.push({ role: "user", parts: [{ text: message }] });

    // Call Gemini REST API directly (supports both AIzaSy and AQ. key formats)
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("Gemini API error response:", errBody);
      return NextResponse.json(
        { error: "Gemini API error: " + errBody },
        { status: geminiRes.status }
      );
    }

    const data = await geminiRes.json();
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!responseText) {
      return NextResponse.json({ error: "No response from Gemini" }, { status: 500 });
    }

    return NextResponse.json({ response: responseText });
  } catch (error: unknown) {
    console.error("AI Chat route error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "AI service unavailable: " + errorMessage },
      { status: 500 }
    );
  }
}
