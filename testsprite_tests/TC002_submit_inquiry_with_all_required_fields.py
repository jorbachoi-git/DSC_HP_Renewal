import requests

BASE_URL = "http://localhost:8888"
SUBMIT_INQUIRY_ENDPOINT = "/.netlify/functions/submit-inquiry"
TIMEOUT = 30

def test_submit_inquiry_with_all_required_fields():
    url = BASE_URL + SUBMIT_INQUIRY_ENDPOINT
    headers = {
        "Content-Type": "application/json"
    }
    # Prepare payload with all required fields
    payload = {
        "name": "Test User",
        "company": "Test Company",
        "email": "testuser@example.com",
        "phone": "+821012345678",
        "message": "This is a test inquiry message to verify successful storage.",
        "is_public": True,
        "password": "testpassword123"
    }

    # Also submit a payload with XSS attempt to verify sanitization per instructions
    payload_xss = {
        "name": "<script>alert('xss')</script>",
        "company": "Test Company",
        "email": "xssuser@example.com",
        "phone": "+821012345679",
        "message": "<script>alert('xss')</script> Testing XSS sanitization.",
        "is_public": True,
        "password": "xsspassword123"
    }

    # Send normal inquiry request
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected 200 OK, got {response.status_code}. Response text: {response.text}"
    except requests.RequestException as e:
        assert False, f"Request to submit inquiry failed: {e}"

    # Send inquiry request with XSS payload to confirm no 500 error and response 200
    try:
        response_xss = requests.post(url, json=payload_xss, headers=headers, timeout=TIMEOUT)
        assert response_xss.status_code == 200, f"Expected 200 OK for XSS payload, got {response_xss.status_code}. Response text: {response_xss.text}"
    except requests.RequestException as e:
        assert False, f"Request to submit inquiry with XSS payload failed: {e}"

test_submit_inquiry_with_all_required_fields()