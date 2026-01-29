import requests
import uuid

BASE_URL = "http://localhost:8888"
ADMIN_PASSWORD = "dssp2134"
LOGIN_URL = f"{BASE_URL}/.netlify/functions/login"
CREATE_MSDS_POST_URL = f"{BASE_URL}/.netlify/functions/create-msds-post"
DELETE_MSDS_POST_URL = f"{BASE_URL}/.netlify/functions/delete-msds-post"  # assumed endpoint, not in PRD

def test_create_msds_post_with_valid_admin_token():
    timeout = 30
    # Step 1: Log in as admin to get JWT token
    try:
        login_resp = requests.post(
            LOGIN_URL,
            json={"password": ADMIN_PASSWORD},
            timeout=timeout
        )
        assert login_resp.status_code == 200, f"Login failed with status code {login_resp.status_code}"
        token = login_resp.json().get("token")
        assert token and isinstance(token, str), "Token not found or invalid in login response"
    except Exception as e:
        assert False, f"Admin login request failed: {e}"

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    # Prepare unique test data for MSDS post
    unique_title = f"Test MSDS Post {uuid.uuid4()}"
    content = "This is a test MSDS post content."

    # Create the MSDS post
    post_id = None
    try:
        create_resp = requests.post(
            CREATE_MSDS_POST_URL,
            headers=headers,
            json={
                "title": unique_title,
                "content": content
            },
            timeout=timeout
        )
        assert create_resp.status_code == 200, f"Create MSDS post failed with status code {create_resp.status_code}"

        # Response schema in PRD does not specify returned data, 
        # so we accept 200 as success. If response contains ID, capture it.
        # Attempt to parse post_id if provided
        resp_json = create_resp.json()
        if "id" in resp_json:
            post_id = resp_json["id"]
        elif "msdsId" in resp_json:
            post_id = resp_json["msdsId"]
    except Exception as e:
        assert False, f"Create MSDS post request failed: {e}"

    # Cleanup: delete the created MSDS post if possible
    if post_id:
        try:
            delete_resp = requests.delete(
                f"{BASE_URL}/.netlify/functions/delete-msds-post",
                headers=headers,
                json={"id": post_id},
                timeout=timeout
            )
            # Accept 200 or 204 as success for delete
            assert delete_resp.status_code in (200, 204), f"Cleanup delete failed with status code {delete_resp.status_code}"
        except Exception:
            pass  # Ignore cleanup failure

test_create_msds_post_with_valid_admin_token()