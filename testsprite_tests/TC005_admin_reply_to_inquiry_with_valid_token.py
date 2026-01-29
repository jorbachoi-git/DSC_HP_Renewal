import requests
import json

BASE_URL = "http://localhost:8888"
ADMIN_PASSWORD = "dssp2134"
TIMEOUT = 30

def test_admin_reply_to_inquiry_with_valid_token():
    # Step 1: Admin login to get JWT token
    login_url = f"{BASE_URL}/.netlify/functions/login"
    login_payload = {"password": ADMIN_PASSWORD}
    token = None
    inquiry_id = None

    try:
        login_resp = requests.post(login_url, json=login_payload, timeout=TIMEOUT)
        assert login_resp.status_code == 200, f"Login failed with status code {login_resp.status_code}"
        login_data = login_resp.json()
        assert "token" in login_data, "JWT token not found in login response"
        token = login_data["token"]

        headers = {"Authorization": f"Bearer {token}"}

        # Step 2: Submit a new inquiry to reply on (required inquiryId)
        submit_inquiry_url = f"{BASE_URL}/.netlify/functions/submit-inquiry"
        # Use safe test data
        inquiry_payload = {
            "name": "Test User",
            "company": "Test Company",
            "email": "testuser@example.com",
            "phone": "010-1234-5678",
            "message": "This is a test inquiry for admin reply.",
            "is_public": True,
            "password": "inquiryPass123"
        }
        submit_resp = requests.post(submit_inquiry_url, json=inquiry_payload, timeout=TIMEOUT)
        assert submit_resp.status_code == 200, f"Submit inquiry failed with status code {submit_resp.status_code}"

        # Step 3: Get inquiries list with admin auth to find the newly submitted inquiryId
        get_list_url = f"{BASE_URL}/.netlify/functions/get-public-list?getAll=true"
        get_list_resp = requests.get(get_list_url, headers=headers, timeout=TIMEOUT)
        assert get_list_resp.status_code == 200, f"Get inquiries list failed with status code {get_list_resp.status_code}"
        inquiries = get_list_resp.json()
        # Find the inquiry we just submitted by matching unique email and message
        inquiry_id = None
        for inquiry in inquiries:
            if (inquiry.get("email") == inquiry_payload["email"] and
                inquiry.get("message") == inquiry_payload["message"]):
                inquiry_id = inquiry.get("id") or inquiry.get("inquiryId")
                break

        assert inquiry_id is not None, "Newly submitted inquiry not found in admin inquiry list"

        # Step 4: Post an admin reply to the inquiry
        admin_reply_url = f"{BASE_URL}/.netlify/functions/admin-reply"
        reply_payload = {
            "inquiryId": inquiry_id,
            "reply": "This is an admin test reply to your inquiry."
        }
        reply_resp = requests.post(admin_reply_url, json=reply_payload, headers=headers, timeout=TIMEOUT)
        assert reply_resp.status_code == 200, f"Admin reply failed with status code {reply_resp.status_code}"

    finally:
        # Cleanup: Delete the inquiry if possible (assuming there's a delete API or we leave as is)
        # Note: The PRD does not list explicit delete inquiry endpoint.
        # So no deletion code is added here.
        pass

test_admin_reply_to_inquiry_with_valid_token()