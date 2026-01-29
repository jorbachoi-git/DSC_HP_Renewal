import requests

BASE_URL = "http://localhost:8888"
LOGIN_PATH = "/.netlify/functions/login"
ADMIN_PASSWORD = "dssp2134"
TIMEOUT = 30

def test_admin_login_with_valid_password():
    url = BASE_URL + LOGIN_PATH
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "password": ADMIN_PASSWORD
    }

    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
        assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"
        json_response = response.json()
        assert "token" in json_response, "Response JSON does not contain 'token'"
        token = json_response["token"]
        assert isinstance(token, str) and len(token) > 0, "Token should be a non-empty string"
    except requests.exceptions.RequestException as e:
        assert False, f"Request failed: {e}"

test_admin_login_with_valid_password()