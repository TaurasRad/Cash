# api/audit.py
import json
from mainscript import run_audit

def handler(request):
    # Vercel passes the raw body as bytes
    try:
        payload = json.loads(request.body.decode())
        url = payload.get("url")
        if not url:
            return {
                "statusCode": 400,
                "body": json.dumps({"error":"Missing url"})
            }

        # Run your logic
        pdf_file = run_audit(url)

        return {
            "statusCode": 200,
            "body": json.dumps({"success": True, "pdf": pdf_file})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
