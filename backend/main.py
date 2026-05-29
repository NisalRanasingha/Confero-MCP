import os
import datetime
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

# Gemini Config

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

class AttendeeRequest(BaseModel):

    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    interest: str = Field(..., min_length=5, max_length=300)

# 3. MCP / Tool Calling Function

def send_draft_via_mcp(email_address: str, email_body: str) -> str:

    """

    Simulates sending an email draft via MCP and logs the complete payload

    directly into the live backend server logs with a UTC timestamp.

    """

    utc_now = datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z")

    log_payload = f"""

==================== [MCP TOOL SIMULATION LOG] ====================

[TIMESTAMP] : {utc_now}
[TO]        : {email_address}
[BODY]      :

{email_body.strip()}

===================================================================

"""

    print(log_payload, flush=True)

    return f"Success: Payload programmatically routed via MCP at {utc_now}"

# 1. RAG: Agenda file read
def get_agenda_context():
    try:
        with open("agenda.txt", "r", encoding="utf-8") as file:
            return file.read()
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="agenda.txt file එක හොයාගන්න නැහැ මචං!")



@app.post("/api/match")
async def match_and_draft(data: AttendeeRequest):
    context = get_agenda_context()
    prompt = f"""

    You are the premium corporate AI Assistant for the 'Accelalpha & Oracle Supply Chain Summit'.



    YOUR CORE MISSION:

    1. Match the visitor's profile to the SINGLE most relevant session from the official schedule (Agenda) provided below by evaluating the Focus Keywords and Description.

    2. Draft a personalized corporate email invitation addressed directly to {data.name}.



    STRICT EMAIL FORMATTING RULES:

    Inside the `email_body`, you MUST format the matched session details into a dedicated, visually clear and separated block. Do not write it as a continuous paragraph. It must look exactly like this layout inside the email text:

    RECOMMENDED SESSION FOR YOU:
    • Topic: [Insert Exact Session Title Here]
    • Time: [Insert Exact Time Slot Here]
    • Speaker: [Insert Speaker Name(s) Here]
    Ensure there is a friendly introduction before this block and a brief professional takeaway after this block explaining why this specific session fits their professional background.

    STRICT TOOL CALLING RULES:

    - Once the draft is ready, you MUST call the tool `send_draft_via_mcp`.

    - Pass exactly these two arguments:

      * `email_address`: {data.email}

      * `email_body`: The complete formatted email text block containing the structured session lines.

    - Do not output anything else outside the tool call.
    VISITOR PROFILE:

    Name: {data.name}
    Email: {data.email}
    Professional Focus/Interests: {data.interest}

    CONTEXT (OFFICIAL AGENDA):

    {context}

    """
    try:

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                tools=[send_draft_via_mcp],  # Native Tool Calling / MCP Simulation
                temperature=0.2, # Output fixed

            )

        )

        mcp_triggered = False
        execution_result = ""
        final_email_body = ""

        if response.function_calls:
            for call in response.function_calls:
                if call.name == "send_draft_via_mcp":
                    mcp_triggered = True
                    args = call.args
                    final_email_body = args.get("email_body", "")

                    execution_result = send_draft_via_mcp(

                        email_address=args.get("email_address", data.email),

                        email_body=final_email_body

                    )

        if not mcp_triggered and response.text:
            final_email_body = response.text
            send_draft_via_mcp(data.email, final_email_body)
            mcp_triggered = True
            execution_result = "Fallback triggered: Manual execution used."

        return {

            "status": "success",
            "matched_draft": final_email_body,
            "mcp_triggered": mcp_triggered,
            "pipeline_status": execution_result

        }
    
    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))