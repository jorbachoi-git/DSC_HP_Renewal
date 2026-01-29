import requests

BASE_URL = "http://localhost:8888"
ADMIN_PASSWORD = "dssp2134"
TIMEOUT = 30

def test_get_all_inquiries_with_admin_auth():
    login_url = f"{BASE_URL}/.netlify/functions/login"
    inquiries_url = f"{BASE_URL}/.netlify/functions/get-public-list"

    # Step 1: Admin login to get JWT token
    try:
        login_resp = requests.post(
            login_url,
            json={"password": ADMIN_PASSWORD},
            timeout=TIMEOUT
        )
        assert login_resp.status_code == 200, f"Login failed with status {login_resp.status_code}"
        token = login_resp.json().get("token")
        assert isinstance(token, str) and len(token) > 0, "JWT token missing or empty"
    except requests.RequestException as e:
        assert False, f"Admin login request failed: {e}"

    # Step 2: GET /get-public-list with admin token and getAll=true
    headers = {
        "Authorization": f"Bearer {token}"
    }
    params = {
        "getAll": "true"
    }
    try:
        response = requests.get(inquiries_url, headers=headers, params=params, timeout=TIMEOUT)
    except requests.RequestException as e:
        assert False, f"GET /get-public-list request failed: {e}"

    # Validate response status code
    assert response.status_code == 200, f"Expected status 200 but got {response.status_code}"

    # Validate response JSON structure and that it contains inquiries
    try:
        data = response.json()
    except ValueError:
        assert False, "Response is not valid JSON"

    assert isinstance(data, list), "Response data should be a list of inquiries"

    # Optionally verify that non-public inquiries are included by presence of is_public fields or similar
    # Since schema details for inquiries not given, just check at least one inquiry exists
    assert len(data) > 0, "No inquiries returned, expected some inquiries including non-public"

test_get_all_inquiries_with_admin_auth()