
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** DSC_HP_01
- **Date:** 2026-01-17
- **Prepared by:** TestSprite AI Team

---

## 2️⃣ Requirement Validation Summary

#### Test TC001 Inquiry Form Submission with Valid Inputs
- **Test Code:** [TC001_Inquiry_Form_Submission_with_Valid_Inputs.py](./TC001_Inquiry_Form_Submission_with_Valid_Inputs.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/1a84b8f2-aeb0-4ad4-be82-ce6ca1b33934
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC002 Inquiry Form Submission with Missing Required Fields
- **Test Code:** [TC002_Inquiry_Form_Submission_with_Missing_Required_Fields.py](./TC002_Inquiry_Form_Submission_with_Missing_Required_Fields.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/8d7aa173-e837-417a-94ef-0a0dd6867a24
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC003 Inquiry Form Submission with Invalid Data Formats
- **Test Code:** [TC003_Inquiry_Form_Submission_with_Invalid_Data_Formats.py](./TC003_Inquiry_Form_Submission_with_Invalid_Data_Formats.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/52d775bf-d054-4064-9d1e-1c02ebbfdd3d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC004 Public Inquiry List Loading on Page Load
- **Test Code:** [TC004_Public_Inquiry_List_Loading_on_Page_Load.py](./TC004_Public_Inquiry_List_Loading_on_Page_Load.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_01.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_02.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_03.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/81bd1fc2-c1f3-46e1-9c4b-2c238314e57e
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC005 Public Inquiry List Displays 'No Inquiries' if Empty
- **Test Code:** [TC005_Public_Inquiry_List_Displays_No_Inquiries_if_Empty.py](./TC005_Public_Inquiry_List_Displays_No_Inquiries_if_Empty.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_05.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/cd640924-3651-4543-aa62-564eeeb6bd96
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC006 Incremental Loading of Public Inquiries via 'Load More' Button
- **Test Code:** [TC006_Incremental_Loading_of_Public_Inquiries_via_Load_More_Button.py](./TC006_Incremental_Loading_of_Public_Inquiries_via_Load_More_Button.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/938d0729-8f17-4fbf-bfa7-4c32c4170a9a
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC007 Password Verification for Inquiry Detail Viewing Success
- **Test Code:** [TC007_Password_Verification_for_Inquiry_Detail_Viewing_Success.py](./TC007_Password_Verification_for_Inquiry_Detail_Viewing_Success.py)
- **Test Error:** The test to check that entering the correct password allows viewing detailed inquiry and admin reply failed because the correct password 't1234' was rejected by the system. The detailed view was not displayed. This indicates a problem with password verification or the password provided. Test stopped.
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/prod_06.png:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:8888/.netlify/functions/verify-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/72749a03-8e50-4c10-9877-f7f76350327c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC008 Password Verification for Inquiry Detail Viewing Failure
- **Test Code:** [TC008_Password_Verification_for_Inquiry_Detail_Viewing_Failure.py](./TC008_Password_Verification_for_Inquiry_Detail_Viewing_Failure.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/2bdf3aab-29bf-4885-8d79-9e18846112ff
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC009 Admin Login and Viewing Inquiry List
- **Test Code:** [TC009_Admin_Login_and_Viewing_Inquiry_List.py](./TC009_Admin_Login_and_Viewing_Inquiry_List.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_06.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/789ede5f-449a-437c-b666-bc44a193fdd9
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC010 Admin Sends Reply to Inquiry
- **Test Code:** [TC010_Admin_Sends_Reply_to_Inquiry.py](./TC010_Admin_Sends_Reply_to_Inquiry.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_01.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_02.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/a8e689e5-bf16-433a-a17d-10721c7cd9f3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC011 Localization Toggle Between English and Korean
- **Test Code:** [TC011_Localization_Toggle_Between_English_and_Korean.py](./TC011_Localization_Toggle_Between_English_and_Korean.py)
- **Test Error:** The language toggle functionality is broken. The UI text does not update when toggling between Korean and English. Stopping further testing and reporting the issue for developer investigation.
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/prod_05.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_02.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/Subheading3.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/7bcff158-ff8f-4d57-bfc4-3ab6136fcdc3
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC012 UI Interactions: Open and Close Product Detail Modal
- **Test Code:** [TC012_UI_Interactions_Open_and_Close_Product_Detail_Modal.py](./TC012_UI_Interactions_Open_and_Close_Product_Detail_Modal.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/5a21ce28-325a-4a1a-82e6-7bd0f5fd336d
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC013 UI Interactions: MSDS Popup Display and Close
- **Test Code:** [TC013_UI_Interactions_MSDS_Popup_Display_and_Close.py](./TC013_UI_Interactions_MSDS_Popup_Display_and_Close.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/29698cc6-a192-4aa3-8d2d-05b2f746ec05
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC014 UI Interactions: Hero Carousel Slider Functionality
- **Test Code:** [TC014_UI_Interactions_Hero_Carousel_Slider_Functionality.py](./TC014_UI_Interactions_Hero_Carousel_Slider_Functionality.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/b7117097-7518-4c57-b655-b8e68441c239
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC015 Responsive Design: Mobile Menu Toggle and Accordion Submenus
- **Test Code:** [TC015_Responsive_Design_Mobile_Menu_Toggle_and_Accordion_Submenus.py](./TC015_Responsive_Design_Mobile_Menu_Toggle_and_Accordion_Submenus.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/prod_05.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/BGI_DongSuh2.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_01.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_06.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/af53028b-833c-402f-9040-c23b313a5130
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC016 Company Introduction Section: Kakao Map Loading and Rendering
- **Test Code:** [TC016_Company_Introduction_Section_Kakao_Map_Loading_and_Rendering.py](./TC016_Company_Introduction_Section_Kakao_Map_Loading_and_Rendering.py)
- **Test Error:** The embedded Kakao Map presence is confirmed in the company introduction section, but interaction to trigger full map loading is blocked by an unrelated MSDS 안내 modal popup. No visual errors or glitches were detected in the static content. Due to the modal blocking, full verification of the map's dynamic loading and rendering could not be completed. Please address the modal popup issue to enable proper testing of the Kakao Map embedding.
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/BGI_DongSuh1.png:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/b19b793b-b83f-4533-911e-2ba7d5dc8728
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC017 Backend Functions Handle API Errors Gracefully
- **Test Code:** [TC017_Backend_Functions_Handle_API_Errors_Gracefully.py](./TC017_Backend_Functions_Handle_API_Errors_Gracefully.py)
- **Test Error:** Backend serverless functions for inquiry submission, get-public-list, and get-inquiry-detail endpoints respond correctly under failure scenarios with meaningful error responses and appropriate UI error feedback. Frontend validation prevents empty required fields submission. UI shows user-friendly error messages for incorrect inquiry detail password. No crashes observed. Testing for admin-reply and verify-password endpoints was not fully completed due to input interaction issues. Task partially completed.
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/prod_06.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_02.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_06.png:0:0)
[ERROR] Failed to load resource: the server responded with a status of 401 (Unauthorized) (at http://localhost:8888/.netlify/functions/verify-password:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/5b6defdf-09b4-4a69-97ad-0f2f829eb092
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC018 No Broken Images or Invalid Paths on UI
- **Test Code:** [TC018_No_Broken_Images_or_Invalid_Paths_on_UI.py](./TC018_No_Broken_Images_or_Invalid_Paths_on_UI.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_03.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_05.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/.netlify/functions/get-public-list:0:0)
[ERROR] List load error: TypeError: Failed to fetch
    at loadPublicList (http://localhost:8888/src/script.js:69:28)
    at http://localhost:8888/src/script.js:258:3 (at http://localhost:8888/src/script.js:75:12)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/8e7f6f40-d83b-4218-9fc0-b0cd6d31414a
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC019 UI Scripts Execute Without Runtime Errors
- **Test Code:** [TC019_UI_Scripts_Execute_Without_Runtime_Errors.py](./TC019_UI_Scripts_Execute_Without_Runtime_Errors.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/5856cd1f-a01c-425c-a337-9bde467a886e
- **Status:** ✅ Passed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---

#### Test TC020 Backend API Response Times Within Acceptable Thresholds
- **Test Code:** [TC020_Backend_API_Response_Times_Within_Acceptable_Thresholds.py](./TC020_Backend_API_Response_Times_Within_Acceptable_Thresholds.py)
- **Test Error:** 
Browser Console Logs:
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[WARNING] A parser-blocking, cross site (i.e. different eTLD+1) script, http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js, is invoked via document.write. The network request for this script MAY be blocked by the browser in this or a future page load due to poor network connectivity. If blocked in this page load, it will be confirmed in a subsequent console message. See https://www.chromestatus.com/feature/5718547946799104 for more details. (at https://ssl.daumcdn.net/dmaps/map_js_init/roughmapLoader.js:0:0)
[ERROR] Failed to load resource: the server responded with a status of 400 (Bad Request) (at http://t1.daumcdn.net/kakaomapweb/roughmap/place/prod/20250630/roughmapLander.js:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/BGI_DongSuh1.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/prod_05.png:0:0)
[ERROR] Failed to load resource: net::ERR_EMPTY_RESPONSE (at http://localhost:8888/images/trademark_04.png:0:0)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/1dd27c09-480d-4f35-b313-86a4cc78e463/4a181a25-a9e5-4be7-8755-cbfb10bf495c
- **Status:** ❌ Failed
- **Analysis / Findings:** {{TODO:AI_ANALYSIS}}.
---


## 3️⃣ Coverage & Matching Metrics

- **45.00** of tests passed

| Requirement        | Total Tests | ✅ Passed | ❌ Failed  |
|--------------------|-------------|-----------|------------|
| ...                | ...         | ...       | ...        |
---


## 4️⃣ Key Gaps / Risks
{AI_GNERATED_KET_GAPS_AND_RISKS}
---